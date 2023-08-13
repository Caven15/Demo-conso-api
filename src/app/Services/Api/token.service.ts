import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public saveToken(token : string): void {
    sessionStorage.setItem('currentUser', (token))
  }

  public saveRefreshToken(refreshToken : string): void {
    sessionStorage.setItem('refreshToken', refreshToken)
  }

  public getToken(): string {
    return sessionStorage.getItem('token');
  }

  public getRefreshToken(): string {
    return sessionStorage.getItem('refreshToken');
  }

}
