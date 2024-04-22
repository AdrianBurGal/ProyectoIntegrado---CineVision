package org.iesbelen.proyecto_integrado.exception;

public class DirectorNotFoundException extends RuntimeException {
    public DirectorNotFoundException(Long id) {
        super("Not found Director with id: " + id);
    }
}
