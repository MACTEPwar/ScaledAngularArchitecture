import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AlButtonModule } from '@ui/al-button/al-button.module';


@NgModule({
  declarations: [DashboardComponent, NotFoundComponent],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    AlButtonModule
  ]
})
export class ViewsModule { }
