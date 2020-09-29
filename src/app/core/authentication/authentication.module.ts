import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/concrete/authentication.service';
// import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
// import { JwtInterceptor } from '@core/interceptors/jwt.iterceptor';
// import { ErrorInterceptor } from '@core/interceptors/error.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: 'IAuthenticationService', useClass: AuthenticationService },
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class AuthenticationModule { }
