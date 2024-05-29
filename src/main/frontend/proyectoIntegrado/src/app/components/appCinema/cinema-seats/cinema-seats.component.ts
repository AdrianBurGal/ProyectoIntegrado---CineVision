import {Component, inject, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Seat} from "../../../models/Seat";
import {SeatService} from "../../../services/seat.service";
import {CartService} from "../../../services/cart.service";
import {RouterLink} from "@angular/router";
import {PurchaseService} from "../../../services/purchase.service";

@Component({
  selector: 'app-cinema-seats',
  standalone: true,
  imports: [NgForOf, RouterLink],
  template: `
      <article id="contSeats">
          <div id="legend">
              <p><i class="fa-solid fa-check"></i>Selected seats</p>
              <p><i class="fa-solid fa-square-xmark"></i>Seat Locked</p>
              <p><i class="fa-solid fa-wheelchair"></i>Wheelchair</p>
          </div>
          <div id="screen">SCREEN</div>
          <div id="seats">

              <div id="firstColumn" class="columSeats">
                  <div class="seats-container">
                      <ng-container *ngFor="let row of seats1">
                          <div *ngFor="let seat of row" class="seat-wrapper">
                              <div class="seat" [class.selected]="seat.isReserved"
                                   (click)="selectSeat(seat)"></div>
                          </div>
                      </ng-container>
                  </div>
              </div>

              <div id="secondColumn" class="columSeats">
                  <div class="seats-container">
                      <ng-container *ngFor="let row of seats2">
                          <div *ngFor="let seat of row" class="seat-wrapper">
                              <div class="seat" [class.selected]="seat.isReserved"
                                   (click)="selectSeat(seat)"></div>
                          </div>
                      </ng-container>
                  </div>
              </div>

          </div>
          <button routerLink="tickets" [disabled]="save" (click)="saveTickets()">
              <i class="fa-solid fa-ticket"></i>GET MY TICKETS
          </button>
      </article>
  `,
  styleUrl: './cinema-seats.component.css'
})
export class CinemaSeatsComponent implements OnInit {

  cartService = inject(CartService);
  purchaseService = inject(PurchaseService);
  seats1: Seat[][] = [];
  seats2: Seat[][] = [];
  seatsReserved: Seat[] = [];
  save: boolean = true;

  numRows: number = 6;
  numColumns: number = 7;


  ngOnInit(): void {
    this.seats1 = this.createSeats();
    this.seats2 = this.createSeats();
  }

  createSeats() {
    const seats: Seat[][] = [];
    let totalSeats: number = 0;

    for (let row = 0; row <= this.numRows; row++) {
      seats[row] = [];
      for (let seat = 0; seat <= this.numColumns; seat++) {
        seats[row][seat] = {id: totalSeats++, row: row + 1, seat: seat + 1, isReserved: false};
      }
    }
    return seats;
  }

  selectSeat(seatSelected: Seat) {
    if (!seatSelected.isReserved && this.seatsReserved.length < this.cartService.getTicketsShop()) {
      seatSelected.isReserved = true;
      this.seatsReserved.push(seatSelected);

    } else if (seatSelected.isReserved) {
      seatSelected.isReserved = false;
      const index = this.seatsReserved.findIndex(seat => seat.id === seatSelected.id);
      if (index !== -1) {
        this.seatsReserved.splice(index, 1);
      }
    }
    this.checkButtonStatus();
  }

  saveTickets() {
    const purchase = this.purchaseService.getPurchase();
    let seatIndex = 0;

    purchase.tickets.forEach((tickets, key) => {
      tickets.forEach(ticket => {
        if (seatIndex < this.seatsReserved.length) {
          ticket.seat = this.seatsReserved[seatIndex];
          seatIndex++;
        }
      });
    });

    this.purchaseService.setPurchase(purchase);
  }

  checkButtonStatus() {
    this.save = this.cartService.getTicketsShop() != this.seatsReserved.length
      && this.cartService.getTicketsShop() != 0;
  }
}
