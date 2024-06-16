import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {Genre} from "../../../../models/Genre";
import {GenreService} from "../../../../services/genre.service";

@Component({
  selector: 'app-edit-genre',
  standalone: true,
  imports: [
    AdministrationComponent,
    FormsModule,
    HeaderAdminComponent,
    NgIf,
    ReactiveFormsModule
  ],
  template: `
      <div id="mainAdmin">
          <app-administration></app-administration>
          <div id="contTableAdmin">
              <app-header-admin></app-header-admin>
              <div id="container01">
                  <h1>Update Genre</h1>
              </div>
              <form [formGroup]="genreForm" (ngSubmit)="updateFilm()">
                  <div class="form-group">
                      <label for="nameGenre">Genre:</label>
                      <input type="text" id="nameGenre" name="nameGenre" formControlName="nameGenre">
                      <div *ngIf="submitted && form['genre'].errors?.['required']"
                           class="error-message"> Genre is required
                      </div>
                  </div>
                  <button type="submit">Update</button>
              </form>
          </div>
      </div>
  `,
  styleUrl: './edit-genre.component.css'
})
export class EditGenreComponent {

  genreID: number | undefined;
  genre!: Genre;
  genreService = inject(GenreService);
  genreForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.genreForm = this.formBuilder.group({
      idGenre: [''],
      nameGenre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.genreID = +params['id'];
      this.getGenre(this.genreID);
    })
  }

  get form() {
    return this.genreForm.controls;
  }

  getGenre(id: number) {
    this.genreService.find(id).subscribe(genre => {
      this.genre = genre;
      this.genreForm.patchValue(this.genre);
    });
  }

  updateFilm() {
    this.submitted = true;
    if (this.genreForm.invalid) {
      return;
    }
    if (this.genreID) {
      this.genreService.update(this.genreID, this.genreForm.value).subscribe();
      this.router.navigate(['administration/genre']);
    }
  }

}
