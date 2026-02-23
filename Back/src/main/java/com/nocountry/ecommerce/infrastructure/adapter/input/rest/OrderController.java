package com.nocountry.ecommerce.infrastructure.adapter.input.rest;

import com.nocountry.ecommerce.domain.model.Order;
import com.nocountry.ecommerce.domain.ports.in.OrderServicePort;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.OrderRequest;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.OrderResponse;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.mapper.OrderRestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderServicePort orderServicePort;
    private final OrderRestMapper orderRestMapper;

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
            @RequestBody @Validated OrderRequest request) {
        Order domain = orderRestMapper.toDomain(request);
        Order created = orderServicePort.createOrder(domain);
        return new ResponseEntity<>(orderRestMapper.toResponse(created), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        List<OrderResponse> responses = orderServicePort.getAllOrders().stream()
                .map(orderRestMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable Long id) {
        return orderServicePort.getOrderById(id)
                .map(orderRestMapper::toResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderServicePort.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
