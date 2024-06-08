import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Genre} from "../models/Genre";

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private apiURL = "http://localhost:8080/administration/genre/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Genre[]> {
    return this.httpClient.get<Genre[]>(this.apiURL)
      .pipe(catchError(this.errorHandler));
  }

  create(genre: Genre): Observable<Genre> {
    console.log(genre);
    return this.httpClient.post<Genre>(this.apiURL + "newGenre", JSON.stringify(genre), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<Genre> {
    return this.httpClient.get<Genre>(this.apiURL + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, genre: Genre): Observable<Genre> {
    return this.httpClient.put<Genre>(this.apiURL + "replaceGenre/" + id, JSON.stringify(genre), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient.delete<Genre>(this.apiURL + "deleteGenre/" + id, this.httpOptions)
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
