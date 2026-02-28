package com.nocountry.ecommerce.domain.ports.in;

import com.nocountry.ecommerce.domain.model.Order;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.StripePaymentRequestDTO;

import java.util.List;
import java.util.Optional;

public interface OrderServicePort {
    Order createOrder(Order order);

    Optional<Order> getOrderById(Long id);

    List<Order> getAllOrders();

    Order updateOrder(Long id, Order order);

    void deleteOrder(Long id);

}
