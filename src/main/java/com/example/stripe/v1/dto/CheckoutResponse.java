package com.example.stripe.v1.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CheckoutResponse {
    private String status;
    private String message;
    private String sessionId;
    private String sessionUrl;
}
