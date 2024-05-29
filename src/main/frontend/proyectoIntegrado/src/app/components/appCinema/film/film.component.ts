import {Component, Input} from '@angular/core';
import {Film} from "../../../models/Film";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-film',
  standalone: true,
  imports: [RouterLink],
  template: `
      <article class="cardFilm" routerLink="/details/{{ film.idFilm }}">
          <img src="{{ film.photoUrl }}" alt="photoFilm">
          <div class="contInfoFilm">
              <h4>{{ film.title }}</h4>
              <div class="info">
                  <p> {{ film.duration }} min</p>
                  <p id="score"> <i class="fa-solid fa-star"></i> {{ film.score }} </p>
              </div>
          </div>
      </article>
  `,
  styleUrl: './film.component.css'
})
export class FilmComponent {
  @Input() film!: Film;
}
