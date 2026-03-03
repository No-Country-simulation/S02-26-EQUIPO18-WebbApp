package com.nocountry.ecommerce.domain.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorMessage {
    USER_NOT_FOUND("User not found with email: %s"),
    USER_ALREADY_EXISTS("User already exists with email: %s"),
    ORDER_NOT_FOUND("Order not found with id: %d"),
    PLAN_NOT_FOUND("Plan not found with id: %s"),
    BUSINESS_OWNER_REQUIRED("Business and Owner data are mandatory"),
    INVALID_ORDER_STATUS("Invalid order status: %s"),
    UNEXPECTED_ERROR("An unexpected error occurred: %s"),
    INTERNAL_SERVER_ERROR("Internal server error: %s"),
    EMAIL_ALREADY_REGISTERED("The email %s is already registered"),
    GENERIC_BAD_REQUEST("Invalid request parameters"),
    INVALID_CREDENTIALS("Invalid email or password"),
    MISSING_REQUEST_BODY("Request body is missing"),
    RESOURCE_NOT_FOUND("The requested resource was not found");

    private final String message;

    public String format(Object... args) {
        return String.format(message, args);
    }
}
