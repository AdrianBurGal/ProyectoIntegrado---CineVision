package org.iesbelen.proyecto_integrado.repository;

import org.iesbelen.proyecto_integrado.domain.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByIsReserved(boolean isReserved);
}
