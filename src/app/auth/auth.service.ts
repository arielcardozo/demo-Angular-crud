import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from './user.module';
import {Router} from '@angular/router';


export interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId:	string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAcooDtAYGDff23nOPoYyUuGNuftvKwXl0',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError ( this.handleError), tap(respData => {
        this.handleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn);
      }));
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAcooDtAYGDff23nOPoYyUuGNuftvKwXl0',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleError), tap(respData => {
        this.handleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn);
      }));
  }

  autoLogin(){
    console.log("in autologing...");
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if ( !userData ){
      return;
    }

    const loadUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));

    if ( loadUser.token){
      this.user.next(loadUser);
      const expirationDuration =
        new Date (userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if ( this.tokenExpirationTimer ){
      clearInterval(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  /**
   * Handles the autentication storage in order to persists when the page is reloaded and restarts
   * @param email
   * @param userId
   * @param token
   * @param expiresIn
   * @private
   */
  private  handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(expiresIn * 1000);
  }
  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An Unknown error has ocurred!';
    if ( !errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'This email adderess exists already';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = ' Operación no permitida';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = ' Invalid email or passowrd';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = ' Invalid email or passowrd';
    }
    return throwError(errorMessage);

  }
}
