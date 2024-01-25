import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = "https://my-resto-nodejs-emnaabbes.vercel.app/api";

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser: string;
  constructor(private http: HttpClient, public router: Router) { }
  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/users`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }
  // Sign-in
  signIn(user: any) {
    return this.http
      .post<any>(`${this.endpoint}/users/login`, user)
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('refresh_token', res.refreshToken);
          this.currentUser = res.user.name;
          console.log(this.currentUser);
        },
        error: (e: any) => {
          console.log(e);
          alert("Error !")
        },
        complete: () => {
          console.log(localStorage.getItem('na'))
          this.router.navigate(['products']);
        }
      });
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }
  getUserName(): string {
    return this.currentUser;
  }
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

  //refresh

  refreshToken(token: string) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(`${this.endpoint}/users/refreshToken/`, {
      refreshToken: token
    }, httpOptions);
  }

}
