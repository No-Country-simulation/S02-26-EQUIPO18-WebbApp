package com.nocountry.ecommerce.domain.ports.out;

import java.util.Map;

public interface JwtPort {
    String generateToken(String username, Map<String, Object> extraClaims);

    String extractUsername(String token);

    boolean isTokenValid(String token, String username);
}
