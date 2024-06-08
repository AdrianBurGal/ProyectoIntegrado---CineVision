import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HeaderAdminComponent} from "../header-admin/header-admin.component";
import {Router} from "@angular/router";
import {LoginService} from "../../../services/login.service";
import Swal from "sweetalert2";
import {RegisterRequest} from "../../../models/RegisterRequest";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, HeaderAdminComponent, ReactiveFormsModule, NgIf],
  template: `
    <app-header-admin></app-header-admin>
    <div class="login">
      <form [formGroup]="registerForm" (ngSubmit)="submit()">
        <div class="divImgLogin">
          <img src="./../../../../assets/userLogin.png" class="imgLogin">
        </div>
        <h1>Register</h1>

        <div class="divInput">
          <div class="divIcono">
            <i class="fa-solid fa-envelope"></i>
          </div>
          <div class="divText">
            <input formControlName="username" id="username" type="text" class="inputLogin form-control"
                   placeholder="Username">
          </div>
          <div *ngIf="submitted && form['username'].errors?.['required']"
               class="error-message">Username is required
          </div>
          <div *ngIf="submitted && form['username'].errors?.['email']"
               class="error-message">Invalid email format
          </div>
        </div>

        <div class="nameFields">
          <div class="divInput">
            <div class="divIcono">
              <i class="fas fa-user icon"></i>
            </div>
            <div class="divText">
              <input formControlName="firstname" id="firstname" type="text" class="inputLogin form-control"
                     placeholder="First Name">
            </div>
            <div *ngIf="submitted && form['firstname'].errors?.['required']"
                 class="error-message">First Name is required
            </div>
          </div>

          <div class="divInput">
            <div class="divIcono">
              <i class="fas fa-user icon"></i>
            </div>
            <div class="divText">
              <input formControlName="lastname" id="lastname" type="text" class="inputLogin form-control"
                     placeholder="Last Name">
            </div>
            <div *ngIf="submitted && form['lastname'].errors?.['required']"
                 class="error-message">Last Name is required
            </div>
          </div>
        </div>

        <div class="divInput">
          <div class="divIcono">
            <i class="fa-solid fa-earth-europe"></i>
          </div>
          <div class="divText">
            <select formControlName="country" id="country" class="inputLogin form-control">
              <option value="" disabled selected>Select Country</option>
              <option value="Spain">Spain</option>
              <option value="USA">USA</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
              <option value="Italy">Italy</option>
            </select>
          </div>
          <div *ngIf="submitted && form['country'].errors?.['required']"
               class="error-message">Country is required
          </div>
        </div>

        <div class="divInput">
          <div class="divIcono">
            <i class="fas fa-key icon"></i>
          </div>
          <div class="divText">
            <input formControlName="password" id="password" type="password" class="inputLogin form-control"
                   placeholder="Password">
          </div>
          <div *ngIf="submitted && form['password'].errors?.['required']"
               class="error-message">Password is required
          </div>
          <div *ngIf="submitted && form['password'].errors?.['minlength']"
               class="error-message">Password must be at least 6 characters long
          </div>
        </div>

        <div class="divBoton">
          <button type="submit" id="botonRegister">REGISTER</button>
        </div>

        <p>Already have an account?<a class="link" href="/administration/user/auth/login"> Log in </a></p>
      </form>
    </div>

  `,
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  loginError = '';
  registerForm: FormGroup;
  submitted = false;
  loginService = inject(LoginService);

  ngOnInit(): void {
  }

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.email]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  get form() {
    return this.registerForm.controls;
  }

  submit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loginService.register(this.registerForm.value as RegisterRequest).subscribe({
      next: (userData) => {
        console.log(userData);
      },
      error: (errorData) => {
        Swal.fire("Incorrect data", "Try again", "error")
        this.loginError = errorData;
      },
      complete: () => {
        Swal.fire("User created", "Now you can log in", "success")
        this.router.navigateByUrl('/').then();
      }
    });
  }

}
