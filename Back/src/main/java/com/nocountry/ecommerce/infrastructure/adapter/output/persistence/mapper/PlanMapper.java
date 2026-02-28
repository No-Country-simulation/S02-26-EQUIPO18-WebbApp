package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.mapper;

import com.nocountry.ecommerce.domain.model.Plan;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.PlanEntity;
import org.springframework.stereotype.Component;

@Component
public class PlanMapper {

    public Plan toDomain(PlanEntity entity) {
        if (entity == null)
            return null;
        return Plan.builder()
                .StripeId(entity.getId())
                .nombre(entity.getNombre())
                .costo(entity.getCosto())
                .beneficios(entity.getBeneficios())
                .build();
    }

    public PlanEntity toEntity(Plan domain) {
        if (domain == null)
            return null;
        return PlanEntity.builder()
                .id(domain.getStripeId())
                .nombre(domain.getNombre())
                .costo(domain.getCosto())
                .beneficios(domain.getBeneficios())
                .build();
    }
}
