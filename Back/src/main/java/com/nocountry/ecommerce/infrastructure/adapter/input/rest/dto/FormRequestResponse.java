package com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto;

import com.nocountry.ecommerce.domain.model.RegistrationStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FormRequestResponse {
    private Long id;
    private String nombreEmpresa;
    private RegistrationStatus estadoActual;
    private String userEmail;
    private String planNombre;
    private String tipoEmpresa;
}
