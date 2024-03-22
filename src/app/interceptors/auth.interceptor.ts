import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, concatMap, finalize, map, of, switchMap, tap, throwError } from 'rxjs';
import { AuthService, JWT_ACCESS_TOKEN } from '../services/auth.service';
import { Router } from '@angular/router';
import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshingToken:boolean = false;
  constructor(
    private authService:AuthService,
    private router:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = localStorage.getItem(JWT_ACCESS_TOKEN);
    if(token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }
    return next.handle(request).pipe(
      catchError((err:HttpErrorResponse) => {
        if(err.status === 401) {
          console.log(123)
          return this.handle401Error(request, err, next);
        } else {
          return throwError(err);
        }
      })
    )
  }

  private handle401Error(request:HttpRequest<any>, err:HttpErrorResponse, next:HttpHandler) {
    if(!this.refreshingToken && localStorage.getItem(JWT_ACCESS_TOKEN)) {
      this.refreshingToken = true;
      return this.authService.refreshToken().pipe(
        concatMap((res) => {
          const token = localStorage.getItem(JWT_ACCESS_TOKEN);
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          })
          return next.handle(request)
        }),
        catchError((err:HttpErrorResponse) => {
          console.log(1);
          //this.router.navigateByUrl('/');
          //window.location.reload();
          //this.authService.logout();
          return throwError(err);
        }),
        finalize(() => {
          this.refreshingToken = false;
        })
      )
    
    
  } else {
    return throwError(err)
}
}}

