import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Film} from "../models/Film";

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private apiURL = "http://localhost:8080/administration/films/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Film[]> {
    return this.httpClient.get<Film[]>(this.apiURL)
      .pipe(catchError(this.errorHandler));
  }

  create(film: Film): Observable<Film> {
    console.log(film);
    return this.httpClient.post<Film>(this.apiURL + "newFilm", JSON.stringify(film), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<Film> {
    return this.httpClient.get<Film>(this.apiURL + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, film: Film): Observable<Film> {
    return this.httpClient.put<Film>(this.apiURL + "replaceFilm/" + id, JSON.stringify(film), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient.delete<Film>(this.apiURL + "deleteFilm/" + id, this.httpOptions)
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
