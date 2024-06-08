import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {DirectorService} from "../../../../services/director.service";
import {Director} from "../../../../models/Director";

@Component({
  selector: 'app-edit-director',
  standalone: true,
  imports: [AdministrationComponent, FormsModule, HeaderAdminComponent, NgIf, ReactiveFormsModule],
  template: `
    <div id="mainAdmin">
      <app-administration></app-administration>
      <div id="contTableAdmin">
        <app-header-admin></app-header-admin>
        <div id="container01">
          <h1>Update Director</h1>
        </div>
        <form [formGroup]="directorForm" (ngSubmit)="updateDirector()">
          <div class="form-group">
            <label for="nameDirector">Director:</label>
            <input type="text" id="nameDirector" name="nameDirector" formControlName="nameDirector">
            <div *ngIf="submitted && form['nameDirector'].errors?.['required']"
                 class="error-message"> Director is required
            </div>
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  `,
  styleUrl: './edit-director.component.css'
})
export class EditDirectorComponent {
  directorID: number | undefined;
  director!: Director;
  directorService = inject(DirectorService);
  directorForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.directorForm = this.formBuilder.group({
      idDirector: [''],
      nameDirector: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.directorID = +params['id'];
      this.getDirector(this.directorID);
    })
  }

  get form() {
    return this.directorForm.controls;
  }

  getDirector(id: number) {
    this.directorService.find(id).subscribe(director => {
      this.director = director;
      this.directorForm.patchValue(this.director);
    });
  }

  updateDirector() {
    this.submitted = true;
    if (this.directorForm.invalid) {
      return;
    }
    if (this.directorID) {
      this.directorService.update(this.directorID, this.directorForm.value).subscribe();
      this.router.navigate(['administration/director']);
    }
  }
}
