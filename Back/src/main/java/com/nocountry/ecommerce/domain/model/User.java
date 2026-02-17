package com.nocountry.ecommerce.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    private String nombre; // name
    private String ap; // apellido paterno
    private String am; // apellido materno
    private String email;
    private String password; // clave_encrypted
    private String phone;
    private Role role;
    private LocalDateTime fechaCreacion; // fecha_creacion
    private LocalDateTime updatedAt;
    private transient String generatedPassword;
}
