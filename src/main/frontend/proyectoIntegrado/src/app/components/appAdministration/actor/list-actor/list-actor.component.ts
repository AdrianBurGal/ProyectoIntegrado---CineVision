import {Component, inject, OnInit} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Actor} from "../../../../models/Actor";
import {ActorService} from "../../../../services/actor.service";

@Component({
  selector: 'app-list-actor',
  standalone: true,
  imports: [AdministrationComponent, HeaderAdminComponent, NgForOf, RouterLink, NgIf],
  template: `
      <div id="mainAdmin">
          <app-administration/>
          <div id="contTableAdmin">
              <app-header-admin/>
              <div id="container01">
                  <h1>Actors</h1>
                  <button class="create-button" [routerLink]="['/administration/actor/newActor']"><i
                          class="fa-solid fa-plus"></i></button>
              </div>
              <table class="custom-table">
                  <thead>
                  <tr>
                      <th>ID</th>
                      <th>Actor</th>
                      <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody id="tbody">
                  <!-- Aquí irían los datos de la tabla -->
                  <tr *ngFor="let actor of actorFilter ">
                      <td>{{ actor.idActor }}</td>
                      <td>{{ actor.nameActor }}</td>
                      <td>
                          <button class="show-button"
                                  [routerLink]="['/administration/actor/' + actor.idActor]">
                              <i class="fa-solid fa-eye"></i></button>
                          <button class="edit-button"
                                  [routerLink]="['/administration/actor/replaceActor/' + actor.idActor]">
                              <i class="fa-solid fa-pen-to-square"></i></button>
                          <button class="delete-button" (click)="deleteActor(actor.idActor)">
                              <i class="fa-solid fa-trash"></i></button>
                      </td>
                  </tr>
                  </tbody>
              </table>
              <div *ngIf="actorFilter.length === 0" class="alert">
                  There are no actors with this search criteria.
              </div>
          </div>
      </div>
  `,
  styleUrl: './list-actor.component.css'
})
export class ListActorComponent implements OnInit {

  actors: Actor[] = [];
  actorService = inject(ActorService);
  actorFilter: Actor[] = [];
  filter: string = '';

  ngOnInit(): void {
    this.actorService.getAll().subscribe((data: Actor[]) => {
      this.actors = data;
      this.actorFilter = this.actors;
      console.log(this.actors);
    })
  }

  deleteActor(id: any) {
    this.actorService.delete(id).subscribe(res => {
      this.actorFilter = this.actors.filter(actor => actor.idActor !== id);
      console.log('Actor id = ' + id + ' delete satisfactory!');
    })
  }

  filterActorByName(): void {
    console.log(this.filter)
    if (this.filter === '') {
      this.actorFilter = this.actors;
    } else {
      this.actorFilter = this.actors.filter(actor => {
        return actor.nameActor.toLowerCase().includes(this.filter.toLowerCase());
      });
    }
  }

}
