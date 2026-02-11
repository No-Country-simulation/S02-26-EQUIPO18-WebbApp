package com.nocountry.ecommerce.application.service;

import com.nocountry.ecommerce.domain.model.FormRequest;
import com.nocountry.ecommerce.domain.model.Plan;
import com.nocountry.ecommerce.domain.model.RegistrationStatus;
import com.nocountry.ecommerce.domain.model.User;
import com.nocountry.ecommerce.domain.ports.in.FormRequestServicePort;
import com.nocountry.ecommerce.domain.ports.out.PlanRepositoryPort;
import com.nocountry.ecommerce.domain.ports.out.FormRequestRepositoryPort;
import com.nocountry.ecommerce.domain.ports.out.UserRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FormRequestServiceImpl implements FormRequestServicePort {

    private final FormRequestRepositoryPort formRequestRepositoryPort;
    private final UserRepositoryPort userRepositoryPort;
    private final PlanRepositoryPort planRepositoryPort;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public FormRequest createFormRequest(FormRequest formRequest) {
        // 1. Validate Plan
        String planId = formRequest.getPlan().getId();
        Plan plan = planRepositoryPort.findById(planId)
                .orElseThrow(() -> new RuntimeException("Plan not found with id: " + planId));
        formRequest.setPlan(plan);

        // 2. Validate/Create User
        User userRequest = formRequest.getUser();
        User user = userRepositoryPort.findByEmail(userRequest.getEmail())
                .orElseGet(() -> {
                    if (userRequest.getPassword() == null) {
                        userRequest.setPassword(passwordEncoder.encode("Default123!"));
                    } else {
                        userRequest.setPassword(passwordEncoder.encode(userRequest.getPassword()));
                    }
                    userRequest.setRole(com.nocountry.ecommerce.domain.model.Role.ROLE_USER);
                    return userRepositoryPort.save(userRequest);
                });
        formRequest.setUser(user);

        // 3. Set Init Status
        if (formRequest.getEstadoActual() == null) {
            formRequest.setEstadoActual(RegistrationStatus.SUBMITTED);
        }

        // 4. Save
        return formRequestRepositoryPort.save(formRequest);
    }

    @Override
    public Optional<FormRequest> getFormRequestById(Long id) {
        return formRequestRepositoryPort.findById(id);
    }

    @Override
    public List<FormRequest> getAllFormRequests() {
        return formRequestRepositoryPort.findAll();
    }

    @Override
    @Transactional
    public FormRequest updateFormRequest(Long id, FormRequest formRequest) {
        FormRequest existing = formRequestRepositoryPort.findById(id)
                .orElseThrow(() -> new RuntimeException("FormRequest not found"));

        if (formRequest.getEstadoActual() != null)
            existing.setEstadoActual(formRequest.getEstadoActual());

        return formRequestRepositoryPort.save(existing);
    }

    @Override
    public void deleteFormRequest(Long id) {
        formRequestRepositoryPort.deleteById(id);
    }
}
