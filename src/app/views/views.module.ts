import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';


// import { UiComponent } from './ui/ui.component';


@NgModule({
  declarations: [ NotFoundComponent],
  imports: [
    CommonModule,
    ViewsRoutingModule,
  ]
})
export class ViewsModule { }
