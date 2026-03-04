package com.nocountry.ecommerce.application.service;

import com.nocountry.ecommerce.domain.model.Role;
import com.nocountry.ecommerce.domain.model.User;
import com.nocountry.ecommerce.domain.ports.in.AuthServicePort;
import com.nocountry.ecommerce.domain.exception.ErrorMessage;
import com.nocountry.ecommerce.domain.ports.out.JwtPort;
import com.nocountry.ecommerce.domain.ports.out.UserRepositoryPort;
import com.nocountry.ecommerce.domain.exception.DuplicateResourceException;
import com.nocountry.ecommerce.domain.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthServicePort {

    private final UserRepositoryPort userRepositoryPort;
    private final PasswordEncoder passwordEncoder;
    private final JwtPort jwtPort;
    private final AuthenticationManager authenticationManager;

    @Override
    public String login(String email, String password) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));

        User user = userRepositoryPort.findByUserName(email)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorMessage.USER_NOT_FOUND, email));

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole().name());

        return jwtPort.generateToken(user.getUserName(), claims);
    }

    @Override
    public User register(User user) {
        if (userRepositoryPort.findByUserName(user.getUserName()).isPresent()) {
            throw new DuplicateResourceException(ErrorMessage.EMAIL_ALREADY_REGISTERED, user.getUserName());
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null) {
            user.setRole(Role.ROLE_USER);
        }

        return userRepositoryPort.save(user);
    }
}
