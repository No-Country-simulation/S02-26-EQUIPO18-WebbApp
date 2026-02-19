package com.example.stripe.v1.controller;


import com.example.stripe.v1.dto.ConversionData;
import com.example.stripe.v1.service.GoogleAnalyticsService;
import com.example.stripe.v1.service.MetaConversionService;
import com.google.gson.JsonSyntaxException;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.StripeObject;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/webhooks")
@RequiredArgsConstructor
//@RequiredArgsConstructor
public class WebhookController {
/*
 #Stripe escuchando - NO la toques
 stripe listen --forward-to localhost:8080/api/webhooks/stripe
 # Solo para disparar eventos de prueba
stripe trigger checkout.session.completed
*/
    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    private final MetaConversionService metaService;
    private final GoogleAnalyticsService googleService;

    @PostMapping("/stripe")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {

        log.info("Webhook received");

        Event event;

        //Verificamos la firma (Seguridad)
        try{
            event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
        }catch (SignatureVerificationException e){
            log.error("Invalid signature: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid signature");
        }catch (JsonSyntaxException e){
            log.error("⚠️ Invalid payload: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid payload");
        }

        //Identidicamos el tipo de evento, aqui manejamos todos los eventos que llegan
        log.info("========================================");
        log.info("Webhook recibido");
        log.info("Tipo   : {}", event.getType());
        log.info("ID     : {}", event.getId());
        log.info("========================================");

        //Manejar el evento
        if ("checkout.session.completed".equals(event.getType())) {
            handleCheckoutCompleted(event);
        }
        /*
        switch (event.getType()) {

            case "checkout.session.completed":
                log.info("CASO CORRECTO - checkout.session.completed");
                handleCheckoutCompleted(event);
                break;

            case "payment_intent.succeeded":
                log.info("Payment succeeded");
                break;

            case "payment_intent.payment_failed":
                log.warn("Payment failed");
                break;

            default:
                log.info("ℹEvento no manejado: {}", event.getType());
                break; //
        }
        */

        //Respondemos a Stripe
        return ResponseEntity.ok("Webhook processed");
    }

    private void handleCheckoutCompleted(Event event) {
        log.info("Checkout completed!");

        // Extraer el objeto Session del evento
        EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();

        if(!dataObjectDeserializer.getObject().isPresent()){
            return;
        }
        StripeObject stripeObject = dataObjectDeserializer.getObject().get();

        if (stripeObject instanceof Session) {
            Session session = (Session) stripeObject;

            // INFORMACIÓN DEL PAGO
            log.info("--- DATOS DEL PAGO ---");
            log.info("Customer email: {}", session.getCustomerEmail());
            log.info("Amount: {} {}", session.getAmountTotal() / 100.0, session.getCurrency());
            log.info("Session ID: {}", session.getId());
           // log.info("Metadata: {}", session.getMetadata());

            // Conversiones a Meta/Google
            //Extraer metadata y construir ConversionData
            Map<String, String> metadata = session.getMetadata();

            ConversionData conversionData = ConversionData.builder()
                    .eventId(UUID.randomUUID().toString())
                    .eventTime(Instant.now().getEpochSecond())
                    .email(session.getCustomerEmail())
                    .value(session.getAmountTotal() / 100.0)
                    .currency(session.getCurrency())
                    .fbc(metadata != null ? metadata.get("fbc") : null)
                    .fbp(metadata != null ? metadata.get("fbp") : null)
                    .gclid(metadata != null ? metadata.get("gclid") : null)
                    .userAgent(metadata.get("userAgent"))
                    .ipAddress(metadata.get("ipAddress"))
                    .build();

            //Enviar conversión a Meta
            metaService.sendPurchaseEvent(conversionData);
            //Enviar conversión a Google
            googleService.sendPurchaseEvent(conversionData);

        }
    }
}
