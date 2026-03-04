package com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
    private Long id;
    private LocalDateTime date;
    private BigDecimal priceTotal;
    private String status;
    private String statusLabel;
    private String planId;
    private String planName;
    private String businessName;
    private String businessActivity;
    private String businessType;
    private String businessState;
    private String ownerName;
    private String ownerLastName;
    private String ownerEmail;
    private String ownerPhone;
    private String stripeSessionId;
    private String generatedPassword;
}
