import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AdministrationComponent} from "../../administration/administration.component";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {NgIf} from "@angular/common";
import {TicketService} from "../../../../services/ticket.service";

@Component({
  selector: 'app-create-ticket',
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
              <h1>Create Ticket</h1>
              <form [formGroup]="ticketForm" (ngSubmit)="createTicket()">
                  <div class="form-group">
                      <label for="nameTicket">Ticket:</label>
                      <input type="text" id="nameTicket" name="nameTicket" formControlName="nameTicket">
                      <div *ngIf="submitted && form['nameTicket'].errors?.['required']"
                           class="error-message">Ticket is required
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="duration">Price:</label>
                      <input type="number" id="price" name="price" formControlName="price" step="0.10" min="0">
                      <div *ngIf="submitted && form['price'].errors?.['required']"
                           class="error-message">Price is required
                      </div>
                  </div>
                  <button type="submit">Submit</button>
              </form>
          </div>
      </div>
  `,
  styleUrl: './create-ticket.component.css'
})
export class CreateTicketComponent {

  ticketService = inject(TicketService);
  ticketForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.ticketForm = this.formBuilder.group({
      nameTicket: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  get form() {
    return this.ticketForm.controls;
  }

  createTicket(): void {
    this.submitted = true;
    if (this.ticketForm.invalid) {
      return;
    }
    this.ticketService.create(this.ticketForm.value).subscribe(() => {
      this.router.navigate(['administration/ticket']);
    });
  }

}
