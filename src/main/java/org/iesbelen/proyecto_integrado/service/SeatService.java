package org.iesbelen.proyecto_integrado.service;

import org.iesbelen.proyecto_integrado.domain.Seat;
import org.iesbelen.proyecto_integrado.exception.SeatNotFoundException;
import org.iesbelen.proyecto_integrado.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatService {
    @Autowired
    private SeatRepository seatRepository;

    public List<Seat> getAllSeats() {
        return seatRepository.findAll();
    }

    public Seat reserveSeat(Long seatId) {
        Seat seat = seatRepository.findById(seatId).orElseThrow(() -> new SeatNotFoundException(seatId));
        seat.setReserved(true);
        return seatRepository.save(seat);
    }
}

