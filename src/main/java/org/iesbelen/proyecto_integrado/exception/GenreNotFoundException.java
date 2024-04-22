package org.iesbelen.proyecto_integrado.exception;

public class GenreNotFoundException extends RuntimeException {
    public GenreNotFoundException(Long id) {
        super("Not found Genre with id: " + id);
    }
}
