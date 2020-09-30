import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { LocalizationModule } from './localization/localization.module';
import { MainMenuModule } from './main-menu/main-menu.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.iterceptor';
import { NotificationModule } from './notification/notification.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LocalizationModule,
    MainMenuModule,
    AuthenticationModule,
    NotificationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class CoreModule { }
