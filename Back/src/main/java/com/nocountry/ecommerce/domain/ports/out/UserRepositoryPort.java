package com.nocountry.ecommerce.domain.ports.out;

import com.nocountry.ecommerce.domain.model.User;
import java.util.Optional;

public interface UserRepositoryPort {
    User save(User user);

    Optional<User> findById(Long id);

    Optional<User> findByEmail(String email);
}
