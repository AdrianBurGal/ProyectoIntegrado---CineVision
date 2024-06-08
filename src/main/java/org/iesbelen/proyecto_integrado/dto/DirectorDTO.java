package org.iesbelen.proyecto_integrado.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DirectorDTO {
    private long idDirector;
    private String nameDirector;
    private FilmDTO film;
}
