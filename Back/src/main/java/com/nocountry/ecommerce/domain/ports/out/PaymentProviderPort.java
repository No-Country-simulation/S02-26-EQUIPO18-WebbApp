package com.nocountry.ecommerce.domain.ports.out;

import com.nocountry.ecommerce.domain.model.Order;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.CheckoutResponseDTO;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.StripePaymentRequestDTO;
import com.stripe.model.Event;

public interface PaymentProviderPort {
    // Definimos que el proveedor debe devolver la URL de pago de Stripe
    CheckoutResponseDTO createCheckoutSession(StripePaymentRequestDTO requestDTO);
    public Event constructEvent(String payload, String sigHeader);
}
