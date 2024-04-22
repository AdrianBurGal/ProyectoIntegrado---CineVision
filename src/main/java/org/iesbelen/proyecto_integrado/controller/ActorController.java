package org.iesbelen.proyecto_integrado.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.proyecto_integrado.domain.Actor;
import org.iesbelen.proyecto_integrado.service.ActorService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/administration/actor")
public class ActorController {

    private final ActorService actorService;

    public ActorController(ActorService actorService) {
        this.actorService = actorService;
    }

    @GetMapping({"", "/"})
    public List<Actor> all() {
        log.info("Accediendo a todas las actores");
        return this.actorService.all();
    }

    @PostMapping({"/newActor", "/newActor/"})
    public Actor newActor(@RequestBody Actor actor) {
        System.out.println(actor.toString());
        return this.actorService.save(actor);
    }

    @GetMapping("/{id}")
    public Actor one(@PathVariable("id") Long id) {
        return this.actorService.one(id);
    }

    @PutMapping("/replaceActor/{id}")
    public Actor replaceActor(@PathVariable("id") Long id, @RequestBody Actor actor) {
        return this.actorService.replace(id, actor);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/deleteActor/{id}")
    public void deleteActor(@PathVariable("id") Long id) {
        System.out.println("Borrando actor con id: " + id);
        this.actorService.delete(id);
    }

}
