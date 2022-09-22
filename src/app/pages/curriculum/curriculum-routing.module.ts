import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurriculumPage } from './curriculum.page';

const routes: Routes = [
  {
    path: '',
    component: CurriculumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurriculumPageRoutingModule {}
