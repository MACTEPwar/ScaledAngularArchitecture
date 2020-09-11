import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponent } from './ui-comonent/ui.component';
import { RouterModule } from '@angular/router';

import { UiRoutingModule } from './ui-routing.module';


@NgModule({
  declarations: [
    UiComponent
  ],
  imports: [
    CommonModule,
    UiRoutingModule
  ],
  exports: [UiComponent, RouterModule]
})
export class UiModule { }
