package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.repository;

import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.MetadataEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaMetadataRepository extends JpaRepository<MetadataEntity, Long> {
}
