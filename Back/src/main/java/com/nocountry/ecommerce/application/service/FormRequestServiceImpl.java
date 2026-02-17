package com.nocountry.ecommerce.application.service;

import com.nocountry.ecommerce.domain.model.FormRequest;
import com.nocountry.ecommerce.domain.model.Plan;
import com.nocountry.ecommerce.domain.model.RegistrationStatus;
import com.nocountry.ecommerce.domain.model.User;
import com.nocountry.ecommerce.domain.ports.in.FormRequestServicePort;
import com.nocountry.ecommerce.domain.ports.out.PlanRepositoryPort;
import com.nocountry.ecommerce.domain.ports.out.FormRequestRepositoryPort;
import com.nocountry.ecommerce.domain.ports.out.UserRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FormRequestServiceImpl implements FormRequestServicePort {

    private final FormRequestRepositoryPort formRequestRepositoryPort;
    private final UserRepositoryPort userRepositoryPort;
    private final PlanRepositoryPort planRepositoryPort;
    private final PasswordEncoder passwordEncoder;

    private static final String UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    private static final String DIGITS = "0123456789";
    private static final String SPECIAL = "!@#$%&*";
    private static final SecureRandom RANDOM = new SecureRandom();

    @Override
    @Transactional
    public FormRequest createFormRequest(FormRequest formRequest) {
        validateEmailUnique(formRequest.getUser().getEmail());

        Plan plan = getPlanOrThrow(formRequest.getPlan().getId());

        User newUser = createNewUser(formRequest.getUser());

        formRequest.setPlan(plan);
        formRequest.setUser(newUser);

        if (formRequest.getEstadoActual() == null) {
            formRequest.setEstadoActual(RegistrationStatus.SUBMITTED);
        }

        FormRequest savedRequest = formRequestRepositoryPort.save(formRequest);

        if (savedRequest.getUser() != null) {
            savedRequest.getUser().setGeneratedPassword(newUser.getGeneratedPassword());
        }

        return savedRequest;
    }

    private void validateEmailUnique(String email) {
        if (userRepositoryPort.findByEmail(email).isPresent()) {
            throw new RuntimeException("El correo " + email + " ya está registrado en el sistema");
        }
    }

    private Plan getPlanOrThrow(String planId) {
        return planRepositoryPort.findById(planId)
                .orElseThrow(() -> new RuntimeException("Plan not found with id: " + planId));
    }

    private User createNewUser(User userRequest) {
        String rawPassword = generateRandomPassword(10);

        // TODO: Eliminar este log en producción
        System.out.println("\n=========================================");
        System.out.println("📧 NUEVO USUARIO REGISTRADO: " + userRequest.getEmail());
        System.out.println("🔑 CONTRASEÑA GENERADA: " + rawPassword);
        System.out.println("=========================================\n");

        userRequest.setPassword(passwordEncoder.encode(rawPassword));
        userRequest.setRole(com.nocountry.ecommerce.domain.model.Role.ROLE_USER);

        User savedUser = userRepositoryPort.save(userRequest);

        savedUser.setGeneratedPassword(rawPassword);
        return savedUser;
    }

    @Override
    public Optional<FormRequest> getFormRequestById(Long id) {
        return formRequestRepositoryPort.findById(id);
    }

    @Override
    public List<FormRequest> getAllFormRequests() {
        return formRequestRepositoryPort.findAll();
    }

    @Override
    @Transactional
    public FormRequest updateFormRequest(Long id, FormRequest formRequest) {
        FormRequest existing = formRequestRepositoryPort.findById(id)
                .orElseThrow(() -> new RuntimeException("FormRequest not found"));

        if (formRequest.getEstadoActual() != null)
            existing.setEstadoActual(formRequest.getEstadoActual());

        return formRequestRepositoryPort.save(existing);
    }

    @Override
    public void deleteFormRequest(Long id) {
        formRequestRepositoryPort.deleteById(id);
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
