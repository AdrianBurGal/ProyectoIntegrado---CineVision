package org.iesbelen.proyecto_integrado.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "director")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Director {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_director")
    private long idDirector;
    private String nameDirector;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_film")
    @JsonIgnore
    private Film film;
}
