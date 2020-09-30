import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangSelectComponent } from './lang-select.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LangSelectComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
  ],
  exports: [LangSelectComponent]
})
export class LangSelectModule { }
