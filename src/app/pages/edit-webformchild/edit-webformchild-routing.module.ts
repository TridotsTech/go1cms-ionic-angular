import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditWebformchildPage } from './edit-webformchild.page';

const routes: Routes = [
  {
    path: '',
    component: EditWebformchildPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditWebformchildPageRoutingModule {}
