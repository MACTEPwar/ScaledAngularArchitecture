import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationModule } from './localization/localization.module';
import { MainMenuModule } from './main-menu/main-menu.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LocalizationModule,
    MainMenuModule
  ]
})
export class CoreModule { }
