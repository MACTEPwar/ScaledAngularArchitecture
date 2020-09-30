import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { ToastModule } from 'primeng/toast';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginRoutingModule } from './login-routing.module';
import { appLocalizationModuleChild } from '../../core/localization/localization.module';
import { LangSelectModule } from '@shared/components/al-lang-select/lang-select.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    ToastModule,
    FontAwesomeModule,
    appLocalizationModuleChild,
    LangSelectModule,
  ],
  exports: [
    LoginComponent,
    RouterModule
  ]
})
export class LoginModule { }
