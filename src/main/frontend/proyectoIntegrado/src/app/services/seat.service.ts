import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Seat} from "../models/Seat";

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  private apiUrl = 'http://localhost:8080/seats';

  constructor(private http: HttpClient) { }

  getSeats(): Observable<Seat[]> {
    return this.http.get<Seat[]>(this.apiUrl);
  }

  reserveSeat(id: number): Observable<Seat> {
    return this.http.post<Seat>(`${this.apiUrl}/${id}/reserve`, {});
  }

}
