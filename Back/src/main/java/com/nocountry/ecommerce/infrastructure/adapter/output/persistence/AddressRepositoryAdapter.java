package com.nocountry.ecommerce.infrastructure.adapter.output.persistence;

import com.nocountry.ecommerce.domain.model.Address;
import com.nocountry.ecommerce.domain.ports.out.AddressRepositoryPort;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.AddressEntity;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.mapper.AddressMapper;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.repository.JpaAddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class AddressRepositoryAdapter implements AddressRepositoryPort {

    private final JpaAddressRepository jpaAddressRepository;
    private final AddressMapper addressMapper;

    @Override
    public Address save(Address address) {
        AddressEntity entity = addressMapper.toEntity(address);
        return addressMapper.toDomain(jpaAddressRepository.save(entity));
    }

    @Override
    public Optional<Address> findById(Long id) {
        return jpaAddressRepository.findById(id)
                .map(addressMapper::toDomain);
    }

    @Override
    public Optional<Address> findByUserId(Long userId) {
        // Simple implementation for now, can be expanded with custom JPQL if needed
        return jpaAddressRepository.findAll().stream()
                .filter(a -> a.getUser() != null && a.getUser().getId().equals(userId))
                .map(addressMapper::toDomain)
                .findFirst();
    }
}
