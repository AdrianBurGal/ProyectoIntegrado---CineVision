package org.iesbelen.proyecto_integrado.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ActorDTO {
    private long idActor;
    private String nameActor;
    private FilmDTO film;
}
