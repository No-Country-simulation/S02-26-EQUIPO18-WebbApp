package com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto;

import com.nocountry.ecommerce.domain.model.EntityType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FormRequestRequest {
    // Datos Empresa
    @NotBlank
    private String nombreEmpresa;

    private String identificadorEmpresa;

    @NotNull
    private EntityType tipoEmpresa;

    @NotBlank
    private String planId;

    // Datos Usuario (Persona)
    @NotBlank
    private String nombre;

    @NotBlank
    private String ap; // Apellido Paterno

    private String am; // Apellido Materno

    @Email
    @NotBlank
    private String email;

    private String telefono;

    // Datos Dirección
    private String ubigeo;
    private String direccion;
}
