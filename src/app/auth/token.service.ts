import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  private issuer = {
    login: 'http://139.59.43.29/api/login',
  }

  constructor() { }

  preserveTokenInfo(token: any) {
    localStorage.setItem('auth_token', token.access_token);
    localStorage.setItem('expires_in', token.expires_in);
    localStorage.setItem('token_type', token.token_type);
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  // Verify the token
  isValidToken() {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token: string) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }

  // Remove token
  removeToken() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('token_type');
  }

}