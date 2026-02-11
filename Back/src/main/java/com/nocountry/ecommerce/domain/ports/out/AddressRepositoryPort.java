package com.nocountry.ecommerce.domain.ports.out;

import com.nocountry.ecommerce.domain.model.Address;
import java.util.Optional;

public interface AddressRepositoryPort {
    Address save(Address address);

    Optional<Address> findById(Long id);

    Optional<Address> findByUserId(Long userId);
}
