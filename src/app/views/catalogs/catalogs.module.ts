import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { DataTableModule } from '@features/data-table/data-table.module';
import { CatalogRoutingModule } from './catalog-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    DataTableModule,
    CatalogRoutingModule
  ],
  exports: [RouterModule]
})
export class CatalogsModule { }
