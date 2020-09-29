import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/concrete/authentication.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: 'IAuthenticationService', useClass: AuthenticationService}
  ]
})
export class AuthenticationModule { }
