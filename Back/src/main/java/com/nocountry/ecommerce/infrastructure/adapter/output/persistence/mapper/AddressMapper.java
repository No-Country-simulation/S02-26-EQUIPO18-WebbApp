package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.mapper;

import com.nocountry.ecommerce.domain.model.Address;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.AddressEntity;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.UserEntity;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {

    public Address toDomain(AddressEntity entity) {
        if (entity == null)
            return null;
        return Address.builder()
                .id(entity.getId())
                .personaId(entity.getUser() != null ? entity.getUser().getId() : null)
                .ubigeo(entity.getUbigeo())
                .direccion(entity.getDireccion())
                .telefono(entity.getTelefono())
                .email(entity.getEmail())
                .build();
    }

    public AddressEntity toEntity(Address domain) {
        if (domain == null)
            return null;
        return AddressEntity.builder()
                .id(domain.getId())
                .ubigeo(domain.getUbigeo())
                .direccion(domain.getDireccion())
                .telefono(domain.getTelefono())
                .email(domain.getEmail())
                .user(domain.getPersonaId() != null ? UserEntity.builder().id(domain.getPersonaId()).build() : null)
                .build();
    }
}
