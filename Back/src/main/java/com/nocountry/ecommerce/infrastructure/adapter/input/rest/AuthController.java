package com.nocountry.ecommerce.infrastructure.adapter.input.rest;

import com.nocountry.ecommerce.domain.model.User;
import com.nocountry.ecommerce.domain.ports.in.AuthServicePort;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.AuthResponse;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.LoginRequest;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthServicePort authServicePort;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest request) {
        User user = User.builder()
                .nombre(request.getNombre())
                .ap(request.getAp())
                .am(request.getAm())
                .email(request.getEmail())
                .password(request.getPassword())
                .phone(request.getPhone())
                .build();

        return ResponseEntity.ok(authServicePort.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        String token = authServicePort.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(AuthResponse.builder().token(token).build());
    }
}
