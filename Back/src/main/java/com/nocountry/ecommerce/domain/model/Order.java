package com.nocountry.ecommerce.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    private Long id;
    private LocalDateTime date;
    private Plan plan;
    private BigDecimal priceTotal;
    private Metadata metadata;
    private Campaign campaign;
    private Business business;
    private String stripeInvoiceId;
    private String urlRecibo;
    private RegistrationStatus status;
    private transient String generatedPassword;
}
