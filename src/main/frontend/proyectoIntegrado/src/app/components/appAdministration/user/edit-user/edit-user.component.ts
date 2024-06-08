import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/User";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [AdministrationComponent, FormsModule, HeaderAdminComponent, NgIf, ReactiveFormsModule],
  template: `
      <div id="mainAdmin">
          <app-administration></app-administration>
          <div id="contTableAdmin">
              <app-header-admin></app-header-admin>
              <div id="container01">
                  <h1>Update User</h1>
              </div>
              <form [formGroup]="userForm" (ngSubmit)="updateUser()">
                  <div class="form-group">
                      <label for="username">Username:</label>
                      <input type="text" id="username" name="username" formControlName="username">
                      <div *ngIf="submitted && form['username'].errors?.['required']"
                           class="error-message"> Username is required
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
                           class="error-message">Firstname is required
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
                          <option value="ADMIN_USER">Admin user</option>
                          <option value="NORMAL_USER">Normal user</option>
                      </select>
                      <div *ngIf="submitted && form['rol'].errors?.['required']"
                           class="error-message">Rol is required
                      </div>
                  </div>
                  <button type="submit">Update</button>
              </form>
          </div>
      </div>
  `,
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

  userID: number | undefined;
  user!: User;
  userService = inject(UserService);
  userForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      country: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userID = +params['id'];
      this.getUser(this.userID);
    })
  }

  get form() {
    return this.userForm.controls;
  }

  getUser(id: number) {
    this.userService.find(id).subscribe(user => {
      this.user = user;
      this.userForm.patchValue(this.user);
    });
  }

  updateUser() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    if (this.userID) {
      this.userService.update(this.userID, this.userForm.value).subscribe();
      this.router.navigate(['administration/user']);
    }
  }

}
