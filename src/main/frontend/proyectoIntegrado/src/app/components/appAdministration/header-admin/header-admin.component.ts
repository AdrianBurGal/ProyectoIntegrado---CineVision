import {Component, inject, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {LoginService} from "../../../services/login.service";
import {User} from "../../../models/User";

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [NgIf],
  template: `
      <header>
          <div id="infoUser" *ngIf="userLoginOn">
              <img src="../../../../../assets/userAdmin.webp" alt="photoUser">
              <div *ngIf="userLoginOn" id="nameUser">
                  <h6>Administrator</h6>
                  <p>{{ user?.firstname + " " + user?.lastname }}</p>
              </div>
              <i class="fa-regular fa-bell"></i>
          </div>
      </header>
  `,
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent implements OnInit {

  loginService = inject(LoginService);
  user?: User;
  userLoginOn: boolean = false;

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
        this.user = this.getUser();
      }
    })
  }

  getUser() {
    return this.loginService.currentUserValue;
  }
}
