package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.mapper;

import com.nocountry.ecommerce.domain.model.Metadata;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.MetadataEntity;
import org.springframework.stereotype.Component;

@Component
public class MetadataMapper {

    public Metadata toDomain(MetadataEntity entity) {
        if (entity == null)
            return null;
        return Metadata.builder()
                .id(entity.getId())
                .googleClientId(entity.getGoogleClientId())
                .fbp(entity.getFbp())
                .fbc(entity.getFbc())
                .userAgent(entity.getUserAgent())
                .ipAddress(entity.getIpAddress())
                .build();
    }

    public MetadataEntity toEntity(Metadata domain) {
        if (domain == null)
            return null;
        return MetadataEntity.builder()
                .id(domain.getId())
                .googleClientId(domain.getGoogleClientId())
                .fbp(domain.getFbp())
                .fbc(domain.getFbc())
                .userAgent(domain.getUserAgent())
                .ipAddress(domain.getIpAddress())
                .build();
    }
}
