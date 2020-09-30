import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { LocationComponent } from '../../features/data-table/components/location/location.component';

const routes: Routes = [
    {
        path: '', component: CatalogComponent, children: [
            { path: 'location', component: LocationComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CatalogRoutingModule { }
