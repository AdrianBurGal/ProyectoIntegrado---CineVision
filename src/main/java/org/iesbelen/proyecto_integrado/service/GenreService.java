package org.iesbelen.proyecto_integrado.service;

import org.iesbelen.proyecto_integrado.domain.Genre;
import org.iesbelen.proyecto_integrado.exception.FilmNotFoundException;
import org.iesbelen.proyecto_integrado.exception.GenreNotFoundException;
import org.iesbelen.proyecto_integrado.repository.GenreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreService {

    private final GenreRepository genreRepository;

    public GenreService(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    public List<Genre> all() {
        return this.genreRepository.findAll();
    }

    public Genre save(Genre genre) {
        return this.genreRepository.save(genre);
    }

    public Genre one(Long id) {
        return this.genreRepository.findById(id)
                .orElseThrow(() -> new GenreNotFoundException(id));
    }

    public Genre replace(Long id, Genre genre) {
        return this.genreRepository.findById(id).map(g -> (id.equals(genre.getIdGenre()) ?
                        this.genreRepository.save(genre) : null))
                .orElseThrow(() -> new GenreNotFoundException(id));
    }

    public void delete(Long id) {
        this.genreRepository.findById(id).map(genre -> {
                    this.genreRepository.delete(genre);
                    return genre;
                })
                .orElseThrow(() -> new GenreNotFoundException(id));
    }

}
