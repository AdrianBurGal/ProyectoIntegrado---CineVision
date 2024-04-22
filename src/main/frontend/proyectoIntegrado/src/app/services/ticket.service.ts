import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Ticket} from "../models/Ticket";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiURL = "http://localhost:8080/administration/ticket/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(this.apiURL)
      .pipe(catchError(this.errorHandler));
  }

  create(ticket: Ticket): Observable<Ticket> {
    console.log(ticket);
    return this.httpClient.post<Ticket>(this.apiURL + "newTicket", JSON.stringify(ticket), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<Ticket> {
    return this.httpClient.get<Ticket>(this.apiURL + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, ticket: Ticket): Observable<Ticket> {
    return this.httpClient.put<Ticket>(this.apiURL + "replaceTicket/" + id, JSON.stringify(ticket), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient.delete<Ticket>(this.apiURL + "deleteTicket/" + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}
