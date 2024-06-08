import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {ActorService} from "../../../../services/actor.service";
import {Actor} from "../../../../models/Actor";

@Component({
  selector: 'app-detail-actor',
  standalone: true,
  imports: [AdministrationComponent, AsyncPipe, HeaderAdminComponent, NgIf],
  template: `
      <div id="mainAdmin">
          <app-administration/>
          <div id="contTableAdmin">
              <app-header-admin/>
              <h1>Details actor</h1>
              <form *ngIf="actor | async as actor">
                  <div class="form-group">
                      <label for="idActor">ID:</label>
                      <input type="text" id="idActor" name="idActor" value="{{actor.idActor}}" readonly>
                  </div>
                  <div class="form-group">
                      <label for="nameActor">Actor:</label>
                      <input type="text" id="nameActor" name="nameActor" value="{{actor.nameActor}}" readonly>
                  </div>
              </form>
          </div>
      </div>
  `,
  styleUrl: './detail-actor.component.css'
})
export class DetailActorComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  actorService = inject(ActorService);
  actor: Observable<Actor | undefined>;

  constructor() {
    const idActor = Number(this.route.snapshot.params['id']);
    this.actor = this.actorService.find(idActor);
    console.log(this.actor)
  }

}
