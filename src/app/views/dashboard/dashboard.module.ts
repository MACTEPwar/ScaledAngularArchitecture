import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuTileModule } from '@features/menu-tile/menu-tile.module';
import { DragDropModule } from 'primeng/dragdrop';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DragDropModule,
    MenuTileModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
