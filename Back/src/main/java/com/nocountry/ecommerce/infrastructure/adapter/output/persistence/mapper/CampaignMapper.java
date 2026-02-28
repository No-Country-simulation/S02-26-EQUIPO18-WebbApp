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
                .id(entity.getId())
                .utmSource(entity.getUtmSource())
                .utmMedium(entity.getUtmMedium())
                .utmCampaign(entity.getUtmCampaign())
                .reportarId(entity.getReportarId())
                .build();
    }

    public CampaignEntity toEntity(Campaign domain) {
        if (domain == null)
            return null;
        return CampaignEntity.builder()
                .id(domain.getId())
                .utmSource(domain.getUtmSource())
                .utmMedium(domain.getUtmMedium())
                .utmCampaign(domain.getUtmCampaign())
                .reportarId(domain.getReportarId())
                .build();
    }
}
