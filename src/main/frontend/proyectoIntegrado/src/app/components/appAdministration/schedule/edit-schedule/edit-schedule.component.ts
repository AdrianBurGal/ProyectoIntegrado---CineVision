import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {Schedule} from "../../../../models/Schedule";
import {ScheduleService} from "../../../../services/schedule.service";

@Component({
  selector: 'app-edit-schedule',
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
                  <h1>Update Schedule</h1>
              </div>
              <form [formGroup]="scheduleForm" (ngSubmit)="updateSchedule()">
                  <div class="form-group">
                      <label for="time">Time:</label>
                      <input type="text" id="time" name="time" formControlName="time">
                      <div *ngIf="submitted && form['time'].errors?.['required']"
                           class="error-message"> Time is required
                      </div>
                  </div>
                  <button type="submit">Update</button>
              </form>
          </div>
      </div>
  `,
  styleUrl: './edit-schedule.component.css'
})
export class EditScheduleComponent {

  scheduleID: number | undefined;
  schedule!: Schedule;
  scheduleService = inject(ScheduleService);
  scheduleForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.scheduleForm = this.formBuilder.group({
      idSchedule: [''],
      time: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.scheduleID = +params['id'];
      this.getSchedule(this.scheduleID);
    })
  }

  get form() {
    return this.scheduleForm.controls;
  }

  getSchedule(id: number) {
    this.scheduleService.find(id).subscribe(schedule => {
      this.schedule = schedule;
      this.scheduleForm.patchValue(this.schedule);
    });
  }

  updateSchedule() {
    this.submitted = true;
    if (this.scheduleForm.invalid) {
      return;
    }
    if (this.scheduleID) {
      this.scheduleService.update(this.scheduleID, this.scheduleForm.value).subscribe();
      this.router.navigate(['administration/schedule']);
    }
  }

}
