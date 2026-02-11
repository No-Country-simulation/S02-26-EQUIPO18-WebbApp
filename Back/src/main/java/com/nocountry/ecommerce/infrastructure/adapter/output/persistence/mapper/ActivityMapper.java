package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.mapper;

import com.nocountry.ecommerce.domain.model.Activity;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.ActivityEntity;
import org.springframework.stereotype.Component;

@Component
public class ActivityMapper {

    public Activity toDomain(ActivityEntity entity) {
        if (entity == null)
            return null;
        return Activity.builder()
                .id(entity.getId())
                .nombre(entity.getNombre())
                .activo(entity.isActivo())
                .build();
    }

    public ActivityEntity toEntity(Activity domain) {
        if (domain == null)
            return null;
        return ActivityEntity.builder()
                .id(domain.getId())
                .nombre(domain.getNombre())
                .activo(domain.isActivo())
                .build();
    }
}
