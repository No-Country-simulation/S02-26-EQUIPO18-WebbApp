package com.example.stripe.v1.service;


import com.example.stripe.v1.dto.CheckoutRequest;
import com.example.stripe.v1.dto.CheckoutResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j //para que lombok genere logger automaticamente
@Service
public class StripeServiceV2 {

    public CheckoutResponse createCheckoutSession(CheckoutRequest request) throws StripeException {

        log.info("Creating checkout session for email: {}", request.getCustomerEmail());

        //Construir los parámetros de la sesión
        SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(request.getSuccessUrl()==null?"http://localhost:8080/success":request.getSuccessUrl())
                .setCancelUrl(request.getCancelUrl()==null?"http://localhost:8080/cancel":request.getCancelUrl())
                .setCustomerEmail(request.getCustomerEmail())
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setPrice(request.getPriceId())
                                .setQuantity(1L)
                                .build()
                );

        // PASO 2: Agregar metadata SI existe, si el usuario no viene de un ad, evitamos enviar un MAP vacio a Stripe
        if (request.getMetadata() != null && !request.getMetadata().isEmpty()) {
            paramsBuilder.putAllMetadata(request.getMetadata());
            log.info("Metadata added: {}", request.getMetadata());
        }

        SessionCreateParams params = paramsBuilder.build();

        // Crear la sesión en Stripe
        // Session es un objeto que da acceso a toda la informacion
        Session session = Session.create(params);

        log.info("Checkout session created: {}", session.getId());

        // PASO 4: Devolver la respuesta
        CheckoutResponse response = new CheckoutResponse();
        response.setSessionId(session.getId());
        response.setSessionUrl(session.getUrl());

        return response;
    }
}
