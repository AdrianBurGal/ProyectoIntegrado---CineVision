package org.iesbelen.proyecto_integrado.exception;

public class FilmNotFoundException extends RuntimeException {
    public FilmNotFoundException(Long id) {
        super("Not found Film with id: " + id);
    }
}

