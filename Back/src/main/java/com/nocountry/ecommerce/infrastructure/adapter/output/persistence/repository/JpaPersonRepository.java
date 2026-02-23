package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.repository;

import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.PersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaPersonRepository extends JpaRepository<PersonEntity, Long> {
}
