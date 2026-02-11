package com.nocountry.ecommerce.domain.ports.out;

import com.nocountry.ecommerce.domain.model.Activity;
import java.util.List;
import java.util.Optional;

public interface ActivityRepositoryPort {
    Activity save(Activity activity);

    Optional<Activity> findById(Long id);

    List<Activity> findAll();
}
