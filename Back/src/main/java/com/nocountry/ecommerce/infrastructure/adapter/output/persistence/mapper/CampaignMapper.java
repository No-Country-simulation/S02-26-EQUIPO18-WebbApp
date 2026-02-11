package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.mapper;

import com.nocountry.ecommerce.domain.model.Campaign;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.CampaignEntity;
import org.springframework.stereotype.Component;

@Component
public class CampaignMapper {

    public Campaign toDomain(CampaignEntity entity) {
        if (entity == null)
            return null;
        return Campaign.builder()
                .campaignCode(entity.getCampaignCode())
                .name(entity.getName())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .activo(entity.isActivo())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public CampaignEntity toEntity(Campaign domain) {
        if (domain == null)
            return null;
        return CampaignEntity.builder()
                .campaignCode(domain.getCampaignCode())
                .name(domain.getName())
                .startDate(domain.getStartDate())
                .endDate(domain.getEndDate())
                .activo(domain.isActivo())
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }
}
