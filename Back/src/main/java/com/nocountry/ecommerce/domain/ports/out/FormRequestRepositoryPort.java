package com.nocountry.ecommerce.domain.ports.out;

import com.nocountry.ecommerce.domain.model.FormRequest;
import java.util.List;
import java.util.Optional;

public interface FormRequestRepositoryPort {
    FormRequest save(FormRequest formRequest);

    Optional<FormRequest> findById(Long id);

    List<FormRequest> findAll();

    void deleteById(Long id);
}
