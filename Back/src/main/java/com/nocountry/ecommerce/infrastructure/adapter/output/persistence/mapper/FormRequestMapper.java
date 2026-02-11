package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.mapper;

import com.nocountry.ecommerce.domain.model.FormRequest;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.FormRequestEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FormRequestMapper {

    private final UserMapper userMapper;
    private final PlanMapper planMapper;

    public FormRequest toDomain(FormRequestEntity entity) {
        if (entity == null)
            return null;
        return FormRequest.builder()
                .id(entity.getId())
                .nombreEmpresa(entity.getNombreEmpresa())
                .identificadorEmpresa(entity.getIdentificadorEmpresa())
                .tipoEmpresa(entity.getTipoEmpresa())
                .estadoActual(entity.getEstadoActual())
                .user(userMapper.toDomain(entity.getUser()))
                .plan(planMapper.toDomain(entity.getPlan()))
                .build();
    }

    public FormRequestEntity toEntity(FormRequest domain) {
        if (domain == null)
            return null;
        return FormRequestEntity.builder()
                .id(domain.getId())
                .nombreEmpresa(domain.getNombreEmpresa())
                .identificadorEmpresa(domain.getIdentificadorEmpresa())
                .tipoEmpresa(domain.getTipoEmpresa())
                .estadoActual(domain.getEstadoActual())
                .user(userMapper.toEntity(domain.getUser()))
                .plan(planMapper.toEntity(domain.getPlan()))
                .build();
    }
}
