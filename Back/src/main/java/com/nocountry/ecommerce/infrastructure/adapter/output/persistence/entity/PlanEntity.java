package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "plan")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlanEntity {

    @Id
    @Column(nullable = false, unique = true)
    private String id; // e.g. "Inicial_Básico"

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "costo")
    private BigDecimal costo;

    @ElementCollection
    @CollectionTable(name = "plan_beneficios", joinColumns = @JoinColumn(name = "plan_id"))
    @Column(name = "beneficio")
    private List<String> beneficios;
}
