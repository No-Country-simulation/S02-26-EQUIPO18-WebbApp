package com.nocountry.ecommerce.domain.ports.out;

import com.nocountry.ecommerce.domain.model.Order;
import java.util.List;
import java.util.Optional;

public interface OrderRepositoryPort {
    Order save(Order order);

    Optional<Order> findById(Long id);

    List<Order> findAll();

    void deleteById(Long id);
}
