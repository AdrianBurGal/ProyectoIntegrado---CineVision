import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Schedule} from "../models/Schedule";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private apiURL = "http://localhost:8080/administration/schedule/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Schedule[]> {
    return this.httpClient.get<Schedule[]>(this.apiURL)
      .pipe(catchError(this.errorHandler));
  }

  create(schedule: Schedule): Observable<Schedule> {
    console.log(schedule);
    return this.httpClient.post<Schedule>(this.apiURL + "newSchedule", JSON.stringify(schedule), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<Schedule> {
    return this.httpClient.get<Schedule>(this.apiURL + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, schedule: Schedule): Observable<Schedule> {
    return this.httpClient.put<Schedule>(this.apiURL + "replaceSchedule/" + id, JSON.stringify(schedule), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient.delete<Schedule>(this.apiURL + "deleteSchedule/" + id, this.httpOptions)
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
