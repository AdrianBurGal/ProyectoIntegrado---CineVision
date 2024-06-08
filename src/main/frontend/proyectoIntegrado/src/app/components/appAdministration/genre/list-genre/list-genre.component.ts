import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {Genre} from "../../../../models/Genre";
import {RouterLink} from "@angular/router";
import {GenreService} from "../../../../services/genreService";

@Component({
  selector: 'app-list-genre',
  standalone: true,
  imports: [AdministrationComponent, DatePipe, HeaderAdminComponent, NgForOf, NgIf, RouterLink],
  template: `
      <div id="mainAdmin">
          <app-administration/>
          <div id="contTableAdmin">
              <app-header-admin/>
              <div id="container01">
                  <h1>Genres</h1>
                  <button class="create-button" [routerLink]="['/administration/genre/newGenre']"><i
                          class="fa-solid fa-plus"></i></button>
              </div>
              <table class="custom-table">
                  <thead>
                  <tr>
                      <th>ID</th>
                      <th>Genre</th>
                      <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody id="tbody">
                  <!-- Aquí irían los datos de la tabla -->
                  <tr *ngFor="let genre of genresFilter ">
                      <td>{{ genre.idGenre }}</td>
                      <td>{{ genre.nameGenre }}</td>
                      <td>
                          <button class="show-button"
                                  [routerLink]="['/administration/genre/' + genre.idGenre]">
                              <i class="fa-solid fa-eye"></i></button>
                          <button class="edit-button"
                                  [routerLink]="['/administration/genre/replaceGenre/' + genre.idGenre]">
                              <i class="fa-solid fa-pen-to-square"></i></button>
                          <button class="delete-button" (click)="deleteGenre(genre.idGenre)">
                              <i class="fa-solid fa-trash"></i></button>
                      </td>
                  </tr>
                  </tbody>
              </table>
              <div *ngIf="genresFilter.length === 0" class="alert">
                  There are no genres with this search criteria.
              </div>
          </div>
      </div>
  `,
  styleUrl: './list-genre.component.css'
})
export class ListGenreComponent {

  genres: Genre[] = [];
  genreService = inject(GenreService);
  genresFilter: Genre[] = [];
  filter: string = '';

  ngOnInit(): void {
    this.genreService.getAll().subscribe((data: Genre[]) => {
      this.genres = data;
      this.genresFilter = this.genres;
      console.log(this.genres);
    })
  }

  deleteGenre(id: any) {
    this.genreService.delete(id).subscribe(genre => {
      this.genresFilter = this.genres.filter(genre => genre.idGenre !== id);
      console.log('Genre id =' + id + ' delete satisfactory!');
    })
  }

}
