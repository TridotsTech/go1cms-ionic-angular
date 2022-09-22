import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComingSoonPage } from './coming-soon.page';

const routes: Routes = [
  {
    path: '',
    component: ComingSoonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComingSoonPageRoutingModule {}
