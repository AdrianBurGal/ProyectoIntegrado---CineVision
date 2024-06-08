import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {LoginService} from "../../../services/login.service";
import {NgIf} from "@angular/common";
import {User} from "../../../models/User";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  template: `
      <header>
          <div id="logo">
              <a href="/"><i class="fa-solid fa-jedi"></i><span>CINEVISION</span></a>
          </div>

          <div id="items">
              <div *ngIf="!userLoginOn">
                  <button id="register" routerLink="administration/user/auth/signUp">
                      <i class="fa-solid fa-user-pen"></i>Sign in
                  </button>
              </div>
              <div *ngIf="!userLoginOn">
                  <button id="login" (click)="login()">
                      <i class="fas fa-sign-in-alt"></i>Login
                  </button>
              </div>
              <div *ngIf="userLoginOn">
                  <button (click)="logout()">
                      <i class="fa-solid fa-right-from-bracket"></i>Logout
                  </button>
              </div>
              <div class="user-container" *ngIf="userLoginOn && this.user?.rol?.toString() === 'NORMAL_USER'">
                  <img src="../../../../../assets/userNormal.webp" alt="photoUser" class="userPhoto">
                  <div class="user-info-dropdown">
                      <h4><b>{{ this.user?.firstname + " " + this.user?.lastname }} </b></h4>
                      <p> {{ this.user?.username }} </p>
                  </div>
              </div>
              <div class="user-container" *ngIf="userLoginOn && this.user?.rol?.toString() === 'ADMIN_USER'">
                  <img src="../../../../../assets/userAdmin.webp" alt="photoUser" class="userPhoto">
                  <div class="user-info-dropdown">
                      <h4><b>{{ this.user?.firstname + " " + this.user?.lastname }} </b></h4>
                      <p> {{ this.user?.username }} </p>
                      <a href="/administration/films">Administration </a>
                  </div>
              </div>
          </div>
      </header>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  user: User | undefined;
  userLoginOn: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
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

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }

  login() {
    this.router.navigate(['administration/user/auth/login']);
  }
}
