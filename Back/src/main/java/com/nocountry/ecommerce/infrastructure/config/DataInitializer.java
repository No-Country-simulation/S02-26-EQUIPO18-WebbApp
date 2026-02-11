package com.nocountry.ecommerce.infrastructure.config;

import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.PlanEntity;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.repository.JpaPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

        private final JpaPlanRepository planRepository;
        private final com.nocountry.ecommerce.infrastructure.adapter.output.persistence.repository.JpaUserRepository userRepository;
        private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

        @Override
        public void run(String... args) throws Exception {
                if (planRepository.count() == 0) {
                        List<PlanEntity> plans = Arrays.asList(
                                        PlanEntity.builder()
                                                        .id("Inicial_Básico")
                                                        .nombre("Plan Inicial")
                                                        .costo(new BigDecimal("499.00"))
                                                        .beneficios(Arrays.asList(
                                                                        "Registro de LLC o C-Corp",
                                                                        "Solicitud de EIN en el IRS",
                                                                        "Documentos post formación",
                                                                        "Agente Registrado",
                                                                        "Dirección Virtual",
                                                                        "Calendario de Cumplimiento"))
                                                        .build(),
                                        PlanEntity.builder()
                                                        .id("Crecimiento_Pro")
                                                        .nombre("Plan Crecimiento")
                                                        .costo(new BigDecimal("899.00"))
                                                        .beneficios(Arrays.asList(
                                                                        "Todo lo incluído en el Plan Inicio",
                                                                        "+ Asistencia Fiscal",
                                                                        "+ Informe Anual (Renovación estatal)",
                                                                        "+ Declaración de impuestos estatal"))
                                                        .build(),
                                        PlanEntity.builder()
                                                        .id("Élite_Premium")
                                                        .nombre("Plan Élite")
                                                        .costo(new BigDecimal("4499.00"))
                                                        .beneficios(Arrays.asList(
                                                                        "Todo lo incluído en el Plan Crecimiento",
                                                                        "Asistencia fiscal completa y llamadas ilimitadas con expertos",
                                                                        "Contabilidad diaria (Límite de gastos: $50,000/mes)",
                                                                        "Impuesto sobre las Ventas/Reventa, Solicitud y Devolución de Impuestos."))
                                                        .build());

                        planRepository.saveAll(plans);
                        System.out.println("Plans initialized.");
                }

                if (userRepository.count() == 0) {
                        String encodedPassword = passwordEncoder.encode("password123");

                        userRepository.save(
                                        com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.UserEntity
                                                        .builder()
                                                        .nombre("Admin")
                                                        .ap("System")
                                                        .email("admin@test.com")
                                                        .password(encodedPassword)
                                                        .role(com.nocountry.ecommerce.domain.model.Role.ROLE_ADMIN)
                                                        .build());

                        userRepository.save(
                                        com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.UserEntity
                                                        .builder()
                                                        .nombre("User")
                                                        .ap("Demo")
                                                        .email("user@test.com")
                                                        .password(encodedPassword)
                                                        .role(com.nocountry.ecommerce.domain.model.Role.ROLE_USER)
                                                        .build());

                        System.out.println("Users initialized (admin@test.com / user@test.com)");
                }
        }
}
