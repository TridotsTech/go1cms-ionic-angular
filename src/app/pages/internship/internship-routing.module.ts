import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternshipPage } from './internship.page';

const routes: Routes = [
  {
    path: '',
    component: InternshipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternshipPageRoutingModule {}
