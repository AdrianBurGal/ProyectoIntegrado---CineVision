package org.iesbelen.proyecto_integrado.exception;

public class SeatNotFoundException extends RuntimeException{
    public SeatNotFoundException(Long id) {
        super("Not found Seat with id: " + id);
    }
}
