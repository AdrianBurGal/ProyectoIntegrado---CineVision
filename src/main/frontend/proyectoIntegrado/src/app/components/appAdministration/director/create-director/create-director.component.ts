import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {DirectorService} from "../../../../services/director.service";
import {FilmService} from "../../../../services/film.service";
import {Film} from "../../../../models/Film";

@Component({
  selector: 'app-create-director',
  standalone: true,
  imports: [AdministrationComponent, FormsModule, HeaderAdminComponent, NgIf, ReactiveFormsModule, NgForOf],
  template: `
      <div id="mainAdmin">
          <app-administration/>
          <div id="contTableAdmin">
              <app-header-admin/>
              <h1>Create Director</h1>
              <form [formGroup]="directorForm" (ngSubmit)="createDirector()">
                  <div class="form-group">
                      <label for="nameDirector">Director:</label>
                      <input type="text" id="nameDirector" name="nameDirector" formControlName="nameDirector">
                      <div *ngIf="submitted && form['nameDirector'].errors?.['required']"
                           class="error-message">Director is required
                      </div>
                  </div>

                  <div class="form-group">
                      <label for="film">Film:</label>
                      <select id="film" name="film" formControlName="film" class="form-control">
                          <option value="" disabled selected>Select a film</option>
                          <option *ngFor="let film of films" [ngValue]="film">{{ film.title }}</option>
                      </select>
                      <div *ngIf="submitted && form['film'].errors?.['required']"
                           class="error-message">Film is required
                      </div>
                  </div>
                  <button type="submit">Submit</button>
              </form>
          </div>
      </div>
  `,
  styleUrl: './create-director.component.css'
})
export class CreateDirectorComponent {

  directorService = inject(DirectorService);
  filmService = inject(FilmService);
  directorForm: FormGroup;
  films?: Film[];
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.directorForm = this.formBuilder.group({
      nameDirector: ['', Validators.required],
      film: ['', Validators.required],
    });
    this.getFilms();
  }

  get form() {
    return this.directorForm.controls;
  }

  createDirector(): void {
    this.submitted = true;
    if (this.directorForm.invalid) {
      return;
    }
    this.directorService.create(this.directorForm.value).subscribe(() => {
      this.router.navigate(['administration/director']);
    });
  }

  getFilms() {
    this.filmService.getAll().subscribe(films => {
      this.films = films;
    });
  }
}
