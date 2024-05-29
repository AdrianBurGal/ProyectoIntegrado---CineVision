import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ActorService} from "../../../../services/actor.service";

@Component({
  selector: 'app-create-actor',
  standalone: true,
  imports: [AdministrationComponent, HeaderAdminComponent, NgForOf, NgIf, ReactiveFormsModule],
  template: `
      <div id="mainAdmin">
          <app-administration/>
          <div id="contTableAdmin">
              <app-header-admin/>
              <h1>Create actor</h1>
              <form [formGroup]="actorForm" (ngSubmit)="createActor()">
                  <div class="form-group">
                      <label for="nameActor">Actor:</label>
                      <input type="text" id="nameActor" name="nameActor" formControlName="nameActor">
                      <div *ngIf="submitted && form['nameActor'].errors?.['required']"
                           class="error-message">Actor is required
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
  styleUrl: './create-actor.component.css'
})
export class CreateActorComponent {

  actorService = inject(ActorService);
  actorForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.actorForm = this.formBuilder.group({
      nameActor: ['', Validators.required],
      photoUrl: ['', Validators.required]
    });
  }

  get form() {
    return this.actorForm.controls;
  }

  createActor(): void {
    this.submitted = true;
    if (this.actorForm.invalid) {
      return;
    }
    this.actorService.create(this.actorForm.value).subscribe(() => {
      this.router.navigate(['administration/actor']);
    });
  }


}
