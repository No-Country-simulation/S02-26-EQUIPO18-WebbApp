package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.mapper;

import com.nocountry.ecommerce.domain.model.User;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.UserEntity;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toDomain(UserEntity entity) {
        if (entity == null)
            return null;
        return User.builder()
                .id(entity.getId())
                .nombre(entity.getNombre())
                .ap(entity.getAp())
                .am(entity.getAm())
                .email(entity.getEmail())
                .password(entity.getPassword())
                .phone(entity.getPhone())
                .role(entity.getRole())
                .fechaCreacion(entity.getFechaCreacion())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public UserEntity toEntity(User domain) {
        if (domain == null)
            return null;
        return UserEntity.builder()
                .id(domain.getId())
                .nombre(domain.getNombre())
                .ap(domain.getAp())
                .am(domain.getAm())
                .email(domain.getEmail())
                .password(domain.getPassword())
                .phone(domain.getPhone())
                .role(domain.getRole())
                .fechaCreacion(domain.getFechaCreacion())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }
}
