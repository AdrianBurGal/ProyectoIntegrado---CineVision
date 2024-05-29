import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {DirectorService} from "../../../../services/director.service";

@Component({
  selector: 'app-create-director',
  standalone: true,
  imports: [
    AdministrationComponent,
    FormsModule,
    HeaderAdminComponent,
    NgIf,
    ReactiveFormsModule
  ],
  template: `
    <div id="mainAdmin">
      <app-administration/>
      <div id="contTableAdmin">
        <app-header-admin/>
        <h1>Create director</h1>
        <form [formGroup]="directorForm" (ngSubmit)="createDirector()">
          <div class="form-group">
            <label for="nameDirector">Director:</label>
            <input type="text" id="nameDirector" name="nameDirector" formControlName="nameDirector">
            <div *ngIf="submitted && form['nameDirector'].errors?.['required']"
                 class="error-message">Director is required
            </div>
          </div>
          <div class="form-group">
            <label for="photoUrl">Photo Url:</label>
            <input type="text" id="photoUrl" name="photoUrl" formControlName="photoUrl">
            <div *ngIf="submitted && form['photoUrl'].errors?.['required']"
                 class="error-message">Photo is required
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  `,
  styleUrl: './create-director.component.css'
})
export class CreateDirectorComponent {

  directorService = inject(DirectorService);
  directorForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.directorForm = this.formBuilder.group({
      nameDirector: ['', Validators.required],
      photoUrl: ['', Validators.required]
    });
  }

  get form() {
    return this.directorForm.controls;
  }

  createDirector(): void {
    this.submitted = true;
    if (this.directorForm.invalid) {
      return;
    }
    this.directorService.create(this.directorForm.value).subscribe(() => {
      this.router.navigate(['administration/director']);
    });
  }

}
