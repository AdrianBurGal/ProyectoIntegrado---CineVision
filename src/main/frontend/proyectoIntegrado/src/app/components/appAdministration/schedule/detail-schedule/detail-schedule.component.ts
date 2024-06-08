import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {ScheduleService} from "../../../../services/schedule.service";
import {Schedule} from "../../../../models/Schedule";

@Component({
  selector: 'app-detail-schedule',
  standalone: true,
  imports: [AdministrationComponent, AsyncPipe, DatePipe, HeaderAdminComponent, NgIf],
  template: `
    <div id="mainAdmin">
      <app-administration/>
      <div id="contTableAdmin">
        <app-header-admin/>
        <h1>Details Schedule</h1>
        <form *ngIf="schedule | async as schedule">
          <div class="form-group">
            <label for="idSchedule">ID:</label>
            <input type="text" id="idSchedule" name="idSchedule" value="{{schedule.idSchedule}}" readonly>
          </div>
          <div class="form-group">
            <label for="time">Time:</label>
            <input type="text" id="time" name="time" value="{{schedule.time}}" readonly>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrl: './detail-schedule.component.css'
})
export class DetailScheduleComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  scheduleService = inject(ScheduleService);
  schedule: Observable<Schedule | undefined>;

  constructor() {
    const idSchedule = Number(this.route.snapshot.params['id']);
    this.schedule = this.scheduleService.find(idSchedule);
    console.log(this.schedule)
  }

}
