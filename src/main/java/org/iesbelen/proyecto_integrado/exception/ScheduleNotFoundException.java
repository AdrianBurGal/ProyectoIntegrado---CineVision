package org.iesbelen.proyecto_integrado.exception;

public class ScheduleNotFoundException extends RuntimeException {
    public ScheduleNotFoundException(Long id) {
        super("Not found Schedule with id: " + id);
    }
}
