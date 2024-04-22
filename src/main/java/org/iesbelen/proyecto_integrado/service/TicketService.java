package org.iesbelen.proyecto_integrado.service;

import org.iesbelen.proyecto_integrado.domain.Ticket;
import org.iesbelen.proyecto_integrado.exception.TicketNotFoundException;
import org.iesbelen.proyecto_integrado.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<Ticket> all() {
        return this.ticketRepository.findAll();
    }

    public Ticket save(Ticket ticket) {
        return this.ticketRepository.save(ticket);
    }

    public Ticket one(Long id) {
        return this.ticketRepository.findById(id)
                .orElseThrow(() -> new TicketNotFoundException(id));
    }

    public Ticket replace(Long id, Ticket ticket) {
        return this.ticketRepository.findById(id).map(t -> (id.equals(ticket.getIdTicket()) ?
                        this.ticketRepository.save(ticket) : null))
                .orElseThrow(() -> new TicketNotFoundException(id));
    }

    public void delete(Long id) {
        this.ticketRepository.findById(id).map(ticket -> {
                    this.ticketRepository.delete(ticket);
                    return ticket;
                })
                .orElseThrow(() -> new TicketNotFoundException(id));
    }

}
