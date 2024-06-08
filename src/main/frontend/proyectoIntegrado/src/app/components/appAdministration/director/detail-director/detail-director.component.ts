import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {DirectorService} from "../../../../services/director.service";
import {Director} from "../../../../models/Director";

@Component({
  selector: 'app-detail-director',
  standalone: true,
  imports: [AdministrationComponent, AsyncPipe, HeaderAdminComponent, NgIf],
  template: `
    <div id="mainAdmin">
      <app-administration/>
      <div id="contTableAdmin">
        <app-header-admin/>
        <h1>Details Director</h1>
        <form *ngIf="director | async as director">
          <div class="form-group">
            <label for="idDirector">ID:</label>
            <input type="text" id="idDirector" name="idDirector" value="{{director.idDirector}}" readonly>
          </div>
          <div class="form-group">
            <label for="nameDirector">Director:</label>
            <input type="text" id="nameDirector" name="nameDirector" value="{{director.nameDirector}}" readonly>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrl: './detail-director.component.css'
})
export class DetailDirectorComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  directorService = inject(DirectorService);
  director: Observable<Director | undefined>;

  constructor() {
    const idDirector = Number(this.route.snapshot.params['id']);
    this.director = this.directorService.find(idDirector);
    console.log(this.director)
  }

}
