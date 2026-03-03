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
            // Configurar detalles del producto
            SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(requestDTO.getSuccessUrl() == null ? "http://localhost:8080/success"
                            : requestDTO.getSuccessUrl())
                    .setCancelUrl(requestDTO.getCancelUrl() == null ? "http://localhost:8080/cancel"
                            : requestDTO.getCancelUrl())
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

            // Agregamos el metadata
            if (requestDTO.getMetadata() != null && !requestDTO.getMetadata().isEmpty()) {
                paramsBuilder.putAllMetadata(requestDTO.getMetadata());
                log.info("Metadata adden: {}", requestDTO.getMetadata());
            }

            // Esto asegura que el Webhook sepa qué orden actualizar en Postgres
            if (requestDTO.getOrderId() != null) {
                paramsBuilder.putMetadata("orderId", String.valueOf(requestDTO.getOrderId()));
                log.info("Asociando Order ID {} a la sesión de Stripe", requestDTO.getOrderId());
            }

            SessionCreateParams params = paramsBuilder.build();
            // Creamos la session en Stripe,Session es un objeto que da acceso a toda la
            // informacion
            Session session = Session.create(params);
            log.info("Checkout Session Create: {}", session.getId());

            // Retornamos la respuesta
            CheckoutResponseDTO responseDTO = new CheckoutResponseDTO();
            responseDTO.setSessionId(session.getId());
            responseDTO.setSessionUrl(session.getUrl());

            return responseDTO;

        } catch (CardException e) {
            log.error("Error de tarjeta en Stripe: {}", e.getMessage());
            throw new PaymentException("Payment failed: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (AuthenticationException e) {
            log.error("Error de autenticación con Stripe (API Key): {}", e.getMessage());
            throw new PaymentException("Payment provider configuration error: " + e.getMessage(),
                    HttpStatus.BAD_REQUEST);
        } catch (StripeException e) {
            log.error("Error creando la session de Stripe: {}", e.getMessage());
            throw new PaymentException("Could not initiate payment process: " + e.getMessage());
        }
    }

    public Event constructEvent(String payload, String sigHeader) {
        try {
            return Webhook.constructEvent(payload, sigHeader, webhookSecret);
        } catch (SignatureVerificationException e) {
            log.error("Firma Invalida!");
            throw new RuntimeException("Invalid Webhook Signature");
        }
    }
}
