import {Component, inject, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {FilmComponent} from "../film/film.component";
import {Film} from "../../../models/Film";
import {FilmService} from "../../../services/film.service";
import {NgForOf} from "@angular/common";
import {Genre} from "../../../models/Genre";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FilmComponent, NgForOf],
  template: `
      <div id="background">
          <app-header></app-header>
      </div>
      <section id="contHome">
          <h2 class="header">OPENING THIS WEEK</h2>
          <article class="contFilms">
              <app-film *ngFor="let film of films"
                        [film]="film">
              </app-film>
          </article>
      </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  films: Film[] = [];
  filmService = inject(FilmService);

  ngOnInit(): void {
    this.filmService.getAll().subscribe(films => {
      this.films = films;
    })
  }
}
