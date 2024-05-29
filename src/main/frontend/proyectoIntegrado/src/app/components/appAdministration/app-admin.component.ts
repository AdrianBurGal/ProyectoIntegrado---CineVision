import {Component} from '@angular/core';
import {AdministrationComponent} from "./administration/administration.component";
import {HeaderAdminComponent} from "./header-admin/header-admin.component";
import {RouterOutlet} from "@angular/router";
import {ListFilmComponent} from "./film/list-film/list-film.component";
import {DetailFilmComponent} from "./film/detail-film/detail-film.component";
import {CreateFilmComponent} from "./film/create-film/create-film.component";

@Component({
  selector: 'app-app-admin',
  standalone: true,
  imports: [RouterOutlet, AdministrationComponent, HeaderAdminComponent],
  template: `
      <div id="mainAdmin">
          <app-administration/>
          <div id="tableAdmin">
              <app-header-admin/>

          </div>
      </div>`,
  styleUrl: './app-admin.component.css'
})
export class AppAdminComponent {

}
