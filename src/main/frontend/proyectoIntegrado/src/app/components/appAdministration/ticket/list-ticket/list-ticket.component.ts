import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {RouterLink} from "@angular/router";
import {TicketService} from "../../../../services/ticket.service";
import {Ticket} from "../../../../models/Ticket";

@Component({
  selector: 'app-list-ticket',
  standalone: true,
  imports: [AdministrationComponent, DatePipe, HeaderAdminComponent, NgForOf, NgIf, RouterLink],
  template: `
    <div id="mainAdmin">
      <app-administration/>
      <div id="contTableAdmin">
        <app-header-admin/>
        <div id="container01">
          <h1>Tickets</h1>
          <button class="create-button" [routerLink]="['/administration/ticket/newTicket']"><i
            class="fa-solid fa-plus"></i></button>
        </div>
        <table class="custom-table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Ticket</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody id="tbody">
          <!-- Aquí irían los datos de la tabla -->
          <tr *ngFor="let ticket of ticketFilter ">
            <td>{{ ticket.idTicket }}</td>
            <td>{{ ticket.nameTicket }}</td>
            <td>{{ ticket.price.toFixed(2) }} €</td>
            <td>
              <button class="show-button"
                      [routerLink]="['/administration/ticket/' + ticket.idTicket]">
                <i class="fa-solid fa-eye"></i></button>
              <button class="edit-button"
                      [routerLink]="['/administration/ticket/replaceTicket/' + ticket.idTicket]">
                <i class="fa-solid fa-pen-to-square"></i></button>
              <button class="delete-button" (click)="deleteTicket(ticket.idTicket)">
                <i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
          </tbody>
        </table>
        <div *ngIf="ticketFilter.length === 0" class="alert">
          There are no tickets with this search criteria.
        </div>
      </div>
    </div>
  `,
  styleUrl: './list-ticket.component.css'
})
export class ListTicketComponent {

  tickets: Ticket[] = [];
  ticketService = inject(TicketService);
  ticketFilter: Ticket[] = [];
  filter: string = '';

  ngOnInit(): void {
    this.ticketService.getAll().subscribe((data: Ticket[]) => {
      this.tickets = data;
      this.ticketFilter = this.tickets;
      console.log(this.tickets);
    })
  }

  deleteTicket(id: any) {
    this.ticketService.delete(id).subscribe(res => {
      this.ticketFilter = this.tickets.filter(ticket => ticket.idTicket !== id);
      console.log('Ticket id =' + id + ' delete satisfactory!');
    })
  }

  filterTicketsByName(): void {
    console.log(this.filter)
    if (this.filter === '') {
      this.ticketFilter = this.tickets;
    } else {
      this.ticketFilter = this.tickets.filter(ticket => {
        return ticket.nameTicket.toLowerCase().includes(this.filter.toLowerCase());
      });
    }
  }

}
