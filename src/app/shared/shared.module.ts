import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconPipe } from './pipes/fa-icon/fa-icon.pipe';
import { RangePipe } from './pipes/range/range.pipe';



@NgModule({
  declarations: [FaIconPipe, RangePipe],
  imports: [
    CommonModule
  ],
  exports: [FaIconPipe, RangePipe]
})
export class SharedModule { }
