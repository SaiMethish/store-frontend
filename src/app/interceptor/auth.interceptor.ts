import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { switchMap, filter, take, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private router: Router, private inject: Injector, private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes("/login") || request.url.includes("/refresh")) {
      return next.handle(request);
    }

    const accessToken = sessionStorage.getItem("access-token");
    let clonedRequest = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + accessToken,
      }
    });

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !request.url.includes("/login")) {
          console.log("Access token expired, attempting to refresh");
          return this.handle401Error(clonedRequest, next);
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        tap(token => console.log("New access token received")),
        switchMap((token: any) => {
          this.isRefreshing = false;
          sessionStorage.setItem("refresh-token",token.refresh_token);
          sessionStorage.setItem("access-token",token.access_token);
          this.refreshTokenSubject.next(token.access_token);  
          return next.handle(this.addToken(request, token.access_token));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.authService.logoutApi();
          console.log("Failed to refresh token");
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => next.handle(this.addToken(request, token))),
        tap(() => console.log("Request retried with new token"))
      );
    }
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
