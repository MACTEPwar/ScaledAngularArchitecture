import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonRoutingModule } from './button-routing.module';
import { ButtonComponent } from './button/button.component';
import { RouterModule } from '@angular/router';
import { AlButtonModule } from '@components/al-button/al-button.module';


@NgModule({
  declarations: [ButtonComponent],
  imports: [
    CommonModule,
    ButtonRoutingModule,
    AlButtonModule
  ],
  exports: [ButtonComponent, RouterModule]
})
export class ButtonModule { }
