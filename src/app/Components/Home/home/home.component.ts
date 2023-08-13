import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/Services/Api/utilisateur.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _utilisateurService : UtilisateurService) { }

  ngOnInit(): void {

  }

  Get() : void{
    let Utilisateur = this._utilisateurService.GetById(1).subscribe({
      next : (data) => {
        console.log(data)
      }
    })
  }
}
