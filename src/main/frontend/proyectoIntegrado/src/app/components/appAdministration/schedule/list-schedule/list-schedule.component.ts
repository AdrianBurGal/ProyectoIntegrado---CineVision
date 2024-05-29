import {Component, inject, OnInit} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ScheduleService} from "../../../../services/schedule.service";
import {Schedule} from "../../../../models/Schedule";

@Component({
  selector: 'app-list-schedule',
  standalone: true,
  imports: [AdministrationComponent, HeaderAdminComponent, NgForOf, NgIf, RouterLink],
  template: `
    <div id="mainAdmin">
      <app-administration/>
      <div id="contTableAdmin">
        <app-header-admin/>
        <div id="container01">
          <h1>Schedules</h1>
          <button class="create-button" [routerLink]="['/administration/schedule/newSchedule']"><i
            class="fa-solid fa-plus"></i></button>
        </div>
        <table class="custom-table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Schedule</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody id="tbody">
          <!-- Aquí irían los datos de la tabla -->
          <tr *ngFor="let schedule of scheduleFilter ">
            <td>{{ schedule.idSchedule }}</td>
            <td>{{ schedule.time }}</td>
            <td>
              <button class="show-button"
                      [routerLink]="['/administration/schedule/' + schedule.idSchedule]">
                <i class="fa-solid fa-eye"></i></button>
              <button class="edit-button"
                      [routerLink]="['/administration/schedule/replaceSchedule/' + schedule.idSchedule]">
                <i class="fa-solid fa-pen-to-square"></i></button>
              <button class="delete-button" (click)="deleteSchedule(schedule.idSchedule)">
                <i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
          </tbody>
        </table>
        <div *ngIf="scheduleFilter.length === 0" class="alert">
          There are no schedules with this search criteria.
        </div>
      </div>
    </div>
  `,
  styleUrl: './list-schedule.component.css'
})
export class ListScheduleComponent implements OnInit {

  schedules: Schedule[] = [];
  scheduleService = inject(ScheduleService);
  scheduleFilter: Schedule[] = [];
  filter: string = '';

  ngOnInit(): void {
    console.log(this.scheduleService.getAll())
    this.scheduleService.getAll().subscribe((data: Schedule[]) => {
      this.schedules = data;
      this.scheduleFilter = this.schedules;
      console.log(this.schedules);
    })
  }

  deleteSchedule(id: any) {
    this.scheduleService.delete(id).subscribe(res => {
      this.scheduleFilter = this.schedules.filter(schedule => schedule.idSchedule !== id);
      console.log('Schedule id =' + id + ' delete satisfactory!');
    })
  }

  filterScheduleByName(): void {
    console.log(this.filter)
    if (this.filter === '') {
      this.scheduleFilter = this.schedules;
    } else {
      this.scheduleFilter = this.schedules.filter(schedule => {
        return schedule.time.toLowerCase().includes(this.filter.toLowerCase());
      });
    }
  }

}
