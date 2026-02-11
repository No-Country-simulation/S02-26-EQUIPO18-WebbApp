package com.nocountry.ecommerce.infrastructure.adapter.output.persistence;

import com.nocountry.ecommerce.domain.model.User;
import com.nocountry.ecommerce.domain.ports.out.UserRepositoryPort;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.UserEntity;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.mapper.UserMapper;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.repository.JpaUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UserRepositoryAdapter implements UserRepositoryPort {

    private final JpaUserRepository jpaUserRepository;
    private final UserMapper userMapper;

    @Override
    public User save(User user) {
        UserEntity entity = userMapper.toEntity(user);
        return userMapper.toDomain(jpaUserRepository.save(entity));
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return jpaUserRepository.findByEmail(email)
                .map(userMapper::toDomain);
    }

    @Override
    public Optional<User> findById(Long id) {
        return jpaUserRepository.findById(id)
                .map(userMapper::toDomain);
    }
}
