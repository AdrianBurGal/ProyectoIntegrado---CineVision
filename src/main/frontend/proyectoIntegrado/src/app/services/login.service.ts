import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, Observable, tap, map, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {LoginRequest} from "../models/LoginRequest";
import {User} from "../models/User";
import {RegisterRequest} from "../models/RegisterRequest";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiURL = "http://localhost:8080/administration/user/auth/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserToken: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem("token") || "");
  currentUser: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token") != null);
    this.currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("user") || "{}"));
  }

  public login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(this.apiURL + "login", credentials).pipe(
      tap((userData) => {
        sessionStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData.user));
        this.currentUserLoginOn.next(true);
        this.currentUserToken.next(userData.token);
        this.currentUser.next(userData.user);
      }),
      map((userData) => userData.token),
      catchError((error: HttpErrorResponse) => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = `Error Code: ${error.status}, Message: ${error.message}`;
        }
        return throwError(errorMsg);
      })
    );
  }

  public register(user: RegisterRequest): Observable<any> {
    return this.http.post<any>(this.apiURL + "signUp", JSON.stringify(user), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public logout() {
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    this.currentUserLoginOn.next(false);
    this.currentUserToken.next("");
    this.currentUser.next({} as User);
    window.location.href = '/';
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error', error.error);
    } else {
      console.error('Backend retornó el código de estado', error);
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
  }

  get currentUserTokenValue(): String {
    return this.currentUserToken.value;
  }

  get currentUserValue(): User {
    return this.currentUser.value;
  }

  get userLoginOn(): boolean {
    return this.currentUserLoginOn.value;
  }

}
