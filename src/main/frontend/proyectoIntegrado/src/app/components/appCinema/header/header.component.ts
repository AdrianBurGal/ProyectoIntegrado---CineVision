import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {LoginService} from "../../../services/auth/login.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  template: `
      <header>
          <div id="logo">
              <a href="/"><i class="fa-solid fa-jedi"></i><span>CINEVISION</span></a>
          </div>

          <nav *ngIf="!userLoginOn">
              <ul>
                  <li><a href="/administration/films">Administration</a></li>
              </ul>
          </nav>

          <div id="items">
              <button id="register" routerLink="auth/register"><i class="fa-solid fa-user-pen"></i>Sign in</button>
              <div *ngIf="!userLoginOn">
                  <button id="login" routerLink="auth/login"><i class="fas fa-sign-in-alt"></i>Login</button>
              </div>
              <div *ngIf="userLoginOn">
                  <button (click)="logout()"><i class="fa-solid fa-right-from-bracket"></i>Logout</button>
              </div>
              <i class="fa-solid fa-ticket" id="shopTickets"></i>
              <span id="total">0</span>
          </div>
      </header>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  userLoginOn: boolean = false;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
  }

  getUser() {

  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/'])
  }

}
