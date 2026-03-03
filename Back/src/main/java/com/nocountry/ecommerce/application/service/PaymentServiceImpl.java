package com.nocountry.ecommerce.application.service;

import com.nocountry.ecommerce.domain.model.ConversionDataDTO;
import com.nocountry.ecommerce.domain.model.Order;
import com.nocountry.ecommerce.domain.model.RegistrationStatus;
import com.nocountry.ecommerce.domain.ports.in.ProcessPaymentUseCase;
import com.nocountry.ecommerce.domain.ports.out.EmailPort;
import com.nocountry.ecommerce.domain.ports.out.MarketingPort;
import com.nocountry.ecommerce.domain.ports.out.OrderRepositoryPort;
import com.nocountry.ecommerce.domain.ports.out.PaymentProviderPort;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.CheckoutResponseDTO;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.StripePaymentRequestDTO;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.StripeObject;
import com.stripe.model.checkout.Session;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/*
 #Stripe escuchando - NO la toques
 stripe listen --forward-to localhost:8080/api/webhooks
 # Solo para disparar eventos de prueba
stripe trigger checkout.session.completed
*/

@Service
@Slf4j
@RequiredArgsConstructor
public class PaymentServiceImpl implements ProcessPaymentUseCase {

    private final PaymentProviderPort paymentProviderPort;
    private final List<MarketingPort> marketingAdapters;
    private final EmailPort emailPort;

    // Persistencia
    private final OrderRepositoryPort orderRepositoryPort;

    @Override
    public CheckoutResponseDTO createPaymentSession(Order order) {

        // Convertir el costo del plan a centavos (Stripe usa la unidad mínima de la
        // moneda)
        long amountInCents = order.getPlan().getCosto().multiply(new java.math.BigDecimal("100")).longValue();

        StripePaymentRequestDTO stripeRequest = StripePaymentRequestDTO.builder()
                .customerEmail(order.getBusiness().getOwner().getEmailAddress())
                .priceId(order.getPlan().getId())
                .planName(order.getPlan().getNombre())
                .planAmount(amountInCents)
                .orderId(order.getId())
                .successUrl(System.getenv("FRONTEND_URL") != null
                        ? System.getenv("FRONTEND_URL") + "/gracias?session_id={CHECKOUT_SESSION_ID}&plan="
                                + order.getPlan().getId()
                        : "http://localhost:3000/gracias?session_id={CHECKOUT_SESSION_ID}&plan="
                                + order.getPlan().getId())
                .cancelUrl(System.getenv("FRONTEND_URL") != null
                        ? System.getenv("FRONTEND_URL") + "/?cancelled=true"
                        : "http://localhost:3000/?cancelled=true")
                .build();
        // Llamamos al adaptador a través del puerto
        return paymentProviderPort.createCheckoutSession(stripeRequest);
    }

    // @Override
    // public CheckoutResponseDTO createPaymentSession(StripePaymentRequestDTO
    // request) {
    // return paymentProviderPort.createCheckoutSession(request);
    // }

    @Override
    public void handlePaymentWebhook(String payload, String sigHeader) {
        Event event = paymentProviderPort.constructEvent(payload, sigHeader);

        // Identidicamos el tipo de evento, aqui manejamos todos los eventos que llegan
        log.info("========================================");
        log.info("Webhook recibido");
        log.info("Tipo   : {}", event.getType());
        log.info("ID     : {}", event.getId());
        log.info("========================================");

        // Procesamos solo si el pago fue exitoso
        if ("checkout.session.completed".equals(event.getType())) {
            handlePaymentCompleted(event);
        }
    }

    private void handlePaymentCompleted(Event event) {
        log.info("Checkout Completed");

        // Extraemos el objeto Session del evento
        EventDataObjectDeserializer eventDataObjectDeserializer = event.getDataObjectDeserializer();

        if (!eventDataObjectDeserializer.getObject().isPresent()) {
            return;
        }

        StripeObject stripeObject = eventDataObjectDeserializer.getObject().get();

        if (stripeObject instanceof Session) {
            Session session = (Session) stripeObject;

            // INFORMACIÓN DEL PAGO
            log.info("--- DATOS DEL PAGO ---");
            log.info("Session ID: {}", session.getId());
            log.info("Customer email: {}", session.getCustomerEmail());
            log.info("Amount: {} {}", session.getAmountTotal() / 100.0, session.getCurrency());
            // log.info("Metadata: {}", session.getMetadata());

            // Extraer metadata y construir ConversionData
            Map<String, String> metadata = session.getMetadata();

            ConversionDataDTO conversionData = ConversionDataDTO.builder()
                    .eventId(session.getId())
                    .eventTime(session.getCreated())
                    .email(session.getCustomerEmail())
                    .value(session.getAmountTotal() / 100.0)
                    .currency(session.getCurrency())
                    .fbc(metadata != null ? metadata.get("fbc") : null)
                    .fbp(metadata != null ? metadata.get("fbp") : null)
                    .gclid(metadata != null ? metadata.get("gclid") : null)
                    .clientId(metadata != null ? metadata.get("client_id") : null)
                    .userAgent(metadata != null ? metadata.getOrDefault("userAgent", "Server-Side") : "Server-Side")
                    .ipAddress(metadata != null ? metadata.getOrDefault("ipAddress", "0.0.0.0") : "0.0.0.0")
                    .build();
            log.info("Enviando conversiones para: {}", conversionData.getEmail());

            // --- SECCIÓN DE PERSISTENCIA ---
            String orderIdStr = (metadata != null) ? metadata.get("orderId") : null;
            if (orderIdStr != null) {
                Long orderId = Long.parseLong(orderIdStr);
                orderRepositoryPort.findById(orderId).ifPresent(order -> {
                    order.setStatus(RegistrationStatus.PAGADO);
                    order.setStripeInvoiceId(session.getId());
                    orderRepositoryPort.save(order);
                    log.info("✅ Base de Datos actualizada: Orden {} marcada como PAGADO", orderId);
                });
            }
            // Enviamos email
            emailPort.sendPurchaseConfirmation(
                    session.getCustomerEmail(),
                    session.getCustomerDetails().getName(),
                    String.valueOf(session.getAmountTotal() / 100),
                    session.getCurrency().toUpperCase());

            // Notificamos a meta y google (pixel)
            log.info("Iniciando envios de eventos de marketing.........");
            marketingAdapters.forEach(a -> a.sendPurchaseEvent(conversionData));

        }
    }
}
