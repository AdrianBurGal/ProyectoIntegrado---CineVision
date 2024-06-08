import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {GenreService} from "../../../../services/genreService";

@Component({
  selector: 'app-create-genre',
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
        <h1>Create Genre</h1>
        <form [formGroup]="genreForm" (ngSubmit)="createGenre()">
          <div class="form-group">
            <label for="nameGenre">Genre:</label>
            <input type="text" id="nameGenre" name="nameGenre" formControlName="nameGenre">
            <div *ngIf="submitted && form['nameGenre'].errors?.['required']"
                 class="error-message">Genre is required
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  `,
  styleUrl: './create-genre.component.css'
})
export class CreateGenreComponent {

  genreService = inject(GenreService);
  genreForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.genreForm = this.formBuilder.group({
      nameGenre: ['', Validators.required],
    });
  }

  get form() {
    return this.genreForm.controls;
  }

  createGenre(): void {
    this.submitted = true;
    if (this.genreForm.invalid) {
      return;
    }
    this.genreService.create(this.genreForm.value).subscribe(() => {
      this.router.navigate(['administration/genre']);
    });
  }

}
