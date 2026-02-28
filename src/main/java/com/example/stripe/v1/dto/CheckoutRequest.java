package com.example.stripe.v1.dto;

import lombok.Data;

import java.util.Map;

@Data
public class CheckoutRequest {
    private String priceId;
    private String customerEmail;
    private String successUrl;
    private String cancelUrl;
    private Map<String, String> metadata; //Para las cookies (fbc, fbp, gclid)
}
