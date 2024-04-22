package org.iesbelen.proyecto_integrado.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.proyecto_integrado.domain.Director;
import org.iesbelen.proyecto_integrado.service.DirectorService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/administration/director")
public class DirectorController {

    private final DirectorService directorService;

    public DirectorController(DirectorService directorService) {
        this.directorService = directorService;
    }

    @GetMapping({"", "/"})
    public List<Director> all() {
        log.info("Accediendo a todas las directores");
        return this.directorService.all();
    }

    @PostMapping({"/newDirector", "/newDirector/"})
    public Director newDirector(@RequestBody Director director) {
        System.out.println(director.toString());
        return this.directorService.save(director);
    }

    @GetMapping("/{id}")
    public Director one(@PathVariable("id") Long id) {
        return this.directorService.one(id);
    }

    @PutMapping("/replaceDirector/{id}")
    public Director replaceDirector(@PathVariable("id") Long id, @RequestBody Director director) {
        return this.directorService.replace(id, director);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/deleteDirector/{id}")
    public void deleteDirector(@PathVariable("id") Long id) {
        System.out.println("Borrando director con id: " + id);
        this.directorService.delete(id);
    }

}
