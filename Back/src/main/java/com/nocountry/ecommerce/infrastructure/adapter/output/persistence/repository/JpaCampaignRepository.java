package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.repository;

import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.CampaignEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaCampaignRepository extends JpaRepository<CampaignEntity, String> {
}
