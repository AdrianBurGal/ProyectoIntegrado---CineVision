package org.iesbelen.proyecto_integrado.service;

import org.iesbelen.proyecto_integrado.domain.Film;
import org.iesbelen.proyecto_integrado.domain.Schedule;
import org.iesbelen.proyecto_integrado.exception.FilmNotFoundException;
import org.iesbelen.proyecto_integrado.repository.FilmRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class FilmService {

    private final FilmRepository filmRepository;

    public FilmService(FilmRepository filmRepository) {
        this.filmRepository = filmRepository;
    }

    public List<Film> all() {
        return this.filmRepository.findAll();
    }

    public Film save(Film film) {
        return this.filmRepository.save(film);
    }

    public Film one(Long id) {
        return this.filmRepository.findById(id)
                .orElseThrow(() -> new FilmNotFoundException(id));
    }

    public Film replace(Long id, Film film) {
        return this.filmRepository.findById(id).map(f -> (id.equals(film.getIdFilm()) ?
                        this.filmRepository.save(film) : null))
                .orElseThrow(() -> new FilmNotFoundException(id));
    }

    public void delete(Long id) {
        this.filmRepository.findById(id).map(film -> {
                    this.filmRepository.delete(film);
                    return film;
                })
                .orElseThrow(() -> new FilmNotFoundException(id));
    }

}
