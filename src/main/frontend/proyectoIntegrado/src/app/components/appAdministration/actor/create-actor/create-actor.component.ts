import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ActorService} from "../../../../services/actor.service";
import {FilmService} from "../../../../services/film.service";
import {Film} from "../../../../models/Film";

@Component({
  selector: 'app-create-actor',
  standalone: true,
  imports: [AdministrationComponent, HeaderAdminComponent, NgForOf, NgIf, ReactiveFormsModule],
  template: `
    <div id="mainAdmin">
      <app-administration/>
      <div id="contTableAdmin">
        <app-header-admin/>
        <h1>Create actor</h1>
        <form [formGroup]="actorForm" (ngSubmit)="createActor()">
          <div class="form-group">
            <label for="nameActor">Actor:</label>
            <input type="text" id="nameActor" name="nameActor" formControlName="nameActor">
            <div *ngIf="submitted && form['nameActor'].errors?.['required']"
                 class="error-message">Actor is required
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
  styleUrl: './create-actor.component.css'
})
export class CreateActorComponent {

  actorService = inject(ActorService);
  filmService = inject(FilmService);
  actorForm: FormGroup;
  films?: Film[];
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.actorForm = this.formBuilder.group({
      nameActor: ['', Validators.required],
      film: ['', Validators.required],
    });
    this.getFilms();
  }

  get form() {
    return this.actorForm.controls;
  }

  createActor(): void {
    this.submitted = true;
    if (this.actorForm.invalid) {
      return;
    }
    this.actorService.create(this.actorForm.value).subscribe(() => {
      this.router.navigate(['administration/actor']);
    });
  }

  getFilms() {
    this.filmService.getAll().subscribe(films => {
      this.films = films;
    });
  }
}
