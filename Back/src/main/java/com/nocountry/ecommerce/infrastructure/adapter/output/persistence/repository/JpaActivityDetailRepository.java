package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.repository;

import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.ActivityDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaActivityDetailRepository extends JpaRepository<ActivityDetailEntity, Long> {
}
