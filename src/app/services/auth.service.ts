import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, filter, map, of, switchMap, take, throwError } from 'rxjs';
import { ActionsService } from './actions.service';
import { Login } from '../interfaces/login.interface';
import { Router } from '@angular/router';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { WelldoneComponent } from '../components/welldone/welldone.component';
import { Register } from '../interfaces/register.interface';
import { PasswordChange } from '../interfaces/password-change.interface';

export const JWT_ACCESS_TOKEN = 'access_token';
export const JWT_REFRESH_TOKEN = 'refresh_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessTokenSubject: BehaviorSubject<string | null>;
  accessToken$: Observable<string | null>;
  private spinner:boolean = false;
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public refreshTokened:Observable<any> = this.refreshTokenSubject.asObservable();
  private authenticatedState:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private reload:Subject<void> = new Subject<void>();
  public reload$:Observable<void> = this.reload.asObservable();
  constructor(
    private http:HttpClient,
    private actionService:ActionsService,
    private router:Router,
    private overlay:Overlay) {
      this.accessTokenSubject = new BehaviorSubject<string | null>(this.getAccessToken());
      this.accessToken$ = this.accessTokenSubject.asObservable();
      this.authenticatedState.next(localStorage.getItem(JWT_ACCESS_TOKEN) ? true : false);
    }

  isAuthed() {
    const token = localStorage.getItem(JWT_ACCESS_TOKEN);
    return token && !this.tokenExpired(token);
  }

  isAdmin() {
    const token = this.getAccessToken();
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const userObj = JSON.parse(jsonPayload);
    console.log(userObj)
    return userObj.role === 'admin';
  }

  adminGuard() {
    return this.http.get('api/user/admin').pipe(
      catchError(e => {
        return of(false)
      })
    )
  }

  isAuthenticated() {
        const accessToken = this.getAccessToken();
        if(!accessToken) {
          return of(false);
        }

        if(!this.isAuthed()) {
          return this.refreshToken().pipe(
            map(() => true),
            catchError(() => of(false))
          );
        }
        return of(true);
  }
  public tokenExpired(token:string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  register(registerUser) {
    console.log(registerUser)
    return this.http.post('/api/user/register', registerUser)
  }
  login(email:string, password:string) {
    const login = {email, password};
    this.actionService.createSpinner();
    
    return this.http.post('/api/user/login', login).pipe(
      map((token:any) => {
        localStorage.setItem(JWT_ACCESS_TOKEN, token.accessToken);
        localStorage.setItem(JWT_REFRESH_TOKEN, token.refreshToken);
        this.authenticatedState.next(true);
        this.refreshTokenSubject.next(token.accessToken);
        //this.reload.next();
        window.location.reload()
        this.actionService.closeSpinner();
        return of([])
      }),
      catchError(err => this.handleclosing(err))
    )
  }


  refreshToken():Observable<any> {
        console.log('ref');
        this.refreshTokenInProgress = true;
        return this.http.post<any>('/api/user/refresh', { refresh: this.getRefreshToken() }).pipe(
          map((result) => {
            console.log(result);
            this.setAccessToken(result.accesstoken);
            this.refreshTokenSubject.next(result.accesstoken);
            this.authenticatedState.next(true);
            this.reload.next();
            return result.accesstoken;
          }),
          
        )
    
 }
 private getAccessToken(): string | null {
  return localStorage.getItem(JWT_ACCESS_TOKEN);
}

 handleError(err) {
  this.logout();
  return throwError(err);
 }

  private getRefreshToken() {
    return localStorage.getItem(JWT_REFRESH_TOKEN);
  }

  private setAccessToken(accessToken: string) {
    localStorage.setItem(JWT_ACCESS_TOKEN, accessToken);
  }

  logout() {
    console.log('logged out')
    this.authenticatedState.next(false);
    localStorage.removeItem(JWT_ACCESS_TOKEN);
    localStorage.removeItem(JWT_REFRESH_TOKEN);
  }

  handleclosing(err:HttpErrorResponse) {
    this.actionService.closeSpinner();
    return throwError(() => new Error(''))
  }

  handleUnauthorized():void {
    this.actionService.unAuthorizedErrorHandler()
  }

  get authStateChange():Observable<boolean> {
    return this.authenticatedState.asObservable();
  }

  private handleLoginError(error:HttpErrorResponse) {
    return throwError(() => new Error('მომხმარებლის მონაცემები არ მოიძებნა'));
  }

  mailCheck(email:string) {
    return this.http.post(`/api/user/mail`, {email})
  }

  mailOtp(pin:number) {
    return this.http.post(`/api/user/mailotp`, {pin})
  }

  changePassword(password:string, pin:number) {
    return this.http.post(`/api/user/change`, {password, pin})
  }

  verifyUser(pin:number) {
    return this.http.post(`/api/user/verify`, {pin})
  }

  updatePassword(pass:PasswordChange) {
    return this.http.post(`/api/user/update`, {pass})
  }
}
