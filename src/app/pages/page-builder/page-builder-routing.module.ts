import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageBuilderPage } from './page-builder.page';

const routes: Routes = [
  {
    path: '',
    component: PageBuilderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageBuilderPageRoutingModule {}
