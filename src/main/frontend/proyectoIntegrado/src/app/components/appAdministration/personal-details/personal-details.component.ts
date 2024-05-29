import {Component} from '@angular/core';
import {User} from "../../../services/auth/User";
import {UserService} from "../../../services/user/user.service";
import {environment} from "../../../enviroments/enviroment";
import {NgIf} from "@angular/common";
import {FormBuilder, Validators} from "@angular/forms";
import {LoginService} from "../../../services/auth/login.service";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [NgIf],
  template: `
    <p *ngIf="errorMessage.length != 0" class="text-danger">{{errorMessage}}</p>
    <div>
      <p><b> Name: </b> {{user?.firstname}}</p>
      <p><b> LastName: </b> {{user?.lastname}}</p>
      <p><b> Country: </b> {{user?.country}}</p>
    </div>
  `,
  styleUrl: './personal-details.component.css'
})
export class PersonalDetailsComponent {
  errorMessage = "";
  user?: User;
  userLoginOn: boolean = false;
  editMode: boolean = false;

  registerForm = this.formBuilder.group({
    id: [''],
    lastname: ['', Validators.required],
    firstname: ['', Validators.required],
    country: ['', Validators.required]
  })

  constructor(private userService: UserService, private formBuilder: FormBuilder, private loginService: LoginService) {
    this.userService.getUser(environment.userId).subscribe({
      next: (userData) => {
        this.user = userData;
      },
      error: (errorData) => {
        this.errorMessage = errorData
      },
      complete: () => {
        console.info("User Data ok");
      }
    })

    this.loginService.userLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
  }

  get firstname() {
    return this.registerForm.controls.firstname;
  }

  get lastname() {
    return this.registerForm.controls.lastname;
  }

  get country() {
    return this.registerForm.controls.country;
  }

  savePersonalDetailsData() {
    if (this.registerForm.valid) {
      this.userService.updateUser(this.registerForm.value as unknown as User).subscribe({
        next: () => {
          this.editMode = false;
          this.user = this.registerForm.value as unknown as User;
        },
        error: (errorData) => console.log(errorData)
      })
    }
  }
}

