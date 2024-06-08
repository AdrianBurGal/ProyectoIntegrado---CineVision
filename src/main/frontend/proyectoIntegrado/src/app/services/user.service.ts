import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = "http://localhost:8080/administration/user/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    }),
  }

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiURL)
      .pipe(catchError(this.errorHandler));
  }

  create(user: User): Observable<User> {
    console.log('Creando....' + JSON.stringify(user));
    return this.httpClient.post<User>(this.apiURL + "newUser", JSON.stringify(user), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<User> {
    return this.httpClient.get<User>(this.apiURL + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, user: User): Observable<User> {
    return this.httpClient.put<User>(this.apiURL + "replaceUser/" + id, JSON.stringify(user), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    console.log('Borrando....')
    return this.httpClient.delete<User>(this.apiURL + "deleteUser/" + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  public getUserFromSessionStorage(): User {
    const user = sessionStorage.getItem("user");
    return JSON.parse(user || "{}");
  }

  public createUserByAdmin(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiURL + "admin", JSON.stringify(user), this.httpOptions)
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
