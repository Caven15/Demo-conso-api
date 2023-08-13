import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Api/auth.service';
import { TokenService } from 'src/app/Services/Api/token.service';

@Component({
  selector: 'app-refresh-connection',
  templateUrl: './refresh-connection.component.html',
  styleUrls: ['./refresh-connection.component.css']
})
export class RefreshConnectionComponent implements OnInit {

  constructor(
    private _authService : AuthService,
    private _Router : Router,
    private _tokenService : TokenService
    ) { }

  ngOnInit(): void {
  }

  GetConnextion() : void{
    this._authService.RefreshToken().subscribe({
      next : (data) => {
        console.log(data)
        this._tokenService.saveToken(data.token)
        this._tokenService.saveRefreshToken(data.refreshToken)
        this._Router.navigate(['home'])
      }
      ,error : (error) => {
        console.log(error)
        this._Router.navigate['login']
      },
      complete : () => {
      }
    });
  }

}
