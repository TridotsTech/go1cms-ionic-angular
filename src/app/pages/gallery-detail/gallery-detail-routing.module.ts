import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryDetailPage } from './gallery-detail.page';

const routes: Routes = [
  {
    path: '',
    component: GalleryDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryDetailPageRoutingModule {}
