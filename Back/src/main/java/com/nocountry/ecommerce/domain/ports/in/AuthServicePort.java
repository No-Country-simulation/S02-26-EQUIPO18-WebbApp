package com.nocountry.ecommerce.domain.ports.in;

import com.nocountry.ecommerce.domain.model.User;

public interface AuthServicePort {
    String login(String email, String password);

    User register(User user);
}
