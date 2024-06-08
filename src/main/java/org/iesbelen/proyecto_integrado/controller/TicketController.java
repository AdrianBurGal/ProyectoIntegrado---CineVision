package org.iesbelen.proyecto_integrado.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.proyecto_integrado.domain.Ticket;
import org.iesbelen.proyecto_integrado.service.TicketService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/administration/ticket")
@CrossOrigin(origins = "http://localhost:4200")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping({"", "/"})
    public List<Ticket> all() {
        log.info("Accediendo a todas las tickets");
        return this.ticketService.all();
    }

    @PostMapping({"/newTicket", "/newTicket/"})
    public Ticket newTicket(@RequestBody Ticket ticket) {
        System.out.println(ticket.toString());
        return this.ticketService.save(ticket);
    }

    @GetMapping("/{id}")
    public Ticket one(@PathVariable("id") Long id) {
        return this.ticketService.one(id);
    }

    @PutMapping("/replaceTicket/{id}")
    public Ticket replaceTicket(@PathVariable("id") Long id, @RequestBody Ticket ticket) {
        return this.ticketService.replace(id, ticket);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/deleteTicket/{id}")
    public void deleteTicket(@PathVariable("id") Long id) {
        System.out.println("Borrando ticket con id: " + id);
        this.ticketService.delete(id);
    }

}
