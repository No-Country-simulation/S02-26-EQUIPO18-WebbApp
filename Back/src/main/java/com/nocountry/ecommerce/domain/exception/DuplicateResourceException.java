package com.nocountry.ecommerce.domain.exception;

import org.springframework.http.HttpStatus;

public class DuplicateResourceException extends BaseException {
    public DuplicateResourceException(String message) {
        super(message, "DUPLICATE_RESOURCE", HttpStatus.CONFLICT);
    }

    public DuplicateResourceException(ErrorMessage message, Object... args) {
        super(message.format(args), message.name(), HttpStatus.CONFLICT);
    }
}
