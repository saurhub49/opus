package com.opus.exceptions;

public class OpusApplicationException extends RuntimeException {

    private final String message;

    public OpusApplicationException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
