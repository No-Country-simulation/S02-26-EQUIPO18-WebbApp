package com.example.stripe.v1.controller;

import com.example.stripe.v1.dto.CheckoutRequest;
import com.example.stripe.v1.dto.CheckoutResponse;
import com.example.stripe.v1.service.StripeServiceV2;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payment")
public class PaymentController {

    private final StripeServiceV2 stripeService;

    @PostMapping("/create-checkout")
    public ResponseEntity<CheckoutResponse> createCheckout(@RequestBody CheckoutRequest request) {

        log.info("Received checkout request for: {}", request.getCustomerEmail());

        try {
            CheckoutResponse response = stripeService.createCheckoutSession(request);
            return ResponseEntity.ok(response);

        } catch (StripeException e) {
            log.error("Stripe error: {}", e.getMessage(), e);
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(null);
        }
    }
}