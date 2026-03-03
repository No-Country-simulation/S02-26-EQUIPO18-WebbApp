package com.nocountry.ecommerce.infrastructure.adapter.input.rest;

import com.nocountry.ecommerce.domain.exception.BadRequestException;
import com.nocountry.ecommerce.domain.exception.ErrorMessage;
import com.nocountry.ecommerce.domain.model.Order;
import com.nocountry.ecommerce.domain.model.RegistrationStatus;
import com.nocountry.ecommerce.domain.ports.in.OrderServicePort;
import com.nocountry.ecommerce.domain.ports.out.EmailPort;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.CheckoutResponseDTO;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.OrderRequest;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.OrderResponse;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.mapper.OrderRestMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderServicePort orderServicePort;
    private final OrderRestMapper orderRestMapper;
    private final EmailPort emailPort;

    @PostMapping
    public ResponseEntity<CheckoutResponseDTO> createOrder(
            @RequestBody @Valid OrderRequest request) {
        // Creacion de la orden
        Order domain = orderRestMapper.toDomain(request);
        Order created = orderServicePort.createOrder(domain);

        // Envio de correo
        emailPort.sendWelcomeEmail(created.getBusiness().getOwner().getEmailAddress(),
                created.getBusiness().getOwner().getName(),
                created);

        // respondemos con solo lo necesario para el pago
        return new ResponseEntity<>(orderRestMapper.toStripeResponse(created),
                HttpStatus.CREATED);
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

    /**
     * Actualizar el estado de una orden.
     * PATCH /api/v1/orders/{id}/status
     * Body: { "status": "PAGADO" }
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<OrderResponse> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        String statusStr = body.get("status");
        if (statusStr == null) {
            throw new BadRequestException(ErrorMessage.GENERIC_BAD_REQUEST);
        }
        try {
            RegistrationStatus newStatus = RegistrationStatus.valueOf(statusStr.toUpperCase());
            Order updatePayload = Order.builder().status(newStatus).build();
            Order updated = orderServicePort.updateOrder(id, updatePayload);
            return ResponseEntity.ok(orderRestMapper.toResponse(updated));
        } catch (IllegalArgumentException e) {
            throw new BadRequestException(ErrorMessage.INVALID_ORDER_STATUS, statusStr);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderServicePort.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}