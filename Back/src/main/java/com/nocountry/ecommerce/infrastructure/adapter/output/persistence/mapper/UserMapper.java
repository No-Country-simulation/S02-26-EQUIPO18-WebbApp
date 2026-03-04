package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.mapper;

import com.nocountry.ecommerce.domain.model.User;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final PersonMapper personMapper;

    public User toDomain(UserEntity entity) {
        if (entity == null)
            return null;
        return User.builder()
                .id(entity.getId())
                .person(personMapper.toDomain(entity.getPerson()))
                .userName(entity.getUserName())
                .password(entity.getPassword())
                .active(entity.getActive())
                .role(entity.getRole())
                .build();
    }

    public UserEntity toEntity(User domain) {
        if (domain == null)
            return null;
        return UserEntity.builder()
                .id(domain.getId())
                .person(personMapper.toEntity(domain.getPerson()))
                .userName(domain.getUserName())
                .password(domain.getPassword())
                .active(domain.getActive())
                .role(domain.getRole())
                .build();
    }
}
