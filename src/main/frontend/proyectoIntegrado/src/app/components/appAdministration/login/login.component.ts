import {Component} from '@angular/core';
import {HeaderAdminComponent} from "../header-admin/header-admin.component";
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {LoginService} from "../../../services/auth/login.service";
import {LoginRequest} from "../../../services/auth/LoginRequest";
import {UserService} from "../../../services/user/user.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderAdminComponent, ReactiveFormsModule, NgIf, RouterLink],
  template: `
      <app-header-admin></app-header-admin>
      <div class="login">
          <form [formGroup]="form" (ngSubmit)="login()">
              <div class="divImgLogin">
                  <img src="./../../../../assets/userLogin.png" class="imgLogin">
              </div>
              <h1>Welcome</h1>

              <div class="divInput">
                  <div class="divIcono">
                      <i class="fas fa-user icon"></i>
                  </div>
                  <div class="divText">
                      <input formControlName="username" id="username" type="text" class="inputLogin form-control">
                  </div>
              </div>

              <div class="divInput">
                  <div class="divIcono">
                      <i class="fas fa-key icon"></i>
                  </div>
                  <div class="divText">
                      <input formControlName="password" id="password" type="password" class="inputLogin form-control">
                  </div>
              </div>

              <div class="divBoton">
                  <button type="submit" id="botonLogin" [disabled]="!form.valid">LOG IN</button>
              </div>

              <p>You don't have an account?<a class="link" href="/auth/register"> Sign in </a></p>
          </form>
      </div>

  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginError: String = "";

  constructor(
    public userService: UserService,
    public router: Router,
    public loginService: LoginService
  ) {
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
    console.log(this.form.value);
    this.loginService.login(this.form.value as LoginRequest).subscribe({
      next: (userData) => {
        console.log(userData);
      },
      error: (errorData) => {
        console.log(errorData);
        Swal.fire("Datos incorrectos", "Vuelva a intentarlo", "error")
        this.loginError = errorData;
      },
      complete: () => {
        console.info("Login completo");
        Swal.fire("Bienvenido!!", "holaaaaaa", "success")
        this.router.navigateByUrl('/').then();
      }

    });
  }
}
