import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from "@angular/common/http";
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private _injector: Injector,
  ) { }
  intercept(req, next) {
    let service = this._injector.get(AuthService);
    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${service.getToken()}`
      }
    });
    return next.handle(tokenizedRequest);
  };
}
