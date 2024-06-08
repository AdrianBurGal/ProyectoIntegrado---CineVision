import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Seat} from "../models/Seat";

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  private apiUrl = 'http://localhost:8080/seats';
  private lock = new BehaviorSubject<boolean>(false);
  lock$ = this.lock.asObservable();

  constructor(private http: HttpClient) { }

  getSeats(): Observable<Seat[]> {
    return this.http.get<Seat[]>(this.apiUrl);
  }

  reserveSeat(id: number): Observable<Seat> {
    return this.http.post<Seat>(`${this.apiUrl}/${id}/reserve`, {});
  }

  setLockStatus(status: boolean) {
    this.lock.next(status);
  }

}
