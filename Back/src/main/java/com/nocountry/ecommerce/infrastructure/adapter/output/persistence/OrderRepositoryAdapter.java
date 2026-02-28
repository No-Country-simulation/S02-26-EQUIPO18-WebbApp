package com.nocountry.ecommerce.infrastructure.adapter.output.persistence;

import com.nocountry.ecommerce.domain.model.Order;
import com.nocountry.ecommerce.domain.ports.out.OrderRepositoryPort;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.mapper.OrderMapper;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.repository.JpaOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class OrderRepositoryAdapter implements OrderRepositoryPort {

    private final JpaOrderRepository jpaOrderRepository;
    private final OrderMapper orderMapper;

    @Override
    public Order save(Order order) {
        return orderMapper.toDomain(jpaOrderRepository.save(orderMapper.toEntity(order)));
    }

    @Override
    public Optional<Order> findById(Long id) {
        return jpaOrderRepository.findById(id).map(orderMapper::toDomain);
    }

    @Override
    public List<Order> findAll() {
        return jpaOrderRepository.findAll().stream()
                .map(orderMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id) {
        jpaOrderRepository.deleteById(id);
    }
}
