package org.iesbelen.proyecto_integrado.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.proyecto_integrado.domain.Genre;
import org.iesbelen.proyecto_integrado.service.GenreService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/administration/genre")
public class GenreController {

    private final GenreService genreService;

    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping({"", "/"})
    public List<Genre> all() {
        log.info("Accediendo a todos los géneros.");
        return this.genreService.all();
    }

    @PostMapping({"/newGenre", "/newGenre/"})
    public Genre newGenre(@RequestBody Genre genre) {
        System.out.println(genre.toString());
        return this.genreService.save(genre);
    }

    @GetMapping("/{id}")
    public Genre one(@PathVariable("id") Long id) {
        return this.genreService.one(id);
    }

    @PutMapping("/replaceGenre/{id}")
    public Genre replaceGenre(@PathVariable("id") Long id, @RequestBody Genre genre) {
        return this.genreService.replace(id, genre);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/deleteGenre/{id}")
    public void deleteGenre(@PathVariable("id") Long id) {
        System.out.println("Borrando género con id: " + id);
        this.genreService.delete(id);
    }

}
