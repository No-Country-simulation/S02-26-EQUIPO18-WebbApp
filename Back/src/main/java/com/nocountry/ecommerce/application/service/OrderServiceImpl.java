package com.nocountry.ecommerce.application.service;

import com.nocountry.ecommerce.domain.model.*;
import com.nocountry.ecommerce.domain.exception.ErrorMessage;
import com.nocountry.ecommerce.domain.ports.in.OrderServicePort;
import com.nocountry.ecommerce.domain.ports.out.PlanRepositoryPort;
import com.nocountry.ecommerce.domain.ports.out.OrderRepositoryPort;
import com.nocountry.ecommerce.domain.ports.out.UserRepositoryPort;
import com.nocountry.ecommerce.domain.exception.BadRequestException;
import com.nocountry.ecommerce.domain.exception.DuplicateResourceException;
import com.nocountry.ecommerce.domain.exception.ResourceNotFoundException;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.CheckoutResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderServicePort {

    private final OrderRepositoryPort orderRepositoryPort;
    private final UserRepositoryPort userRepositoryPort;
    private final PlanRepositoryPort planRepositoryPort;
    private final PasswordEncoder passwordEncoder;
    private final PaymentServiceImpl paymentService;

    private static final String UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    private static final String DIGITS = "0123456789";
    private static final String SPECIAL = "!@#$%&*";
    private static final SecureRandom RANDOM = new SecureRandom();

    @Override
    @Transactional
    public Order createOrder(Order order) {
        Business business = order.getBusiness();
        if (business == null || business.getOwner() == null) {
            throw new BadRequestException(ErrorMessage.BUSINESS_OWNER_REQUIRED);
        }

        Person owner = business.getOwner();

        // El email se usa como userName
        validateUserNameUnique(owner.getEmailAddress());

        Plan plan = getPlanOrThrow(order.getPlan().getId());

        // 1. Crear el usuario asociado a la persona (esto guarda Person y User)
        User newUser = createNewUser(owner);
        String rawPassword = newUser.getGeneratedPassword();

        // 2. Preparar la orden
        order.setPlan(plan);
        order.setPriceTotal(plan.getCosto());
        order.setDate(LocalDateTime.now());

        if (order.getStatus() == null) {
            order.setStatus(RegistrationStatus.PENDIENTE);
        }

        // 3. Guardar la orden (esto guarda Business, Metadata, Campaign gracias a los
        // cascades)
        Order savedOrder = orderRepositoryPort.save(order);

        // LLAMAR SERVICIO DE STRIPE
        // Creamos la sesión usando el ID que acaba de generar la DB
        CheckoutResponseDTO stripeSession = paymentService.createPaymentSession(savedOrder);

        // Guardar la URL y el SessionId en el objeto de respuesta
        savedOrder.setStripeInvoiceId(stripeSession.getSessionId());
        savedOrder.setUrlRecibo(stripeSession.getSessionUrl());

        // Guardado final en DB
        Order finalOrder = orderRepositoryPort.save(savedOrder);

        // Pasamos la contraseña generada al objeto respuesta para el frontend
        finalOrder.setGeneratedPassword(rawPassword);

        return finalOrder;
    }

    private void validateUserNameUnique(String userName) {
        if (userRepositoryPort.findByUserName(userName).isPresent()) {
            throw new DuplicateResourceException(ErrorMessage.USER_ALREADY_EXISTS, userName);
        }
    }

    private Plan getPlanOrThrow(String planId) {
        return planRepositoryPort.findById(planId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessage.PLAN_NOT_FOUND, planId));
    }

    private User createNewUser(Person person) {
        String rawPassword = generateRandomPassword(10);

        System.out.println("\n=========================================");
        System.out.println("📧 NUEVO USUARIO REGISTRADO: " + person.getEmailAddress());
        System.out.println("🔑 CONTRASEÑA GENERADA: " + rawPassword);
        System.out.println("=========================================\n");

        User user = User.builder()
                .person(person)
                .userName(person.getEmailAddress())
                .password(passwordEncoder.encode(rawPassword))
                .role(Role.ROLE_USER)
                .active(true)
                .build();

        User savedUser = userRepositoryPort.save(user);
        savedUser.setGeneratedPassword(rawPassword);
        return savedUser;
    }

    @Override
    public Optional<Order> getOrderById(Long id) {
        return orderRepositoryPort.findById(id);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepositoryPort.findAll();
    }

    @Override
    @Transactional
    public Order updateOrder(Long id, Order order) {
        Order existing = orderRepositoryPort.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessage.ORDER_NOT_FOUND, id));

        if (order.getStatus() != null)
            existing.setStatus(order.getStatus());

        return orderRepositoryPort.save(existing);
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepositoryPort.deleteById(id);
    }

    private String generateRandomPassword(int length) {
        String allChars = UPPERCASE + LOWERCASE + DIGITS + SPECIAL;
        StringBuilder password = new StringBuilder(length);

        password.append(UPPERCASE.charAt(RANDOM.nextInt(UPPERCASE.length())));
        password.append(LOWERCASE.charAt(RANDOM.nextInt(LOWERCASE.length())));
        password.append(DIGITS.charAt(RANDOM.nextInt(DIGITS.length())));
        password.append(SPECIAL.charAt(RANDOM.nextInt(SPECIAL.length())));

        for (int i = 4; i < length; i++) {
            password.append(allChars.charAt(RANDOM.nextInt(allChars.length())));
        }

        char[] chars = password.toString().toCharArray();
        for (int i = chars.length - 1; i > 0; i--) {
            int j = RANDOM.nextInt(i + 1);
            char temp = chars[i];
            chars[i] = chars[j];
            chars[j] = temp;
        }

        return new String(chars);
    }
}
