import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryDetailPageRoutingModule } from './gallery-detail-routing.module';

import { GalleryDetailPage } from './gallery-detail.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryDetailPageRoutingModule,
    ComponentsModule
  ],
  declarations: [GalleryDetailPage]
})
export class GalleryDetailPageModule {}
