import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';

const routes: Routes = [
  { path: '', component: ButtonComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ButtonRoutingModule { }
