import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryListPageRoutingModule } from './gallery-list-routing.module';

import { GalleryListPage } from './gallery-list.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryListPageRoutingModule,
    ComponentsModule 
  ],
  declarations: [GalleryListPage]
})
export class GalleryListPageModule {}
