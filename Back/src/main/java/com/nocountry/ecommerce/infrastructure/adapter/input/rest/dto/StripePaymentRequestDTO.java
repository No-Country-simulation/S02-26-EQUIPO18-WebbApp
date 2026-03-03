package com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Builder
@Data
public class StripePaymentRequestDTO {
    //orderID
    private String priceId;       // Ya no se usa para lookup en Stripe
    private String planName;      // Nombre del plan para price_data
    private Long planAmount;      // Monto en centavos para price_data
    private String customerEmail;
    private String successUrl;
    private String cancelUrl;
    private Long orderId;
    private Map<String, String> metadata; //Para las cookies (fbc, fbp, gclid, client_id + utm...)
}
