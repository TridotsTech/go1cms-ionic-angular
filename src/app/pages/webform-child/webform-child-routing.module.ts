import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebformChildPage } from './webform-child.page';

const routes: Routes = [
  {
    path: '',
    component: WebformChildPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebformChildPageRoutingModule {}
