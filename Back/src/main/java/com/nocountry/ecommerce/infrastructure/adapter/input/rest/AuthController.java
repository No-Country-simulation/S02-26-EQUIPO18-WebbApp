package com.nocountry.ecommerce.infrastructure.adapter.input.rest;

import com.nocountry.ecommerce.domain.model.Person;
import com.nocountry.ecommerce.domain.model.User;
import com.nocountry.ecommerce.domain.ports.in.AuthServicePort;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.AuthResponse;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.LoginRequest;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.RegisterRequest;
import jakarta.validation.Valid;
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
    public ResponseEntity<User> register(@Valid @RequestBody RegisterRequest request) {
        User user = User.builder()
                .person(Person.builder()
                        .name(request.getName())
                        .lastName(request.getLastName())
                        .emailAddress(request.getEmail())
                        .phoneNumber(request.getPhoneNumber())
                        .build())
                .userName(request.getEmail())
                .password(request.getPassword())
                .active(true)
                .build();

        return ResponseEntity.ok(authServicePort.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        String token = authServicePort.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(AuthResponse.builder().token(token).build());
    }
}
