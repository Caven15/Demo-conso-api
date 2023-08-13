import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';
import { UtilisateurLoginForm } from 'src/app/Models/UtilisateurLoginForm';
import { Utilisateur } from 'src/app/Models/Utilisateur.model';
import { refreshTokenModel } from 'src/app/Models/refreshTokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUserSubject : BehaviorSubject<Utilisateur>
  public currentUser : Observable<Utilisateur>


  public headers = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(
    private _client : HttpClient,
    private _route : Router,
    private _tokenService : TokenService,
    ) {
      this._currentUserSubject = new BehaviorSubject<Utilisateur>(JSON.parse(this._tokenService.getToken()))
      this.currentUser = this._currentUserSubject.asObservable()
    }

  public get currentUserValue(): Utilisateur {
    return this._currentUserSubject.value
  }

  // Set du token dans le behavior
  SetToken(token : Utilisateur){
    this._currentUserSubject.next(token)
  }

  // Enregistrement Utilisateur
  RegisterUtilisateur(newUtilisateur : Utilisateur) : Observable<any>{
    console.log(newUtilisateur)
    return this._client.post(`${environment.apiUrl}/api/Auth/Register`, newUtilisateur, {headers : this.headers})
  }

  // Login Utilisateur
  Login(userLogin : UtilisateurLoginForm) : Observable<Utilisateur>{
    return this._client.post<any>(`${environment.apiUrl}/api/Auth/Login`, userLogin)
    .pipe(map(utilisateur => {
      this._currentUserSubject.next(utilisateur.token);
      return utilisateur;
      }));

  }

  // Refresh du token
  RefreshToken() : Observable<any>{
    let refreshToken = new refreshTokenModel()
    refreshToken.refreshToken = this._tokenService.getRefreshToken()
    return this._client.post<any>(`${environment.apiUrl}/api/Auth/RefreshToken`,refreshToken, {headers : this.headers})
    .pipe(map(refreshToken => {
      console.log("rafraichissement du token de base")
      console.log(refreshToken.token)
      this._currentUserSubject.next(refreshToken.token);
      return refreshToken;
      }));
  }
}
