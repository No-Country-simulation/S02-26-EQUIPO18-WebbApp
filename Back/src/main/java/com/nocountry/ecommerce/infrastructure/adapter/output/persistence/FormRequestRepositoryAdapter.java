package com.nocountry.ecommerce.infrastructure.adapter.output.persistence;

import com.nocountry.ecommerce.domain.model.FormRequest;
import com.nocountry.ecommerce.domain.ports.out.FormRequestRepositoryPort;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.FormRequestEntity;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.mapper.FormRequestMapper;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.repository.JpaFormRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class FormRequestRepositoryAdapter implements FormRequestRepositoryPort {

    private final JpaFormRequestRepository jpaFormRequestRepository;
    private final FormRequestMapper formRequestMapper;

    @Override
    public FormRequest save(FormRequest formRequest) {
        FormRequestEntity entity = formRequestMapper.toEntity(formRequest);
        return formRequestMapper.toDomain(jpaFormRequestRepository.save(entity));
    }

    @Override
    public Optional<FormRequest> findById(Long id) {
        return jpaFormRequestRepository.findById(id)
                .map(formRequestMapper::toDomain);
    }

    @Override
    public List<FormRequest> findAll() {
        return jpaFormRequestRepository.findAll().stream()
                .map(formRequestMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id) {
        jpaFormRequestRepository.deleteById(id);
    }
}
