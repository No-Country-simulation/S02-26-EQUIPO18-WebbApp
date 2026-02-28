package com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    private String planId;
    private BusinessRequest business;
    private CampaignRequest campaign;
    private MetadataRequest metadata;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BusinessRequest {
        private String name;
        private String activity;
        private String type;
        private String state;
        private PersonRequest owner;
        private AddressRequest address;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PersonRequest {
        private String name;
        private String lastName;
        private String phoneNumber;
        private String emailAddress;
        private AddressRequest address;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AddressRequest {
        private String street;
        private String city;
        private String state;
        private String postalCode;
        private String country;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CampaignRequest {
        private String utmSource;
        private String utmMedium;
        private String utmCampaign;
        private String reportarId;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MetadataRequest {
        private String googleClientId;
        private String fbp;
        private String fbc;
        private String userAgent;
        private String ipAddress;
    }
}
