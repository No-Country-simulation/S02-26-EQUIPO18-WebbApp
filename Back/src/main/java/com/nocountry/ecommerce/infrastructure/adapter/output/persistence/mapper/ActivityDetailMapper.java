package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.mapper;

import com.nocountry.ecommerce.domain.model.ActivityDetail;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.ActivityDetailEntity;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.ActivityEntity;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.UserEntity;
import org.springframework.stereotype.Component;

@Component
public class ActivityDetailMapper {

    public ActivityDetail toDomain(ActivityDetailEntity entity) {
        if (entity == null)
            return null;
        return ActivityDetail.builder()
                .id(entity.getId())
                .userId(entity.getUser() != null ? entity.getUser().getId() : null)
                .activityId(entity.getActivity() != null ? entity.getActivity().getId() : null)
                .campaignCode(entity.getCampaignCode())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public ActivityDetailEntity toEntity(ActivityDetail domain) {
        if (domain == null)
            return null;
        return ActivityDetailEntity.builder()
                .id(domain.getId())
                .campaignCode(domain.getCampaignCode())
                .user(domain.getUserId() != null ? UserEntity.builder().id(domain.getUserId()).build() : null)
                .activity(domain.getActivityId() != null ? ActivityEntity.builder().id(domain.getActivityId()).build()
                        : null)
                .build();
    }
}
