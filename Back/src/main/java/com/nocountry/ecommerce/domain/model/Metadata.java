package com.nocountry.ecommerce.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Metadata {
    private Long id;
    private String googleClientId;
    private String fbp;
    private String fbc;
    private String userAgent;
    private String ipAddress;
}
