package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.mapper;

import com.nocountry.ecommerce.domain.model.Address;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.AddressEntity;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {

    public Address toDomain(AddressEntity entity) {
        if (entity == null)
            return null;
        return Address.builder()
                .id(entity.getId())
                .street(entity.getStreet())
                .city(entity.getCity())
                .state(entity.getState())
                .postalCode(entity.getPostalCode())
                .country(entity.getCountry())
                .build();
    }

    public AddressEntity toEntity(Address domain) {
        if (domain == null)
            return null;
        return AddressEntity.builder()
                .id(domain.getId())
                .street(domain.getStreet())
                .city(domain.getCity())
                .state(domain.getState())
                .postalCode(domain.getPostalCode())
                .country(domain.getCountry())
                .build();
    }
}
