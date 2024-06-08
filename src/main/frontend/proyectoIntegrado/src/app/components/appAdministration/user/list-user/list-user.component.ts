import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/User";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [AdministrationComponent, DatePipe, HeaderAdminComponent, NgForOf, NgIf, RouterLink],
  template: `
      <div id="mainAdmin">
          <app-administration/>
          <div id="contTableAdmin">
              <app-header-admin/>
              <div id="container01">
                  <h1>Users</h1>
                  <button class="create-button" [routerLink]="['/administration/user/newUser']"><i
                          class="fa-solid fa-plus"></i></button>
              </div>
              <table class="custom-table">
                  <thead>
                  <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th>Firstname</th>
                      <th>Lastname</th>
                      <th>Country</th>
                      <th>Rol</th>
                      <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody id="tbody">
                  <!-- Aquí irían los datos de la tabla -->
                  <tr *ngFor="let user of userFilter ">
                      <td>{{ user.idUser }}</td>
                      <td>{{ user.username }}</td>
                      <td>{{ user.password?.substring(0, 10) }}</td>
                      <td>{{ user.firstname }}</td>
                      <td>{{ user.lastname }}</td>
                      <td>{{ user.country }}</td>
                      <td>{{ user.rol }}</td>
                      <td>
                          <button class="show-button"
                                  [routerLink]="['/administration/user/' + user.idUser]">
                              <i class="fa-solid fa-eye"></i></button>
                          <button class="edit-button"
                                  [routerLink]="['/administration/user/replaceUser/' + user.idUser]">
                              <i class="fa-solid fa-pen-to-square"></i></button>
                          <button class="delete-button" (click)="deleteUser(user.idUser)">
                              <i class="fa-solid fa-trash"></i></button>
                      </td>
                  </tr>
                  </tbody>
              </table>
              <div *ngIf="userFilter.length === 0" class="alert">
                  There are no users with this search criteria.
              </div>
          </div>
      </div>
  `,
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {

  users: User[] = [];
  userService = inject(UserService);
  userFilter: User[] = [];
  filter: string = '';

  ngOnInit(): void {
    this.userService.getAll().subscribe((data: User[]) => {
      this.users = data;
      this.userFilter = this.users;
      console.log(this.users);
    })
  }

  deleteUser(id: any) {
    console.log('ID ' + id)
    this.userService.delete(id).subscribe(res => {
      this.userFilter = this.users.filter(user => user.idUser !== id);
      console.log('User id =' + id + ' delete satisfactory!');
    })
  }

  filterUsersByName(): void {
    console.log(this.filter)
    if (this.filter === '') {
      this.userFilter = this.users;
    } else {
      this.userFilter = this.users.filter(user => {
        return user.username.toLowerCase().includes(this.filter.toLowerCase());
      });
    }
  }

}
