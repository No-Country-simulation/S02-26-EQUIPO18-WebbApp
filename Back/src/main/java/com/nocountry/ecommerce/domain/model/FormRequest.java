package com.nocountry.ecommerce.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FormRequest {
    private Long id;
    private String nombreEmpresa; // business_name
    private String identificadorEmpresa; // business_id
    private EntityType tipoEmpresa; // business_type (Enum)
    private RegistrationStatus estadoActual; // current_state (Enum)
    private Plan plan;
    private User user;
}
