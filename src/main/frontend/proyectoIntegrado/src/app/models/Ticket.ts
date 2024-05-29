import {Seat} from "./Seat";

export interface Ticket {
  idTicket: number;
  nameTicket: string;
  price: number;
  seat: Seat;
}
