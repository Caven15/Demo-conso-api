import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { AuthService } from '../Api/auth.service';
import { environment } from 'src/environments/environment';
import { TokenService } from '../Api/token.service';
import { Router } from '@angular/router';
import { tokenModel } from 'src/app/Models/tokenModel';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService,
    private _tokenService: TokenService,
    private _router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._authService.currentUserValue;
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    if (token && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          this._router.navigate(['refreshConnection']);
          return next.handle(request);
        } else {
          return of(error);
        }
      })
    );
  }
}