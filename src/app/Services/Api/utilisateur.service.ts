import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from 'src/app/Models/Utilisateur.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private _client : HttpClient) { }

  // GetById
  GetById(id : number) : Observable<Utilisateur>{
    let utilisateur = this._client.get<Utilisateur>(`${environment.apiUrl}/api/Utilisateur/GetById/${id}`)
    return utilisateur
  }
}
