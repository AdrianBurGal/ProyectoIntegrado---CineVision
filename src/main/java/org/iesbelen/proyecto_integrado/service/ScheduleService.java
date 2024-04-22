package org.iesbelen.proyecto_integrado.service;

import org.iesbelen.proyecto_integrado.domain.Schedule;
import org.iesbelen.proyecto_integrado.exception.ScheduleNotFoundException;
import org.iesbelen.proyecto_integrado.repository.ScheduleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
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
}
