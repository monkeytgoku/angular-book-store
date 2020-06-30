import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.authUser.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(request);
        }
        const modifiedReq = request.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq).pipe(
          tap(event => {
            if (event.type === HttpEventType.Response) {
              console.log(event.body);
            }
          })
        );
      })
    );
  }
}
