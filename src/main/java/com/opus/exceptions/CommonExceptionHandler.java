package com.opus.exceptions;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CommonExceptionHandler {

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<CommonErrorResponse> handleAccessDeniedException(AccessDeniedException exception) {
        CommonErrorResponse commonErrorResponse = new CommonErrorResponse(403, exception.getMessage());
        return new ResponseEntity<>(commonErrorResponse, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<CommonErrorResponse> handleEntityNotFoundException(EntityNotFoundException exception) {
        CommonErrorResponse commonErrorResponse = new CommonErrorResponse(404, exception.getMessage());
        return new ResponseEntity<>(commonErrorResponse, HttpStatus.NOT_FOUND);
    }
}
