package com.nocountry.ecommerce.infrastructure.adapter.input.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nocountry.ecommerce.domain.ports.in.ProcessPaymentUseCase;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/*
 #Stripe escuchando - NO la toques
 stripe listen --forward-to localhost:8080/api/payments/webhook
 # Solo para disparar eventos de prueba
stripe trigger checkout.session.completed
*/

@Slf4j
@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class StripeController {

    // Nota: Aquí luego inyectaremos el "Port" de entrada, no el servicio directo
    private final ProcessPaymentUseCase processPaymentUseCase;

    // @PostMapping("/create-session")
    // public ResponseEntity<CheckoutResponseDTO> createSession(@RequestBody
    // StripePaymentRequestDTO requestDTO) {
    // log.info("Received request to create payment session for: {}",
    // requestDTO.getCustomerEmail());
    // CheckoutResponseDTO responseDTO =
    // processPaymentUseCase.createPaymentSession(requestDTO);
    // return ResponseEntity.ok(responseDTO);
    // }

 /*   @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {
        log.info("Webhook received.....");
        processPaymentUseCase.handlePaymentWebhook(payload, sigHeader);
        return ResponseEntity.ok().build();
    }*/

    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {
        log.info("Webhook received with signature: {}", sigHeader);
        processPaymentUseCase.handlePaymentWebhook(payload, sigHeader);
        return ResponseEntity.ok().build();
    }
}
