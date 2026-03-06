package com.nocountry.ecommerce.infrastructure.adapter.output;

import com.nocountry.ecommerce.domain.exception.PaymentException;
import com.nocountry.ecommerce.domain.model.Order;
import com.nocountry.ecommerce.domain.ports.out.PaymentProviderPort;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.CheckoutResponseDTO;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.StripePaymentRequestDTO;
import com.stripe.exception.AuthenticationException;
import com.stripe.exception.CardException;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class StripeAdapter implements PaymentProviderPort {

    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    @Override
    public CheckoutResponseDTO createCheckoutSession(StripePaymentRequestDTO requestDTO) {
        try {
            // 1. Obtenemos la URL base desde el entorno de Render (FRONTEND_URL)
            String baseUrl = System.getenv("FRONTEND_URL");

            // Si la variable no está configurada, lanzamos un error preventivo para evitar fallos en producción
            if (baseUrl == null || baseUrl.isEmpty()) {
                log.error("FRONTEND_URL no está configurado en las variables de entorno");
                throw new PaymentException("Configuración de servidor incompleta", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            // 2. Definimos las URLs de redirección dinámicamente
            // Nota: El parámetro {CHECKOUT_SESSION_ID} es un token que Stripe reemplazará automáticamente
            String successUrl = (requestDTO.getSuccessUrl() != null)
                    ? requestDTO.getSuccessUrl()
                    : baseUrl + "/gracias?session_id={CHECKOUT_SESSION_ID}&plan=" + requestDTO.getPlanName();

            String cancelUrl = (requestDTO.getCancelUrl() != null)
                    ? requestDTO.getCancelUrl()
                    : baseUrl + "/cancel";

            // 3. Construcción de la sesión de Stripe
            SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(successUrl)
                    .setCancelUrl(cancelUrl)
                    .setCustomerEmail(requestDTO.getCustomerEmail())
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("usd")
                                                    .setUnitAmount(requestDTO.getPlanAmount())
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName(requestDTO.getPlanName())
                                                                    .build())
                                                    .build())
                                    .setQuantity(1L)
                                    .build());

            // 4. Metadata y asociacion de orden
            if (requestDTO.getMetadata() != null && !requestDTO.getMetadata().isEmpty()) {
                paramsBuilder.putAllMetadata(requestDTO.getMetadata());
            }

            if (requestDTO.getOrderId() != null) {
                paramsBuilder.putMetadata("orderId", String.valueOf(requestDTO.getOrderId()));
            }

            // 5. Creación de sesión en Stripe
            Session session = Session.create(paramsBuilder.build());
            log.info("Checkout Session creada con ID: {}", session.getId());

            // 6. Retorno de respuesta para el BFF
            CheckoutResponseDTO responseDTO = new CheckoutResponseDTO();
            responseDTO.setSessionId(session.getId());
            responseDTO.setSessionUrl(session.getUrl());

            return responseDTO;

        } catch (CardException e) {
            log.error("Error de tarjeta en Stripe: {}", e.getMessage());
            throw new PaymentException("Payment failed: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (AuthenticationException e) {
            log.error("Error de autenticación con Stripe (API Key): {}", e.getMessage());
            throw new PaymentException("Payment provider configuration error", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (StripeException e) {
            log.error("Error general con Stripe: {}", e.getMessage());
            throw new PaymentException("Could not initiate payment process");
        }
    }

    public Event constructEvent(String payload, String sigHeader) {
        try {
            log.info("DEBUG: Webhook Secret cargado: {}", webhookSecret);
            log.info("DEBUG: Firma recibida: {}", sigHeader);
            log.info("DEBUG: Longitud del secret: {}, Longitud del payload: {}",
                    webhookSecret != null ? webhookSecret.length() : 0,
                    payload != null ? payload.length() : 0);

            log.info("DEBUG: Payload bytes size: {}", payload != null ? payload.getBytes(java.nio.charset.StandardCharsets.UTF_8).length : 0);

           return Webhook.constructEvent(payload, sigHeader, webhookSecret);
        } catch (SignatureVerificationException e) {
            log.error("Firma Invalida!");
            throw new RuntimeException("Invalid Webhook Signature");
        }
    }
}
