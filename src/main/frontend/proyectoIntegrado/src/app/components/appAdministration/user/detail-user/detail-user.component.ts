import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/User";

@Component({
  selector: 'app-detail-user',
  standalone: true,
  imports: [
    AdministrationComponent,
    AsyncPipe,
    DatePipe,
    HeaderAdminComponent,
    NgIf
  ],
  template: `
      <div id="mainAdmin">
          <app-administration/>
          <div id="contTableAdmin">
              <app-header-admin/>
              <h1>Details User</h1>
              <form *ngIf="user | async as user">
                  <div class="form-group">
                      <label for="idUser">ID:</label>
                      <input type="text" id="idUser" name="idUser" value="{{user.idUser}}" readonly>
                  </div>
                  <div class="form-group">
                      <label for="username">Username:</label>
                      <input type="text" id="username" name="username" value="{{user.username}}" readonly>
                  </div>
                  <div class="form-group">
                      <label for="password">Password:</label>
                      <input type="text" id="password" name="password" value="{{user.password}}" readonly>
                  </div>
                  <div class="form-group">
                      <label for="firstname">Firstname:</label>
                      <input type="text" id="firstname" name="firstname" value="{{user.firstname}}" readonly>
                  </div>
                  <div class="form-group">
                      <label for="lastname">Lastname:</label>
                      <input type="text" id="lastname" name="lastname" value="{{user.lastname}}" readonly>
                  </div>
                  <div class="form-group">
                      <label for="country">Country:</label>
                      <input type="text" id="country" name="country" value="{{user.country}}" readonly>
                  </div>
                  <div class="form-group">
                      <label for="rol">Rol:</label>
                      <input type="text" id="rol" name="rol" value="{{user.rol}}" readonly>
                  </div>
              </form>
          </div>
      </div>
  `,
  styleUrl: './detail-user.component.css'
})
export class DetailUserComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  user: Observable<User | undefined>;

  constructor() {
    const idUser = Number(this.route.snapshot.params['id']);
    this.user = this.userService.find(idUser);
    console.log(this.user)
  }

}
