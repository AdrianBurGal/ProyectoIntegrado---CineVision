package org.iesbelen.proyecto_integrado.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.proyecto_integrado.domain.Seat;
import org.iesbelen.proyecto_integrado.service.ScheduleService;
import org.iesbelen.proyecto_integrado.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/seats")
public class SeatController {

    private final SeatService seatService;

    public SeatController(SeatService seatService) {
        this.seatService = seatService;
    }

    @GetMapping
    public List<Seat> getAllSeats() {
        return seatService.getAllSeats();
    }

    @PostMapping("/{id}/reserve")
    public ResponseEntity<Seat> reserveSeat(@PathVariable Long id) {
        Seat reservedSeat = seatService.reserveSeat(id);
        return ResponseEntity.ok(reservedSeat);
    }
}
