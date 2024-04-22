package org.iesbelen.proyecto_integrado.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.proyecto_integrado.domain.Schedule;
import org.iesbelen.proyecto_integrado.service.ScheduleService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/administration/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping({"", "/"})
    public List<Schedule> all() {
        log.info("Accediendo a todos los horarios.");
        return this.scheduleService.all();
    }

    @PostMapping({"/newSchedule", "/newSchedule/"})
    public Schedule newSchedule(@RequestBody Schedule schedule) {
        System.out.println(schedule.toString());
        return this.scheduleService.save(schedule);
    }

    @GetMapping("/{id}")
    public Schedule one(@PathVariable("id") Long id) {
        return this.scheduleService.one(id);
    }

    @PutMapping("/replaceSchedule/{id}")
    public Schedule replaceSchedule(@PathVariable("id") Long id, @RequestBody Schedule schedule) {
        return this.scheduleService.replace(id, schedule);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/deleteSchedule/{id}")
    public void deleteSchedule(@PathVariable("id") Long id) {
        System.out.println("Borrando horario con id: " + id);
        this.scheduleService.delete(id);
    }

}
