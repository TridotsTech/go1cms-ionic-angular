import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageBuilderPageRoutingModule } from './page-builder-routing.module';

import { PageBuilderPage } from './page-builder.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PageBuilderPageRoutingModule
  ],
  declarations: [PageBuilderPage]
})
export class PageBuilderPageModule {}
