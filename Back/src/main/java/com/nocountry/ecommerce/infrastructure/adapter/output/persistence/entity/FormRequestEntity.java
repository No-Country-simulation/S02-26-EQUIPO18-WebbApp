package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity;

import com.nocountry.ecommerce.domain.model.EntityType;
import com.nocountry.ecommerce.domain.model.RegistrationStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "form_request")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FormRequestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_empresa", nullable = false)
    private String nombreEmpresa;

    @Column(name = "identificador_empresa")
    private String identificadorEmpresa;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_empresa")
    private EntityType tipoEmpresa;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_actual")
    private RegistrationStatus estadoActual;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id")
    private PlanEntity plan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private UserEntity user;
}
