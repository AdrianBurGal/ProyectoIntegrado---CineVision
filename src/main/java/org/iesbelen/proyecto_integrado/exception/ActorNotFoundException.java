package org.iesbelen.proyecto_integrado.exception;

public class ActorNotFoundException extends RuntimeException {
    public ActorNotFoundException(Long id) {
        super("Not found Actor with id: " + id);
    }
}
