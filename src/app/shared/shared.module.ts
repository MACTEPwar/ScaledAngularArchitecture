import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconPipe } from './pipes/fa-icon/fa-icon.pipe';



@NgModule({
  declarations: [FaIconPipe],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
