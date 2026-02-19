package com.example.stripe.v1.controller;

import com.example.stripe.v1.dto.ProductRequest;
import com.example.stripe.v1.dto.CheckoutResponse;
import com.example.stripe.v1.service.StripeServiceV1;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product/v1")
public class ProductCheckoutController {

    private StripeServiceV1 stripeService;

    public ProductCheckoutController(StripeServiceV1 stripeService) {
        this.stripeService = stripeService;
    }

    @PostMapping("/checkout")
    public ResponseEntity<CheckoutResponse> checkoutProducts(@RequestBody ProductRequest productRequest){
        CheckoutResponse stripeResponse = stripeService.checkoutProducts(productRequest);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(stripeResponse);
    }
}
