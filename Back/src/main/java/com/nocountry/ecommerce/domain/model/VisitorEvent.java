package com.nocountry.ecommerce.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VisitorEvent {
    private Long id;
    private String visitorUid;
    private String sessionId;
    private String event;
    private String page;
    private String referrer;
    private String utmSource;
    private String utmMedium;
    private String utmCampaign;
    private String ipAddress;
    private String userAgent;
    private String extra; // JSON string con datos adicionales
    private LocalDateTime createdAt;
}
