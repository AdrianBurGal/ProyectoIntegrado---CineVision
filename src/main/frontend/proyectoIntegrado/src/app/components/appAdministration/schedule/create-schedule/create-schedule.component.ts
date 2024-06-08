import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FilmService} from "../../../../services/film.service";
import {Film} from "../../../../models/Film";
import {Router} from "@angular/router";
import {ScheduleService} from "../../../../services/schedule.service";

@Component({
  selector: 'app-create-schedule',
  standalone: true,
  imports: [AdministrationComponent, HeaderAdminComponent, NgForOf, NgIf, ReactiveFormsModule],
  template: `
      <div id="mainAdmin">
          <app-administration/>
          <div id="contTableAdmin">
              <app-header-admin/>
              <h1>Create Schedule</h1>
              <form [formGroup]="scheduleForm" (ngSubmit)="createSchedule()">
                  <div class="form-group">
                      <label for="time">Time:</label>
                      <input type="text" id="time" name="time" formControlName="time">
                      <div *ngIf="submitted && form['time'].errors?.['required']"
                           class="error-message">Time is required
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
  styleUrl: './create-schedule.component.css'
})
export class CreateScheduleComponent {

  scheduleService = inject(ScheduleService);
  filmService = inject(FilmService);
  scheduleForm: FormGroup;
  films?: Film[];
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.scheduleForm = this.formBuilder.group({
      time: ['', Validators.required],
      film: ['', Validators.required],
    });
    this.getFilms();
  }

  get form() {
    return this.scheduleForm.controls;
  }

  createSchedule(): void {
    this.submitted = true;
    if (this.scheduleForm.invalid) {
      return;
    }
    this.scheduleService.create(this.scheduleForm.value).subscribe(() => {
      this.router.navigate(['administration/schedule']);
    });
  }

  getFilms() {
    this.filmService.getAll().subscribe(films => {
      this.films = films;
    });
  }

}
