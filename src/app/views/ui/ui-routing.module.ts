import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UiComponent } from './ui-comonent/ui.component';

const routes: Routes = [
  { path: '', component: UiComponent, children: [
    { path: 'buttons', loadChildren: () => import('./button/button.module').then(m => m.ButtonModule) }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiRoutingModule { }
