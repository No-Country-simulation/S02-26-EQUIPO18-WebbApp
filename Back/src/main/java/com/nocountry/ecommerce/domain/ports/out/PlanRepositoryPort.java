package com.nocountry.ecommerce.domain.ports.out;

import com.nocountry.ecommerce.domain.model.Plan;
import java.util.List;
import java.util.Optional;

public interface PlanRepositoryPort {
    Plan save(Plan plan);

    Optional<Plan> findById(String id);

    List<Plan> findAll();
}
