import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Actor} from "../models/Actor";

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private apiURL = "http://localhost:8080/administration/actor/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Actor[]> {
    return this.httpClient.get<Actor[]>(this.apiURL)
      .pipe(catchError(this.errorHandler));
  }

  create(actor: Actor): Observable<Actor> {
    console.log(actor);
    return this.httpClient.post<Actor>(this.apiURL + "newActor", JSON.stringify(actor), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<Actor> {
    return this.httpClient.get<Actor>(this.apiURL + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, actor: Actor): Observable<Actor> {
    return this.httpClient.put<Actor>(this.apiURL + "replaceActor/" + id, JSON.stringify(actor), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient.delete<Actor>(this.apiURL + "deleteActor/" + id, this.httpOptions)
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
