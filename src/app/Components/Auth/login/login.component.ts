import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurLoginForm } from 'src/app/Models/UtilisateurLoginForm';
import { AuthService } from 'src/app/Services/Api/auth.service';
import { TokenService } from 'src/app/Services/Api/token.service';
import { UtilisateurService } from 'src/app/Services/Api/utilisateur.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public utilisateur : UtilisateurLoginForm
  public loginUtilisateur : FormGroup

  constructor(
    private _utilisateurService : UtilisateurService,
    private _authService : AuthService,
    private _fromBuilder : FormBuilder,
    private _tokenService : TokenService,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.loginUtilisateur = this._fromBuilder.group({
      email : [null, [Validators.required]],
      password : [null, [Validators.required]]
    })
  }

  onSubmit(): void{
    this.utilisateur = new UtilisateurLoginForm()
    this.utilisateur.Email = this.loginUtilisateur.value['email']
    this.utilisateur.Password = this.loginUtilisateur.value['password']

    this._authService.Login(this.utilisateur).subscribe({
      next : (data) => {
        if (data) {
          this._tokenService.saveToken(data.token)
          this._tokenService.saveRefreshToken(data.refreshToken)
        }
      },
      error : (error) => {
        console.log(error)
      },
      complete : () => {
        // Redirection....
        this._router.navigate(['home'])
      }
    })
  }
}
