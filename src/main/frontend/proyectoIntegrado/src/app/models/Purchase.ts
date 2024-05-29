import {Film} from "./Film";
import {Ticket} from "./Ticket";

export interface Purchase {
  film: Film;
  time: string;
  total: number;
  tickets: Map<number, Ticket[]>;
}
