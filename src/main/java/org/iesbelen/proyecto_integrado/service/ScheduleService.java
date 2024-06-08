package org.iesbelen.proyecto_integrado.service;

import org.iesbelen.proyecto_integrado.domain.Film;
import org.iesbelen.proyecto_integrado.domain.Schedule;
import org.iesbelen.proyecto_integrado.dto.ScheduleDTO;
import org.iesbelen.proyecto_integrado.exception.ScheduleNotFoundException;
import org.iesbelen.proyecto_integrado.repository.FilmRepository;
import org.iesbelen.proyecto_integrado.repository.ScheduleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final FilmRepository filmRepository;

    public ScheduleService(ScheduleRepository scheduleRepository, FilmRepository filmRepository) {
        this.scheduleRepository = scheduleRepository;
        this.filmRepository = filmRepository;
    }

    public List<Schedule> all() {
        return this.scheduleRepository.findAll();
    }

    public Schedule save(Schedule schedule) {
        return this.scheduleRepository.save(schedule);
    }

    public Schedule one(Long id) {
        return this.scheduleRepository.findById(id)
                .orElseThrow(() -> new ScheduleNotFoundException(id));
    }

    public Schedule replace(Long id, Schedule schedule) {
        return this.scheduleRepository.findById(id).map(s -> (id.equals(schedule.getIdSchedule()) ?
                        this.scheduleRepository.save(schedule) : null))
                .orElseThrow(() -> new ScheduleNotFoundException(id));
    }

    public void delete(Long id) {
        this.scheduleRepository.findById(id).map(schedule -> {
                    this.scheduleRepository.delete(schedule);
                    return schedule;
                })
                .orElseThrow(() -> new ScheduleNotFoundException(id));
    }

    public Schedule scheduleDTOtoSchedule(ScheduleDTO scheduleDTO) {

        Schedule schedule = new Schedule();
        schedule.setIdSchedule(scheduleDTO.getIdSchedule());
        schedule.setTime(scheduleDTO.getTime());

        Optional<Film> film = filmRepository.findById(scheduleDTO.getFilm().getIdFilm());
        film.ifPresent(schedule::setFilm);
        return schedule;
    }

}
