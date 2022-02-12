import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { tap, delay } from 'rxjs/operators';
import { TokenService } from './token.service';
export interface Login {
  username: any,
  password: any
}
const ParseHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: 'Bearer '
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = '';
  constructor(private http: HttpClient,private tokenService:TokenService) {
    this.baseUrl = 'http://139.59.43.29/';
  }
  isUserLoggedIn: boolean = false;

  login(params: Login, url: string): Observable<boolean> {
    return this.http.post(`${this.baseUrl}${url}`, params).pipe( 
      map((res: any) => {
        this.tokenService.preserveTokenInfo(res);
        return true;
      }),
      catchError(this.handleError)
    )
  }

  logout(): void {
    this.tokenService.removeToken();
  }
  private handleError(error: HttpErrorResponse) {
    console.log(error.status);
    if (error.status === 401) {
      alert('invalid user name or passowrd')
    }
    else if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}
