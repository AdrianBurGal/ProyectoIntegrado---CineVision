package org.iesbelen.proyecto_integrado.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ScheduleDTO {
    private long idSchedule;
    private String time;
    private FilmDTO film;
}
