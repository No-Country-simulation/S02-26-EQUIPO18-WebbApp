package com.nocountry.ecommerce.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Campaign {
    private Long id;
    private String utmSource;
    private String utmMedium;
    private String utmCampaign;
    private String reportarId; // Includes pixel_id or google_id
}
