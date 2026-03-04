package com.nocountry.ecommerce.application.service;

import com.nocountry.ecommerce.domain.exception.BadRequestException;
import com.nocountry.ecommerce.domain.exception.ResourceNotFoundException;
import com.nocountry.ecommerce.domain.model.*;
import com.nocountry.ecommerce.domain.ports.out.OrderRepositoryPort;
import com.nocountry.ecommerce.domain.ports.out.PlanRepositoryPort;
import com.nocountry.ecommerce.domain.ports.out.UserRepositoryPort;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.CheckoutResponseDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceImplTest {

    @Mock
    private OrderRepositoryPort orderRepositoryPort;
    @Mock
    private UserRepositoryPort userRepositoryPort;
    @Mock
    private PlanRepositoryPort planRepositoryPort;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private PaymentServiceImpl paymentService;

    @InjectMocks
    private OrderServiceImpl orderService;

    private Order order;
    private Plan plan;

    @BeforeEach
    void setUp() {
        plan = Plan.builder().id("plan-1").nombre("Premium").costo(new BigDecimal("100")).build();
        Person owner = Person.builder().emailAddress("owner@test.com").name("Test Owner").build();
        Business business = Business.builder().owner(owner).build();
        order = Order.builder()
                .id(1L)
                .business(business)
                .plan(plan)
                .build();
    }

    @Test
    void createOrder_WithValidData_ShouldReturnOrder() {
        when(userRepositoryPort.findByUserName(any())).thenReturn(Optional.empty());
        when(planRepositoryPort.findById(any())).thenReturn(Optional.of(plan));
        when(orderRepositoryPort.save(any())).thenReturn(order);
        when(userRepositoryPort.save(any())).thenReturn(User.builder().build());
        when(paymentService.createPaymentSession(any(Order.class))).thenReturn(
                CheckoutResponseDTO.builder().sessionId("session-1").sessionUrl("url").build());

        Order created = orderService.createOrder(order);

        assertNotNull(created);
        verify(orderRepositoryPort, atLeastOnce()).save(any());
    }

    @Test
    void createOrder_MissingBusiness_ShouldThrowBadRequestException() {
        order.setBusiness(null);
        assertThrows(BadRequestException.class, () -> orderService.createOrder(order));
    }

    @Test
    void getPlanOrThrow_NonExistingPlan_ShouldThrowResourceNotFoundException() {
        when(planRepositoryPort.findById("invalid")).thenReturn(Optional.empty());

        order.getPlan().setId("invalid");
        assertThrows(ResourceNotFoundException.class, () -> orderService.createOrder(order));
    }

    @Test
    void updateOrder_NonExisting_ShouldThrowResourceNotFoundException() {
        when(orderRepositoryPort.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> orderService.updateOrder(99L, order));
    }
}
