import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {TicketService} from "../../../../services/ticket.service";
import {Ticket} from "../../../../models/Ticket";

@Component({
  selector: 'app-edit-ticket',
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
          <app-administration></app-administration>
          <div id="contTableAdmin">
              <app-header-admin></app-header-admin>
              <div id="container01">
                  <h1>Update Ticket</h1>
              </div>
              <form [formGroup]="ticketForm" (ngSubmit)="updateTicket()">
                  <div class="form-group">
                      <label for="nameTicket">Ticket:</label>
                      <input type="text" id="nameTicket" name="nameTicket" formControlName="nameTicket">
                      <div *ngIf="submitted && form['nameTicket'].errors?.['required']"
                           class="error-message"> Ticket is required
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="price">Price:</label>
                      <input type="number" id="price" name="price" formControlName="price" step="0.10" min="0">
                      <div *ngIf="submitted && form['price'].errors?.['required']"
                           class="error-message">Price is required
                      </div>
                  </div>
                  <button type="submit">Update</button>
              </form>
          </div>
      </div>
  `,
  styleUrl: './edit-ticket.component.css'
})
export class EditTicketComponent {

  ticketID: number | undefined;
  ticket!: Ticket;
  ticketService = inject(TicketService);
  ticketForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.ticketForm = this.formBuilder.group({
      idTicket: [''],
      nameTicket: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ticketID = +params['id'];
      this.getTicket(this.ticketID);
    })
  }

  get form() {
    return this.ticketForm.controls;
  }

  getTicket(id: number) {
    this.ticketService.find(id).subscribe(ticket => {
      this.ticket = ticket;
      this.ticketForm.patchValue(this.ticket);
    });
  }

  updateTicket() {
    this.submitted = true;
    if (this.ticketForm.invalid) {
      return;
    }
    if (this.ticketID) {
      this.ticketService.update(this.ticketID, this.ticketForm.value).subscribe();
      this.router.navigate(['administration/ticket']);
    }
  }

}
