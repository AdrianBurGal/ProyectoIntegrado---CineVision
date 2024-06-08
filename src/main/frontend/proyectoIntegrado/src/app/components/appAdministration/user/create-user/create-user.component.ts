import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AdministrationComponent} from "../../administration/administration.component";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {NgForOf, NgIf} from "@angular/common";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    AdministrationComponent,
    FormsModule,
    HeaderAdminComponent,
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  template: `
      <div id="mainAdmin">
          <app-administration/>
          <div id="contTableAdmin">
              <app-header-admin/>
              <h1>Create User</h1>
              <form [formGroup]="userForm" (ngSubmit)="createUser()">
                  <div class="form-group">
                      <label for="username">Username:</label>
                      <input type="text" id="username" name="username" formControlName="username">
                      <div *ngIf="submitted && form['username'].errors?.['required']"
                           class="error-message">Username is required
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="password">Password:</label>
                      <input type="text" id="password" name="password" formControlName="password">
                      <div *ngIf="submitted && form['password'].errors?.['required']"
                           class="error-message">Password is required
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="firstname">Firstname:</label>
                      <input type="text" id="firstname" name="firstname" formControlName="firstname">
                      <div *ngIf="submitted && form['firstname'].errors?.['required']"
                           class="error-message">Firstname date is required
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="lastname">Lastname:</label>
                      <input type="text" id="lastname" name="lastname" formControlName="lastname">
                      <div *ngIf="submitted && form['lastname'].errors?.['required']"
                           class="error-message">Lastname is required
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="country">Country:</label>
                      <select id="country" name="country" formControlName="country" class="form-control">
                          <option value="" disabled selected>Select a country</option>
                          <option value="Spain">Spain</option>
                          <option value="USA">USA</option>
                          <option value="France">France</option>
                          <option value="Germany">Germany</option>
                          <option value="Italy">Italy</option>
                      </select>
                      <div *ngIf="submitted && form['country'].errors?.['required']"
                           class="error-message">Country is required
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="rol">Rol:</label>
                      <select id="rol" name="rol" formControlName="rol" class="form-control">
                          <option value="" disabled selected>Select a rol</option>
                          <option value="ADMIN_USER">Admin user</option>
                          <option value="NORMAL_USER">Normal user</option>
                      </select>
                      <div *ngIf="submitted && form['rol'].errors?.['required']"
                           class="error-message">Rol is required
                      </div>
                  </div>
                  <button type="submit">Submit</button>
              </form>
          </div>
      </div>
  `,
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

  userService = inject(UserService);
  userForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      country: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  get form() {
    return this.userForm.controls;
  }

  createUser(): void {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    console.log('BIEN: ' + JSON.stringify(this.userForm.value));
    this.userService.create(this.userForm.value).subscribe(() => {
      this.router.navigate(['administration/user']);
    });
  }

}
