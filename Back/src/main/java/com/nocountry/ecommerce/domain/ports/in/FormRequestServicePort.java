package com.nocountry.ecommerce.domain.ports.in;

import com.nocountry.ecommerce.domain.model.FormRequest;
import java.util.List;
import java.util.Optional;

public interface FormRequestServicePort {
    FormRequest createFormRequest(FormRequest formRequest);

    Optional<FormRequest> getFormRequestById(Long id);

    List<FormRequest> getAllFormRequests();

    FormRequest updateFormRequest(Long id, FormRequest formRequest);

    void deleteFormRequest(Long id);
}
