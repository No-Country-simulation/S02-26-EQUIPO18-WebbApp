package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.repository;

import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.AddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaAddressRepository extends JpaRepository<AddressEntity, Long> {
}
