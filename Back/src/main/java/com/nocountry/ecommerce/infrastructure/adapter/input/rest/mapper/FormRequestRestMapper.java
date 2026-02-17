package com.nocountry.ecommerce.infrastructure.adapter.input.rest.mapper;

import com.nocountry.ecommerce.domain.model.FormRequest;
import com.nocountry.ecommerce.domain.model.Plan;
import com.nocountry.ecommerce.domain.model.User;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.FormRequestRequest;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.FormRequestResponse;
import org.springframework.stereotype.Component;

@Component
public class FormRequestRestMapper {

    public FormRequest toDomain(FormRequestRequest request) {
        if (request == null)
            return null;

        User user = User.builder()
                .nombre(request.getNombre())
                .ap(request.getAp())
                .am(request.getAm())
                .email(request.getEmail())
                .phone(request.getTelefono())
                .build();

        Plan plan = Plan.builder()
                .id(request.getPlanId())
                .build();

        return FormRequest.builder()
                .nombreEmpresa(request.getNombreEmpresa())
                .identificadorEmpresa(request.getIdentificadorEmpresa())
                .tipoEmpresa(request.getTipoEmpresa())
                .user(user)
                .plan(plan)
                .build();
    }

    public FormRequestResponse toResponse(FormRequest domain) {
        if (domain == null)
            return null;

        return FormRequestResponse.builder()
                .id(domain.getId())
                .nombreEmpresa(domain.getNombreEmpresa())
                .estadoActual(domain.getEstadoActual())
                .userEmail(domain.getUser() != null ? domain.getUser().getEmail() : null)
                .planNombre(domain.getPlan() != null ? domain.getPlan().getNombre() : null)
                .tipoEmpresa(domain.getTipoEmpresa() != null ? domain.getTipoEmpresa().name() : null)
                .generatedPassword(domain.getUser() != null ? domain.getUser().getGeneratedPassword() : null)
                .build();
    }
}
