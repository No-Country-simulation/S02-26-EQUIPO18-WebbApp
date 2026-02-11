package com.nocountry.ecommerce.domain.ports.out;

import com.nocountry.ecommerce.domain.model.ActivityDetail;
import java.util.List;
import java.util.Optional;

public interface ActivityDetailRepositoryPort {
    ActivityDetail save(ActivityDetail activityDetail);

    Optional<ActivityDetail> findById(Long id);

    List<ActivityDetail> findByUserId(Long userId);
}
