import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/Models/Utilisateur.model';
import { AuthService } from 'src/app/Services/Api/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public registerUtilisateur : FormGroup

  constructor(
    private _authService : AuthService,
    private _formBuilder : FormBuilder,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.registerUtilisateur = this._formBuilder.group({
      nom : [null, [Validators.required]],
      prenom : [null, [Validators.required]],
      email : [null, [Validators.required]],
      dateNaissance : [null, [Validators.required]],
      password : [null, [Validators.required]]
    })
  }

  onSubmit() : void {

    if (this.registerUtilisateur.invalid) {
      return
    }
    else{
      const formsUtilisateur = new Utilisateur()

      formsUtilisateur.Nom = this.registerUtilisateur.value["nom"]
      formsUtilisateur.Prenom =  this.registerUtilisateur.value["prenom"]
      formsUtilisateur.Email =  this.registerUtilisateur.value["email"]
      formsUtilisateur.DateNaissance =  this.registerUtilisateur.value["dateNaissance"]
      formsUtilisateur.Password =  this.registerUtilisateur.value["password"]

      this._authService.RegisterUtilisateur(formsUtilisateur).subscribe({
        next : (data) => {
          // instruction au prochain changement d'état
        },
        error : (error) => {
          console.log(error)
        },
        complete : () => {
          this._router.navigate(['home'])
        }
      })
    }

  }
}
