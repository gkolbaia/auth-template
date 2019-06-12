import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }
  getToken() {
    return localStorage.getItem('token');
  };
  register(registerForm) {
    return this._http.post('api/auth/register', registerForm)
  };
  login(loginForm) {
    return this._http.post('api/auth/login', loginForm).pipe(map(res => res), catchError(this.errorHandler));
  };
  getUser() {
    return this._http.get('api/getuser').pipe(map(res => res, catchError(this.errorHandler)))
  };
  get session() {
    return this._http.get('api/auth/permission');
  }
  get isLoggedIn() {
    return this.session.pipe(map(this.checklogin), catchError(() => of(false)))
  }
  checklogin(res) {
    if (res['permission']) {
      return true
    } else {
      window.location.href = '/';
      return false
    }
  }
  errorHandler(err) {
    if (err.status === 401) {
      localStorage.removeItem('token');
      this._router.navigate(['/']);
    };
    return throwError(err)
  }
}
