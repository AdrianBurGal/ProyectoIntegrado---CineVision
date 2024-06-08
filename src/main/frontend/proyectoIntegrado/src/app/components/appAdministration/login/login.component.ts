import {Component} from '@angular/core';
import {HeaderAdminComponent} from "../header-admin/header-admin.component";
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {LoginService} from "../../../services/login.service";
import {LoginRequest} from "../../../models/LoginRequest";
import Swal from 'sweetalert2';
import {User} from "../../../models/User";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderAdminComponent, ReactiveFormsModule, NgIf, RouterLink],
  template: `
    <app-header-admin></app-header-admin>
    <div class="body">
      <div class="login">
        <form [formGroup]="form" (ngSubmit)="login()">
          <div class="divImgLogin">
            <img src="./../../../../assets/userLogin.png" class="imgLogin">
          </div>
          <h1>Welcome</h1>

          <div class="divInput">
            <div class="divIcono">
              <i class="fa-solid fa-envelope"></i>
            </div>
            <div class="divText">
              <input formControlName="username" id="username" type="text" class="inputLogin form-control"
                     placeholder="Username">
            </div>
          </div>

          <div class="divInput">
            <div class="divIcono">
              <i class="fas fa-key icon"></i>
            </div>
            <div class="divText">
              <input formControlName="password" id="password" type="password"
                     class="inputLogin form-control"
                     placeholder="Password">
            </div>
          </div>

          <div class="divBoton">
            <button type="submit" id="botonLogin" [disabled]="!form.valid">LOG IN</button>
          </div>

          <p>You don't have an account?<a class="link" href="/administration/user/auth/signUp"> Sign in </a></p>
        </form>
      </div>
    </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginError: String = "";
  user?: User;

  constructor(public router: Router, public loginService: LoginService) {
  }

  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({

    username: new FormControl('', [Validators.required,]),
    password: new FormControl('', [Validators.required,]),

  });

  get f() {
    return this.form.controls;
  }

  login() {
    this.loginService.login(this.form.value as LoginRequest).subscribe({
      next: (userData) => {
        console.log("Datos User" + userData);
      },
      error: (errorData) => {
        Swal.fire("Incorrect data", "Try again", "error")
        this.loginError = errorData;
      },
      complete: () => {
        Swal.fire("Welcome!!", "Enjoy our movies", "success")

        this.user = this.loginService.currentUserValue;
        if (this.user && this.user.rol === 'ADMIN_USER') {
          this.router.navigateByUrl('/administration/films').then();
        } else {
          history.back();
        }
      }
    });
  }
}
