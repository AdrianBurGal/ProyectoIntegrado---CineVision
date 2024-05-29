import {inject, Injectable} from "@angular/core";
import {Ticket} from "../models/Ticket";
import {TicketService} from "./ticket.service";
import {PurchaseService} from "./purchase.service";
import {Seat} from "../models/Seat";

@Injectable({
  providedIn: 'root',
})
export class CartService {

  ticketService = inject(TicketService);
  purchaseService = inject(PurchaseService);
  listTickets: Map<number, Ticket[]>;
  totalPurchase: number = 0;

  constructor() {
    this.listTickets = new Map<number, Ticket[]>();
  }

  addToCart(ticket: Ticket) {
    if (this.getTicketsShop() < 10) {
      if (!this.listTickets.has(ticket.idTicket)) {
        this.listTickets.set(ticket.idTicket, []);
      }
      this.listTickets.get(ticket.idTicket)?.push(ticket);
      this.updatePurchase();
    }
  }

  getItems() {
    return this.listTickets;
  }

  getTicketsShop() {
    let totalTickets = 0;
    this.listTickets.forEach(ticketArray => {
      totalTickets += ticketArray.length;
    });
    return totalTickets;
  }

  clearCart() {
    this.listTickets.clear();
    this.updatePurchase();
  }

  addQuantity(ticketId: number) {
    this.ticketService.find(ticketId).subscribe(ticket => {
      if (ticket) {
        this.addToCart(ticket);
      }
    });
  }

  removeQuantity(ticketId: number) {
    this.ticketService.find(ticketId).subscribe(ticket => {
      if (ticket) {
        this.listTickets.get(ticket.idTicket)?.pop();
        if (this.listTickets.get(ticket.idTicket)?.length === 0) {
          this.listTickets.delete(ticketId);
        }
        this.updatePurchase();
      }
    });
  }

  updatePurchase() {
    const purchase = this.purchaseService.getPurchase();
    purchase.tickets = new Map<number, Ticket[]>();
    for (const [key, tickets] of this.listTickets.entries()) {
      purchase.tickets.set(key, tickets);
    }
    purchase.total = this.getTotalPurchase();
    this.purchaseService.setPurchase(purchase);
  }

  getTotalPurchase() {
    this.totalPurchase = 0;
    for (const ticketArray of this.listTickets.values()) {
      for (const ticket of ticketArray) {
        this.totalPurchase += ticket.price;
      }
    }
    return this.totalPurchase;
  }
}
