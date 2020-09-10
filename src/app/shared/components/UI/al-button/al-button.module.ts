import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, ButtonDirective } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [ButtonComponent, ButtonDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // ButtonModule
  ],
  exports: [ButtonComponent, ButtonDirective]
})
export class AlButtonModule { }
