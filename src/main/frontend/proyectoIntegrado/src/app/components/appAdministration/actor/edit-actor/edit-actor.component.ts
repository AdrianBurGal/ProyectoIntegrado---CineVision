import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Actor} from "../../../../models/Actor";
import {ActorService} from "../../../../services/actor.service";

@Component({
  selector: 'app-edit-actor',
  standalone: true,
  imports: [AdministrationComponent, HeaderAdminComponent, AsyncPipe,
    NgIf, RouterLink, FormsModule, ReactiveFormsModule],
  template: `
    <div id="mainAdmin">
      <app-administration></app-administration>
      <div id="contTableAdmin">
        <app-header-admin></app-header-admin>
        <div id="container01">
          <h1>Update Actor</h1>
        </div>
        <form [formGroup]="actorForm" (ngSubmit)="updateActor()">
          <div class="form-group">
            <label for="nameActor">Actor:</label>
            <input type="text" id="nameActor" name="nameActor" formControlName="nameActor">
            <div *ngIf="submitted && form['nameActor'].errors?.['required']"
                 class="error-message"> Actor is required
            </div>
          </div>
          <div class="form-group">
            <label for="photoUrl">URL of photo:</label>
            <input type="url" id="photoUrl" name="photoUrl" formControlName="photoUrl">
            <div *ngIf="submitted && form['photoUrl'].errors?.['required']"
                 class="error-message">Photo URL is required
            </div>
            <div *ngIf="submitted && form['photoUrl'].errors?.['pattern']"
                 class="error-message">Invalid URL format
            </div>
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  `,
  styleUrl: './edit-actor.component.css'
})
export class EditActorComponent {
  actorID: number | undefined;
  actor!: Actor;
  actorService = inject(ActorService);
  actorForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.actorForm = this.formBuilder.group({
      idActor: [''],
      nameActor: ['', Validators.required],
      photoUrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.actorID = +params['id'];
      this.getActor(this.actorID);
    })
  }

  get form() {
    return this.actorForm.controls;
  }

  getActor(id: number) {
    this.actorService.find(id).subscribe(actor => {
      this.actor = actor;
      this.actorForm.patchValue(this.actor);
    });
  }

  updateActor() {
    this.submitted = true;
    if (this.actorForm.invalid) {
      return;
    }
    if (this.actorID) {
      this.actorService.update(this.actorID, this.actorForm.value).subscribe();
      this.router.navigate(['administration/actor']);
    }
  }
}
