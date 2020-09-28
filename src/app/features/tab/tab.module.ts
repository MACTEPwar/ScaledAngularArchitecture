import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabService } from './service/concrete/tab.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: 'ITabService', useClass: TabService}
  ]
})
export class TabModule { }
