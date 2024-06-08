import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {GenreService} from "../../../../services/genreService";
import {Genre} from "../../../../models/Genre";

@Component({
  selector: 'app-detail-genre',
  standalone: true,
  imports: [AdministrationComponent, AsyncPipe, DatePipe, HeaderAdminComponent, NgIf],
  template: `
      <div id="mainAdmin">
          <app-administration/>
          <div id="contTableAdmin">
              <app-header-admin/>
              <h1>Details Genre</h1>
              <form *ngIf="genre | async as genre">
                  <div class="form-group">
                      <label for="idGenre">ID:</label>
                      <input type="text" id="idGenre" name="idGenre" value="{{genre.idGenre}}" readonly>
                  </div>
                  <div class="form-group">
                      <label for="genre">Genre:</label>
                      <input type="text" id="genre" name="genre" value="{{genre.nameGenre}}" readonly>
                  </div>
              </form>
          </div>
      </div>
  `,
  styleUrl: './detail-genre.component.css'
})
export class DetailGenreComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  genreService = inject(GenreService);
  genre: Observable<Genre | undefined>;

  constructor() {
    const idGenre = Number(this.route.snapshot.params['id']);
    this.genre = this.genreService.find(idGenre);
    console.log(this.genre)
  }

}
