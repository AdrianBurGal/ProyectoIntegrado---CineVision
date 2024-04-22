package org.iesbelen.proyecto_integrado.repository;

import org.iesbelen.proyecto_integrado.domain.Actor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActorRepository extends JpaRepository<Actor, Long> {
}
