package com.nocountry.ecommerce.infrastructure.adapter.output.persistence;

import com.nocountry.ecommerce.domain.model.Plan;
import com.nocountry.ecommerce.domain.ports.out.PlanRepositoryPort;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.PlanEntity;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.mapper.PlanMapper;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.repository.JpaPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PlanRepositoryAdapter implements PlanRepositoryPort {

    private final JpaPlanRepository jpaPlanRepository;
    private final PlanMapper planMapper;

    @Override
    public Optional<Plan> findById(String id) {
        return jpaPlanRepository.findById(id)
                .map(planMapper::toDomain);
    }

    @Override
    public Plan save(Plan plan) {
        PlanEntity entity = planMapper.toEntity(plan);
        return planMapper.toDomain(jpaPlanRepository.save(entity));
    }

    @Override
    public List<Plan> findAll() {
        return jpaPlanRepository.findAll().stream()
                .map(planMapper::toDomain)
                .collect(Collectors.toList());
    }
}
