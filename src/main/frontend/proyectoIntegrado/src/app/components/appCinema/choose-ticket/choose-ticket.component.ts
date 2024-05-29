import {Component, inject, OnInit} from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {TicketService} from "../../../services/ticket.service";
import {NgForOf} from "@angular/common";
import {Ticket} from "../../../models/Ticket";

@Component({
  selector: 'app-choose-ticket',
  standalone: true,
  imports: [NgForOf],
  template: `
      <div id="contPriceTickets">
          <h1>Choose your tickets</h1>
          <div id="priceTickets">

              <div *ngFor="let ticket of tickets" class="contPrice">
                  <p class="name"> {{ ticket.nameTicket }} </p>
                  <span class="price"> {{ ticket.price.toFixed(2) }} € / Ticket</span>
                  <button (click)="removeQuantity(ticket.idTicket)">-</button>
                  <span>{{ cart.get(ticket.idTicket) ? cart.get(ticket.idTicket)?.length : 0 }}</span>
                  <button (click)="addQuantity(ticket.idTicket)">+</button>
              </div>

          </div>
      </div>
  `,
  styleUrl: './choose-ticket.component.css'
})
export class ChooseTicketComponent implements OnInit {

  cartService = inject(CartService);
  ticketService = inject(TicketService);
  tickets: Ticket[] = [];
  cart = this.cartService.getItems();

  ngOnInit(): void {
    this.ticketService.getAll().subscribe(tickets => {
      this.tickets = tickets;
    })
  }

  addQuantity(ticketId: number) {
    this.cartService.addQuantity(ticketId);
  }

  removeQuantity(ticketId: number) {
    this.cartService.removeQuantity(ticketId);
  }
}
