package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.mapper;

import com.nocountry.ecommerce.domain.model.Business;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.BusinessEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BusinessMapper {

    private final PersonMapper personMapper;
    private final AddressMapper addressMapper;

    public Business toDomain(BusinessEntity entity) {
        if (entity == null)
            return null;
        return Business.builder()
                .id(entity.getId())
                .name(entity.getName())
                .activity(entity.getActivity())
                .type(entity.getType())
                .state(entity.getState())
                .owner(personMapper.toDomain(entity.getOwner()))
                .address(addressMapper.toDomain(entity.getAddress()))
                .build();
    }

    public BusinessEntity toEntity(Business domain) {
        if (domain == null)
            return null;
        return BusinessEntity.builder()
                .id(domain.getId())
                .name(domain.getName())
                .activity(domain.getActivity())
                .type(domain.getType())
                .state(domain.getState())
                .owner(personMapper.toEntity(domain.getOwner()))
                .address(addressMapper.toEntity(domain.getAddress()))
                .build();
    }
}
