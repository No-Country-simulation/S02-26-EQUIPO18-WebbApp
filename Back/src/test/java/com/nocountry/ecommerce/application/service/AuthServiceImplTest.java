package com.nocountry.ecommerce.application.service;

import com.nocountry.ecommerce.domain.exception.DuplicateResourceException;
import com.nocountry.ecommerce.domain.exception.ResourceNotFoundException;
import com.nocountry.ecommerce.domain.model.Role;
import com.nocountry.ecommerce.domain.model.User;
import com.nocountry.ecommerce.domain.ports.out.JwtPort;
import com.nocountry.ecommerce.domain.ports.out.UserRepositoryPort;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock
    private UserRepositoryPort userRepositoryPort;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtPort jwtPort;
    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthServiceImpl authService;

    private User user;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .userName("test@example.com")
                .password("password")
                .role(Role.ROLE_USER)
                .build();
    }

    @Test
    void login_WithExistingUser_ShouldReturnToken() {
        when(userRepositoryPort.findByUserName("test@example.com")).thenReturn(Optional.of(user));
        when(jwtPort.generateToken(any(), any())).thenReturn("mock-token");

        String token = authService.login("test@example.com", "password");

        assertNotNull(token);
        assertEquals("mock-token", token);
        verify(authenticationManager).authenticate(any());
    }

    @Test
    void login_WithNonExistingUser_ShouldThrowResourceNotFoundException() {
        when(userRepositoryPort.findByUserName("notfound@example.com")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> authService.login("notfound@example.com", "password"));
    }

    @Test
    void register_WithNewUser_ShouldSaveUser() {
        when(userRepositoryPort.findByUserName(user.getUserName())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(any())).thenReturn("encoded-password");
        when(userRepositoryPort.save(any())).thenReturn(user);

        User savedUser = authService.register(user);

        assertNotNull(savedUser);
        verify(userRepositoryPort).save(user);
        assertEquals("encoded-password", user.getPassword());
    }

    @Test
    void register_WithExistingUser_ShouldThrowDuplicateResourceException() {
        when(userRepositoryPort.findByUserName(user.getUserName())).thenReturn(Optional.of(user));

        assertThrows(DuplicateResourceException.class, () -> authService.register(user));
    }
}
