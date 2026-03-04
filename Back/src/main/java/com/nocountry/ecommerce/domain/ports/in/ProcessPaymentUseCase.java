package com.nocountry.ecommerce.domain.ports.in;

import com.nocountry.ecommerce.domain.model.Order;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.CheckoutResponseDTO;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.StripePaymentRequestDTO;

public interface ProcessPaymentUseCase {

    CheckoutResponseDTO createPaymentSession(Order order);

    // CheckoutResponseDTO createPaymentSession(StripePaymentRequestDTO request);

    void handlePaymentWebhook(String payload, String sigHeader);
}
