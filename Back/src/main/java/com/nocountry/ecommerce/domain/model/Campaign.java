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
public class Campaign {
    private String campaignCode;
    private String name;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean activo; // active
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
