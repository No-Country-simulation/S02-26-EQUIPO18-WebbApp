package com.example.stripe.v1.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ConversionData {
    // Identificación del evento
    private String eventId;        // UUID único para deduplicación
    private Long eventTime;        // Unix timestamp

    // Datos del usuario (para matching)
    private String email;
    private String phone;
    private String firstName;
    private String lastName;

    // Tracking cookies (CRÍTICO)
    private String fbc;            // Facebook Click ID
    private String fbp;            // Facebook Browser ID

    // Datos del pago
    private Double value;          // Monto en dólares
    private String currency;       // USD, MXN, EUR, etc.

    // Datos técnicos
    private String userAgent;
    private String ipAddress;

    // Google Click ID para atribución exacta, equivalentye al fbc de Meta
    private String gclid;
}
