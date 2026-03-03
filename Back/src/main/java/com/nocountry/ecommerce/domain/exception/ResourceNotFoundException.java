package com.nocountry.ecommerce.domain.exception;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends BaseException {
    public ResourceNotFoundException(String message) {
        super(message, "RESOURCE_NOT_FOUND", HttpStatus.NOT_FOUND);
    }

    public ResourceNotFoundException(ErrorMessage message, Object... args) {
        super(message.format(args), message.name(), HttpStatus.NOT_FOUND);
    }
}
