package com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    @NotBlank(message = "Plan ID is required")
    private String planId;
    @NotNull(message = "Business information is required")
    @Valid
    private BusinessRequest business;
    @Valid
    private CampaignRequest campaign;
    @Valid
    private MetadataRequest metadata;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BusinessRequest {
        @NotBlank(message = "Business name is required")
        private String name;
        @NotBlank(message = "Business activity is required")
        private String activity;
        @NotBlank(message = "Business type is required")
        private String type;
        @NotBlank(message = "Business state is required")
        private String state;
        @NotNull(message = "Owner information is required")
        @Valid
        private PersonRequest owner;
        @Valid
        private AddressRequest address;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PersonRequest {
        @NotBlank(message = "Owner name is required")
        private String name;
        @NotBlank(message = "Owner last name is required")
        private String lastName;
        @NotBlank(message = "Owner phone number is required")
        private String phoneNumber;
        @NotBlank(message = "Owner email address is required")
        private String emailAddress;
        @Valid
        private AddressRequest address;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AddressRequest {
        @NotBlank(message = "Street is required")
        private String street;
        @NotBlank(message = "City is required")
        private String city;
        @NotBlank(message = "State is required")
        private String state;
        @NotBlank(message = "Postal code is required")
        private String postalCode;
        @NotBlank(message = "Country is required")
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
