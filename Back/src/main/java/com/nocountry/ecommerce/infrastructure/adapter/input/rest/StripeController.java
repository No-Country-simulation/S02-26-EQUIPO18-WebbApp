package com.nocountry.ecommerce.infrastructure.adapter.input.rest;


import com.nocountry.ecommerce.domain.ports.in.ProcessPaymentUseCase;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.CheckoutResponseDTO;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.StripePaymentRequestDTO;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;

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
/*
    @PostMapping("/create-session")
    public ResponseEntity<CheckoutResponseDTO> createSession(@RequestBody StripePaymentRequestDTO requestDTO) {
        try {
            log.info("Recebida la pretición para creación de session de pago: {}", requestDTO.getCustomerEmail());

            // Llamamos al caso de uso definido en el dominio
            CheckoutResponseDTO responseDTO = processPaymentUseCase.createPaymentSession(requestDTO);

            return ResponseEntity.ok(responseDTO);

        } catch (Exception e) {
            log.error("Error inesperado: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
*/
    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {

        try {
            log.info("Webhook recived.....");
            processPaymentUseCase.handlePaymentWebhook(payload, sigHeader);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }


    }
}
