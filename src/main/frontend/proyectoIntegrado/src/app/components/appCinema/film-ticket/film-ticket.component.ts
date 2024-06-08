import {Component, inject, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {Purchase} from "../../../models/Purchase";
import {PurchaseService} from "../../../services/purchase.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CinemaSeatsComponent} from "../cinema-seats/cinema-seats.component";
import {ChooseTicketComponent} from "../choose-ticket/choose-ticket.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-film-ticket',
  standalone: true,
  imports: [HeaderComponent, NgIf, NgForOf, FormsModule, CinemaSeatsComponent, ChooseTicketComponent, RouterLink],
  template: `
      <div id="background">
          <app-header></app-header>
      </div>
      <section id="contMovieTicket">
          <app-cinema-seats></app-cinema-seats>
          <article id="showDetailsTickets">
              <app-choose-ticket></app-choose-ticket>
              <div id="contInfoMovie">
                  <h1>Purchase summary</h1>
                  <div id="infoMovie">
                      <img src="./../../../../assets/{{purchase.film.photoUrl}}" alt="imageFilm">
                      <div id="details">
                          <div id="titleFilm" class="container">
                              <h4>Film:</h4>
                              <p> {{purchase.film.title}} </p>
                          </div>
                          <div id="date" class="container">
                              <h4>Date:</h4>
                              <p> {{purchase.date}} </p>
                          </div>
                          <div id="schedule" class="container">
                              <h4>Schedule:</h4>
                              <p> {{purchase.time}} </p>
                          </div>
                          <div id="contTickets" class="container">
                              <h4>Tickets:</h4>
                              <div *ngIf="purchase.tickets" id="tickets">
                                <span *ngFor="let ticket of getTicketsArray()">
                                  <div id="showTickets">
                                    <div id="ticketName"> {{ ticket.name }} </div>
                                    <div id="ticketCount"> ({{ ticket.count }}) </div>
                                  </div>
                                </span>
                              </div>
                          </div>
                      </div>
                  </div>
                  <p id="totalPay">Total Movie Tickets: {{purchase.total.toFixed(2)}} € </p>
              </div>
          </article>
      </section>
  `,
  styleUrl: './film-ticket.component.css'
})
export class FilmTicketComponent implements OnInit {

  purchase!: Purchase;
  purchaseService = inject(PurchaseService);

  ngOnInit(): void {
    this.purchase = this.purchaseService.getPurchase();
  }

  getTicketsArray(): { name: string, count: number }[] {
    const ticketsArray: { name: string; count: number; }[] = [];
    this.purchase.tickets.forEach((tickets, key) => {
      if (tickets.length > 0) {
        ticketsArray.push({ name: tickets[0].nameTicket, count: tickets.length });
      }
    });
    return ticketsArray;
  }
}
