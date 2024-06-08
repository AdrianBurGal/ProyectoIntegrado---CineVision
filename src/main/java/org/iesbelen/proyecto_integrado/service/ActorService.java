package org.iesbelen.proyecto_integrado.service;

import org.iesbelen.proyecto_integrado.domain.Actor;
import org.iesbelen.proyecto_integrado.dto.ActorDTO;
import org.iesbelen.proyecto_integrado.domain.Film;
import org.iesbelen.proyecto_integrado.exception.FilmNotFoundException;
import org.iesbelen.proyecto_integrado.repository.ActorRepository;
import org.iesbelen.proyecto_integrado.repository.FilmRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActorService {

    private final ActorRepository actorRepository;
    private final FilmRepository filmRepository;

    public ActorService(ActorRepository actorRepository, FilmRepository filmRepository) {
        this.actorRepository = actorRepository;
        this.filmRepository = filmRepository;
    }

    public List<Actor> all() {
        return this.actorRepository.findAll();
    }

    public Actor save(Actor actor) {
        return this.actorRepository.save(actor);
    }

    public Actor one(Long id) {
        return this.actorRepository.findById(id)
                .orElseThrow(() -> new FilmNotFoundException(id));
    }

    public Actor replace(Long id, Actor actor) {
        return this.actorRepository.findById(id).map(a -> (id.equals(actor.getIdActor()) ?
                        this.actorRepository.save(actor) : null))
                .orElseThrow(() -> new FilmNotFoundException(id));
    }

    public void delete(Long id) {
        this.actorRepository.findById(id).map(actor -> {
                    this.actorRepository.delete(actor);
                    return actor;
                })
                .orElseThrow(() -> new FilmNotFoundException(id));
    }

    public Actor actorDTOtoActor(ActorDTO actorDTO) {

        Actor actor = new Actor();
        actor.setIdActor(actorDTO.getIdActor());
        actor.setNameActor(actorDTO.getNameActor());

        Optional<Film> film = filmRepository.findById(actorDTO.getFilm().getIdFilm());
        actor.setFilm(film.get());

        return actor;
    }

}
