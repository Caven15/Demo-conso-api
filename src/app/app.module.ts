import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './Components/Home/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from './Services/Interceptors/jwt.interceptor';
import { RefreshConnectionComponent } from './Components/Auth/refresh-connection/refresh-connection.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    RefreshConnectionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }