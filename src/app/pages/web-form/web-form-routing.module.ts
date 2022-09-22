import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebFormPage } from './web-form.page';

const routes: Routes = [
  {
    path: '',
    component: WebFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebFormPageRoutingModule {}
