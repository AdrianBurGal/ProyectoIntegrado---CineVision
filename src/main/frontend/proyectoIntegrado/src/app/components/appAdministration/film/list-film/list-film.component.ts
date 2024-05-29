import {Component, inject, OnInit} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {Film} from "../../../../models/Film";
import {FilmService} from "../../../../services/film.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-list-film',
  standalone: true,
  imports: [AdministrationComponent, HeaderAdminComponent, NgForOf, RouterLink, NgIf],
  template: `
      <div id="mainAdmin">
          <app-administration/>
          <div id="contTableAdmin">
              <app-header-admin/>
              <div id="container01">
                  <h1>Films</h1>
                  <button class="create-button" [routerLink]="['/administration/films/newFilm']"><i class="fa-solid fa-plus"></i></button>
              </div>
              <table class="custom-table">
                  <thead>
                  <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Duration</th>
                      <th>Release Date</th>
                      <th>Sinopsis</th>
                      <th>Score</th>
                      <th>Photo</th>
                      <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody id="tbody">
                  <!-- Aquí irían los datos de la tabla -->
                  <tr *ngFor="let film of filmsFilter ">
                      <td>{{ film.idFilm }}</td>
                      <td>{{ film.title }}</td>
                      <td>{{ film.duration }}</td>
                      <td>{{ film.releaseDate }}</td>
                      <td>{{ film.sinopsis }}</td>
                      <td>{{ film.score }}</td>
                      <td>{{ film.photoUrl }}</td>
                      <td>
                          <button class="show-button"
                                  [routerLink]="['/administration/films/' + film.idFilm]">
                              <i class="fa-solid fa-eye"></i></button>
                          <button class="edit-button"
                                  [routerLink]="['/administration/films/replaceFilm/' + film.idFilm]">
                              <i class="fa-solid fa-pen-to-square"></i></button>
                          <button class="delete-button" (click)="deleteFilm(film.idFilm)">
                              <i class="fa-solid fa-trash"></i></button>
                      </td>
                  </tr>
                  </tbody>
              </table>
              <div *ngIf="filmsFilter.length === 0" class="alert">
                  There are no films with this search criteria.
              </div>
          </div>
      </div>
  `,
  styleUrl: './list-film.component.css'
})
export class ListFilmComponent implements OnInit {

  films: Film[] = [];
  filmService = inject(FilmService);
  filmsFilter: Film[] = [];
  filter: string = '';

  ngOnInit(): void {
    this.filmService.getAll().subscribe((data: Film[]) => {
      this.films = data;
      this.filmsFilter = this.films;
      console.log(this.films);
    })
  }

  deleteFilm(id: any) {
    this.filmService.delete(id).subscribe(res => {
      this.filmsFilter = this.films.filter(film => film.idFilm !== id);
      console.log('Film id =' + id + ' delete satisfactory!');
    })
  }

  filterFilmsByName(): void {
    console.log(this.filter)
    if (this.filter === '') {
      this.filmsFilter = this.films;
    } else {
      this.filmsFilter = this.films.filter(film => {
        return film.title.toLowerCase().includes(this.filter.toLowerCase());
      });
    }
  }

}
