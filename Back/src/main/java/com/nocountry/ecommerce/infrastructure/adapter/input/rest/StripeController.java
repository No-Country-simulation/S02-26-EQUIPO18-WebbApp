package com.nocountry.ecommerce.infrastructure.adapter.input.rest;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nocountry.ecommerce.domain.ports.in.ProcessPaymentUseCase;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.stream.Collectors;

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
            HttpServletRequest request,
            @RequestHeader("Stripe-Signature") String sigHeader) {

        try {
            // Leemos el payload tal cual llega de Stripe, sin que Spring lo convierta
            String payload = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            log.info("Webhook recibido, procesando...");
            processPaymentUseCase.handlePaymentWebhook(payload, sigHeader);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Error procesando Webhook: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }
}