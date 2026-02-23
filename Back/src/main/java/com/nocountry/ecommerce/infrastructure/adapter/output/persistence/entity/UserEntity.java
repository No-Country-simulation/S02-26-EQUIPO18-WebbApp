package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "person_id")
    private PersonEntity person;

    @Column(name = "user_name", unique = true)
    private String userName;

    private String password;

    private Boolean active;

    @Enumerated(EnumType.STRING)
    private com.nocountry.ecommerce.domain.model.Role role;
}
