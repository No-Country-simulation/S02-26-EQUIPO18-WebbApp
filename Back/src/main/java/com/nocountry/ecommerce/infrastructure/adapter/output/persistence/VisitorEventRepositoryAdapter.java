package com.nocountry.ecommerce.infrastructure.adapter.output.persistence;

import com.nocountry.ecommerce.domain.model.VisitorEvent;
import com.nocountry.ecommerce.domain.ports.out.VisitorEventRepositoryPort;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.VisitorEventEntity;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.repository.JpaVisitorEventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class VisitorEventRepositoryAdapter implements VisitorEventRepositoryPort {

    private final JpaVisitorEventRepository jpaRepo;

    @Override
    public VisitorEvent save(VisitorEvent event) {
        VisitorEventEntity entity = toEntity(event);
        return toDomain(jpaRepo.save(entity));
    }

    @Override
    public List<VisitorEvent> findAll() {
        return jpaRepo.findAll().stream().map(this::toDomain).collect(Collectors.toList());
    }

    @Override
    public List<VisitorEvent> findByVisitorUid(String visitorUid) {
        return jpaRepo.findByVisitorUidOrderByCreatedAtDesc(visitorUid)
                .stream().map(this::toDomain).collect(Collectors.toList());
    }

    private VisitorEventEntity toEntity(VisitorEvent e) {
        return VisitorEventEntity.builder()
                .id(e.getId())
                .visitorUid(e.getVisitorUid())
                .sessionId(e.getSessionId())
                .event(e.getEvent())
                .page(e.getPage())
                .referrer(e.getReferrer())
                .utmSource(e.getUtmSource())
                .utmMedium(e.getUtmMedium())
                .utmCampaign(e.getUtmCampaign())
                .ipAddress(e.getIpAddress())
                .userAgent(e.getUserAgent())
                .extra(e.getExtra())
                .createdAt(e.getCreatedAt() != null ? e.getCreatedAt() : LocalDateTime.now())
                .build();
    }

    private VisitorEvent toDomain(VisitorEventEntity e) {
        return VisitorEvent.builder()
                .id(e.getId())
                .visitorUid(e.getVisitorUid())
                .sessionId(e.getSessionId())
                .event(e.getEvent())
                .page(e.getPage())
                .referrer(e.getReferrer())
                .utmSource(e.getUtmSource())
                .utmMedium(e.getUtmMedium())
                .utmCampaign(e.getUtmCampaign())
                .ipAddress(e.getIpAddress())
                .userAgent(e.getUserAgent())
                .extra(e.getExtra())
                .createdAt(e.getCreatedAt())
                .build();
    }
}
