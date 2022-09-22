import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogListPage } from './blog-list.page';

const routes: Routes = [
  {
    path: '',
    component: BlogListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogListPageRoutingModule {}
