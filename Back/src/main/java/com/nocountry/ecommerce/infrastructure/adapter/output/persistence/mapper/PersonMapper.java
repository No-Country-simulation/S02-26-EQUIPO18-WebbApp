package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.mapper;

import com.nocountry.ecommerce.domain.model.Person;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.PersonEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PersonMapper {

    private final AddressMapper addressMapper;

    public Person toDomain(PersonEntity entity) {
        if (entity == null)
            return null;
        return Person.builder()
                .id(entity.getId())
                .name(entity.getName())
                .lastName(entity.getLastName())
                .phoneNumber(entity.getPhoneNumber())
                .emailAddress(entity.getEmailAddress())
                .address(addressMapper.toDomain(entity.getAddress()))
                .build();
    }

    public PersonEntity toEntity(Person domain) {
        if (domain == null)
            return null;
        return PersonEntity.builder()
                .id(domain.getId())
                .name(domain.getName())
                .lastName(domain.getLastName())
                .phoneNumber(domain.getPhoneNumber())
                .emailAddress(domain.getEmailAddress())
                .address(addressMapper.toEntity(domain.getAddress()))
                .build();
    }
}
