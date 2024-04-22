package org.iesbelen.proyecto_integrado.exception;

public class TicketNotFoundException extends RuntimeException {
    public TicketNotFoundException(Long id) {
        super("Not found Ticket with id: " + id);
    }
}
