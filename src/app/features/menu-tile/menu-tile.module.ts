import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuTileComponent } from './menu-tile/menu-tile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/tree';



@NgModule({
  declarations: [MenuTileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TreeModule
  ],
  exports: [MenuTileComponent]
})
export class MenuTileModule { }
