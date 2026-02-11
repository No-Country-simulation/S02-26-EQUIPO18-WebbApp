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
public class ActivityDetail {
    private Long id;
    private Long userId; // persona_id
    private Long activityId; // actividad_id
    private String campaignCode;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
