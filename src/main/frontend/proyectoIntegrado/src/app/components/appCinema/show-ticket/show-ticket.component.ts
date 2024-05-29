import {Component, inject} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {Film} from "../../../models/Film";
import {FilmService} from "../../../services/film.service";
import {ActivatedRoute} from "@angular/router";
import {PurchaseService} from "../../../services/purchase.service";
import {Purchase} from "../../../models/Purchase";
import {Ticket} from "../../../models/Ticket";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-show-ticket',
  standalone: true,
  imports: [HeaderComponent, NgForOf],
  template: `
      <div id="background" [style.background-image]="'url(' + backgroundImageUrl + ')'"
           [style.background-size]="'cover'" [style.background-position]="'center top'">
          <app-header></app-header>
      </div>

      <div *ngFor="let ticket of getTickets()">
          <div id="ticket">
              <div id="leftTicket">
                  <p>ROW: {{ ticket.seat.row }} </p>
                  <p>SEAT: {{ ticket.seat.seat }} </p>
                  <img src="./../../../../assets/barsCode.webp">
              </div>

              <div id="rightTicket" [style.background-image]="'url(' + backgroundImageUrl + ')'"
                   [style.background-size]="'cover'" [style.background-position]="'center top'">

                  <h3 id="title">{{film.title.toUpperCase()}}</h3>
                  <div id="contDetails">
                      <div class="details"><p>ROW</p> <span> {{ ticket.seat.row }} </span></div>
                      <div class="details"><p>SEAT</p> <span> {{ ticket.seat.seat }} </span></div>
                      <div class="details"><p>DATE</p><span> 26may </span></div>
                      <div class="details"><p>TIME</p><span> {{purchase.time}} </span></div>
                  </div>
              </div>
          </div>
      </div>
  `,
  styleUrl: './show-ticket.component.css'
})
export class ShowTicketComponent {
  film!: Film;
  purchase!: Purchase;
  tickets!: Map<number, Ticket[]>
  filmService = inject(FilmService);
  purchaseService = inject(PurchaseService);
  route: ActivatedRoute = inject(ActivatedRoute);
  backgroundImageUrl: String | undefined;

  ngOnInit(): void {
    this.purchase = this.purchaseService.getPurchase();
    this.film = this.purchase.film;
    this.tickets = this.purchase.tickets;
    this.backgroundImageUrl = "./../../../../../../assets/back-" + this.film.title.replace(/\s/g, '') + ".webp";
  }

  getTickets() {
    let allTickets: Ticket[] = [];
    this.purchase.tickets.forEach(ticket => {
      allTickets.push(...ticket)
    });
    return allTickets;
  }
}
