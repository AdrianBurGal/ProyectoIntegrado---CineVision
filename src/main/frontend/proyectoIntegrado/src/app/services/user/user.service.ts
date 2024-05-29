import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../auth/User";
import {environment} from "../../enviroments/enviroment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(environment.urlApi + "user/" + id).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(userRequest: User): Observable<any> {
    return this.http.put(environment.urlApi + "user", userRequest).pipe(
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error ', error.error);
    } else {
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
  }
}
