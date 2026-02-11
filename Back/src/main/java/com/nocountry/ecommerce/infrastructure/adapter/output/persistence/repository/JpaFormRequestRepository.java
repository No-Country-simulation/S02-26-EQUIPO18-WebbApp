package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.repository;

import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.FormRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaFormRequestRepository extends JpaRepository<FormRequestEntity, Long> {
}
