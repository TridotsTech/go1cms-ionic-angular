import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogDetailPage } from './blog-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BlogDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogDetailPageRoutingModule {}
