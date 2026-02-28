package com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CheckoutResponseDTO {
    private String sessionId;
    private String sessionUrl;
    // me falta el tag de google
}
