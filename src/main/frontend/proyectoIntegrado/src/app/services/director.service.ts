import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Director} from "../models/Director";

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  private apiURL = "http://localhost:8080/administration/director/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Director[]> {
    return this.httpClient.get<Director[]>(this.apiURL)
      .pipe(catchError(this.errorHandler));
  }

  create(director: Director): Observable<Director> {
    console.log(director);
    return this.httpClient.post<Director>(this.apiURL + "newDirector", JSON.stringify(director), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<Director> {
    return this.httpClient.get<Director>(this.apiURL + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, director: Director): Observable<Director> {
    return this.httpClient.put<Director>(this.apiURL + "replaceDirector/" + id, JSON.stringify(director), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient.delete<Director>(this.apiURL + "deleteDirector/" + id, this.httpOptions)
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
