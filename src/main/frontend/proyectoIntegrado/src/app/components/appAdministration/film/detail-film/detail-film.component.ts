import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {ActivatedRoute} from "@angular/router";
import {FilmService} from "../../../../services/film.service";
import {Observable} from "rxjs";
import {Film} from "../../../../models/Film";
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-detail-film',
  standalone: true,
  imports: [AsyncPipe, AdministrationComponent, HeaderAdminComponent, NgIf, DatePipe],
  template: `
      <div id="mainAdmin">
          <app-administration/>
          <div id="contTableAdmin">
              <app-header-admin/>
              <h1>Details film</h1>
              <form *ngIf="film | async as film">
                  <div class="form-group">
                      <label for="idFilm">ID:</label>
                      <input type="text" id="idFilm" name="idFilm" value="{{film.idFilm}}" readonly>
                  </div>
                  <div class="form-group">
                      <label for="title">Title:</label>
                      <input type="text" id="title" name="title" value="{{film.title}}" readonly>
                  </div>
                  <div class="form-group">
                      <label for="duration">Duration (minutes):</label>
                      <input type="text" id="duration" name="duration" value="{{film.duration}}" readonly>
                  </div>
                  <div class="form-group">
                      <label for="releaseDate">Release date:</label>
                      <input type="text" id="releaseDate" name="releaseDate"
                             value="{{film.releaseDate | date:'yyyy-MM-dd'}}" readonly>
                  </div>
                  <div class="form-group">
                      <label for="sinopsis">Sinopsis:</label>
                      <input type="text" id="sinopsis" name="sinopsis" value="{{film.sinopsis}}" readonly>
                  </div>
                  <div class="form-group">
                      <label for="score">Score:</label>
                      <input type="text" id="score" name="score" value="{{film.score}}" readonly>
                  </div>
                  <div class="form-group">
                      <label for="photoUrl">Photo URL:</label>
                      <input type="text" id="photoUrl" name="photoUrl" value="{{film.photoUrl}}" readonly>
                  </div>
                  <div class="form-group">
                      <label for="trailer">Trailer:</label>
                      <input type="text" id="trailer" name="trailer" value="{{film.trailer}}" readonly>
                  </div>
              </form>
          </div>
      </div>
  `,
  styleUrl: './detail-film.component.css'
})
export class DetailFilmComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  filmService = inject(FilmService);
  film: Observable<Film | undefined>;

  constructor() {
    const idFilm = Number(this.route.snapshot.params['id']);
    this.film = this.filmService.find(idFilm);
    console.log(this.film)
  }
}
