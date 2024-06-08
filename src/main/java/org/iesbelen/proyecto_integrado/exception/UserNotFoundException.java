package org.iesbelen.proyecto_integrado.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("Not found User with id: " + id);
    }
}