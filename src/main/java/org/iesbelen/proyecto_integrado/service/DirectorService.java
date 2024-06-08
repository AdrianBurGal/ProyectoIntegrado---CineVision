package org.iesbelen.proyecto_integrado.service;
import org.iesbelen.proyecto_integrado.domain.Director;
import org.iesbelen.proyecto_integrado.domain.Film;
import org.iesbelen.proyecto_integrado.dto.DirectorDTO;
import org.iesbelen.proyecto_integrado.exception.FilmNotFoundException;
import org.iesbelen.proyecto_integrado.repository.DirectorRepository;
import org.iesbelen.proyecto_integrado.repository.FilmRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DirectorService {

    private final DirectorRepository directorRepository;
    private final FilmRepository filmRepository;

    public DirectorService(DirectorRepository directorRepository, FilmRepository filmRepository) {
        this.directorRepository = directorRepository;
        this.filmRepository = filmRepository;
    }

    public List<Director> all() {
        return this.directorRepository.findAll();
    }

    public Director save(Director director) {
        return this.directorRepository.save(director);
    }

    public Director one(Long id) {
        return this.directorRepository.findById(id)
                .orElseThrow(() -> new FilmNotFoundException(id));
    }

    public Director replace(Long id, Director director) {
        return this.directorRepository.findById(id).map(d -> (id.equals(director.getIdDirector()) ?
                        this.directorRepository.save(director) : null))
                .orElseThrow(() -> new FilmNotFoundException(id));
    }

    public void delete(Long id) {
        this.directorRepository.findById(id).map(director -> {
                    this.directorRepository.delete(director);
                    return director;
                })
                .orElseThrow(() -> new FilmNotFoundException(id));
    }

    public Director directorDTOtoDirector(DirectorDTO directorDTO) {

        Director director = new Director();
        director.setIdDirector(directorDTO.getIdDirector());
        director.setNameDirector(directorDTO.getNameDirector());

        Optional<Film> film = filmRepository.findById(directorDTO.getFilm().getIdFilm());
        director.setFilm(film.get());

        return director;
    }

}
