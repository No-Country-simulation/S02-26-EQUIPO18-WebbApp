package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.repository;

import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.ActivityEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaActivityRepository extends JpaRepository<ActivityEntity, Long> {
}
