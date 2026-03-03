package com.nocountry.ecommerce.domain.exception;

import org.springframework.http.HttpStatus;

public class PaymentException extends BaseException {
    public PaymentException(String message) {
        super(message, "PAYMENT_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public PaymentException(String message, HttpStatus status) {
        super(message, "PAYMENT_ERROR", status);
    }
}
