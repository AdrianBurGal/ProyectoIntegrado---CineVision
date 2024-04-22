package org.iesbelen.proyecto_integrado.service;

import org.iesbelen.proyecto_integrado.domain.Actor;
import org.iesbelen.proyecto_integrado.exception.FilmNotFoundException;
import org.iesbelen.proyecto_integrado.repository.ActorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActorService {

    private final ActorRepository actorRepository;

    public ActorService(ActorRepository actorRepository) {
        this.actorRepository = actorRepository;
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

}
