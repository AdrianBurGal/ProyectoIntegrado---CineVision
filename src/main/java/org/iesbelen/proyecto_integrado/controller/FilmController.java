package org.iesbelen.proyecto_integrado.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.proyecto_integrado.domain.Film;
import org.iesbelen.proyecto_integrado.service.FilmService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/administration/films")
public class FilmController {

    private final FilmService filmService;

    public FilmController(FilmService filmService) {
        this.filmService = filmService;
    }

    @GetMapping({"", "/"})
    public List<Film> all() {
        log.info("Accediendo a todas las películas");
        return this.filmService.all();
    }

    @PostMapping({"/newFilm", "/newFilm/"})
    public Film newFilm(@RequestBody Film film) {
        System.out.println(film.toString());
        return this.filmService.save(film);
    }

    @GetMapping("/{id}")
    public Film one(@PathVariable("id") Long id) {
        return this.filmService.one(id);
    }

    @PutMapping("/replaceFilm/{id}")
    public Film replaceFilm(@PathVariable("id") Long id, @RequestBody Film film) {
        return this.filmService.replace(id, film);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/deleteFilm/{id}")
    public void deleteFilm(@PathVariable("id") Long id) {
        System.out.println("Borrando película con id: " + id);
        this.filmService.delete(id);
    }
}