package com.nocountry.ecommerce.domain.ports.out;

import com.nocountry.ecommerce.domain.model.Campaign;
import java.util.List;
import java.util.Optional;

public interface CampaignRepositoryPort {
    Campaign save(Campaign campaign);

    Optional<Campaign> findByCode(String code);

    List<Campaign> findAll();
}
