import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { HomeComponent } from './Components/Home/home/home.component';
import { RefreshConnectionComponent } from './Components/Auth/refresh-connection/refresh-connection.component';

const routes : Routes = [
  {path : '', pathMatch : 'full', redirectTo : 'home'},
  {path : 'home', component : HomeComponent},
  {path : 'login', component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'refreshConnection', component : RefreshConnectionComponent},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }