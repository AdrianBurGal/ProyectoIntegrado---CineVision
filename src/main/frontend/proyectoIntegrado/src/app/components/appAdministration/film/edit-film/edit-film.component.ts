import {Component, inject, OnInit} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FilmService} from "../../../../services/film.service";
import {Film} from "../../../../models/Film";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-film',
  standalone: true,
  imports: [AdministrationComponent, HeaderAdminComponent, AsyncPipe,
    NgIf, RouterLink, FormsModule, ReactiveFormsModule],
  template: `
      <div id="mainAdmin">
          <app-administration></app-administration>
          <div id="contTableAdmin">
              <app-header-admin></app-header-admin>
              <div id="container01">
                  <h1>Update Film</h1>
              </div>
              <form [formGroup]="filmForm" (ngSubmit)="updateFilm()">
                  <div class="form-group">
                      <label for="title">Title:</label>
                      <input type="text" id="title" name="title" formControlName="title">
                      <div *ngIf="submitted && form['title'].errors?.['required']"
                           class="error-message"> Title is required
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="duration">Duration (minutes):</label>
                      <input type="number" id="duration" name="duration" formControlName="duration">
                      <div *ngIf="submitted && form['duration'].errors?.['required']"
                           class="error-message">Duration is required
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="releaseDate">Release date:</label>
                      <input type="date" id="releaseDate" name="releaseDate" formControlName="releaseDate">
                      <div *ngIf="submitted && form['releaseDate'].errors?.['required']"
                           class="error-message">Release date is required
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="sinopsis">Sinopsis:</label>
                      <textarea id="sinopsis" name="sinopsis" formControlName="sinopsis" rows="4"></textarea>
                      <div *ngIf="submitted && form['sinopsis'].errors?.['required']"
                           class="error-message">Sinopsis is required
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="score">Score:</label>
                      <input type="number" id="score" name="score" formControlName="score" step="0.1" min="0" max="10">
                      <div *ngIf="submitted && form['score'].errors?.['required']"
                           class="error-message">Score is required
                      </div>
                      <div *ngIf="submitted && (form['score'].errors?.['min'] || form['score'].errors?.['max'])"
                           class="error-message">Score must be between 0 and 10
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="photoUrl">URL of photo:</label>
                      <input type="url" id="photoUrl" name="photoUrl" formControlName="photoUrl">
                      <div *ngIf="submitted && form['photoUrl'].errors?.['required']"
                           class="error-message">Photo URL is required
                      </div>
                      <div *ngIf="submitted && form['photoUrl'].errors?.['pattern']"
                           class="error-message">Invalid URL format
                      </div>
                  </div>
                  <button type="submit">Update</button>
              </form>
          </div>
      </div>
  `,
  styleUrl: './edit-film.component.css'
})
export class EditFilmComponent implements OnInit {
  filmID: number | undefined;
  film!: Film;
  filmService = inject(FilmService);
  filmForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.filmForm = this.formBuilder.group({
      idFilm: [''],
      title: ['', Validators.required],
      duration: ['', Validators.required],
      releaseDate: ['', Validators.required],
      sinopsis: ['', Validators.required],
      score: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      photoUrl: ['', [Validators.required, Validators.pattern('(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png)')]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.filmID = +params['id'];
      this.getFilm(this.filmID);
    })
  }

  get form() {
    return this.filmForm.controls;
  }

  getFilm(id: number) {
    this.filmService.find(id).subscribe(film => {
      this.film = film;
      this.filmForm.patchValue(this.film);
    });
  }

  updateFilm() {
    this.submitted = true;
    if (this.filmForm.invalid) {
      return;
    }
    if (this.filmID) {
      this.filmService.update(this.filmID, this.filmForm.value).subscribe();
      this.router.navigate(['administration/films']);
    }
  }
}
