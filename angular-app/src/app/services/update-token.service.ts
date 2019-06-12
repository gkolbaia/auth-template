import { Injectable, Injector } from '@angular/core';
import { tap } from "rxjs/operators";
import { HttpRequest, HttpResponse, HttpHandler } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UpdateTokenService {

  constructor(
    private _injector: Injector
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req)
      .pipe(
        tap((res: HttpResponse<any>) => {
          if (res instanceof HttpResponse) {
            const newToken = res['headers'].get('token');
            localStorage.setItem('token', newToken)
          }
        })
      )
  }
}
