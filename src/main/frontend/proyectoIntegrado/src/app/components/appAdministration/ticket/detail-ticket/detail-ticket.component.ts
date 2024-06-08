import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {AdministrationComponent} from "../../administration/administration.component";
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {TicketService} from "../../../../services/ticket.service";
import {Ticket} from "../../../../models/Ticket";

@Component({
  selector: 'app-detail-ticket',
  standalone: true,
  imports: [AdministrationComponent, AsyncPipe, DatePipe, HeaderAdminComponent, NgIf],
  template: `
      <div id="mainAdmin">
          <app-administration/>
          <div id="contTableAdmin">
              <app-header-admin/>
              <h1>Details Ticket</h1>
              <form *ngIf="ticket | async as ticket">
                  <div class="form-group">
                      <label for="idTicket">ID:</label>
                      <input type="text" id="idTicket" name="idTicket" value="{{ticket.idTicket}}" readonly>
                  </div>
                  <div class="form-group">
                      <label for="ticket">Ticket:</label>
                      <input type="text" id="ticket" name="ticket" value="{{ticket.nameTicket}}" readonly>
                  </div>
                  <div class="form-group">
                      <label for="price">Price:</label>
                      <input type="text" id="price" name="price" value="{{ticket.price.toFixed(2)}} €" readonly>
                  </div>
              </form>
          </div>
      </div>
  `,
  styleUrl: './detail-ticket.component.css'
})
export class DetailTicketComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  ticketService = inject(TicketService);
  ticket: Observable<Ticket | undefined>;

  constructor() {
    const idTicket = Number(this.route.snapshot.params['id']);
    this.ticket = this.ticketService.find(idTicket);
    console.log(this.ticket)
  }

}
