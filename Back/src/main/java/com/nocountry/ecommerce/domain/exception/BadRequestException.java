package com.nocountry.ecommerce.domain.exception;

import org.springframework.http.HttpStatus;

public class BadRequestException extends BaseException {
    public BadRequestException(String message) {
        super(message, "BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }

    public BadRequestException(ErrorMessage message, Object... args) {
        super(message.format(args), message.name(), HttpStatus.BAD_REQUEST);
    }
}
