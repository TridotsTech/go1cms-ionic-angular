import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebFormPageRoutingModule } from './web-form-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { WebFormPage } from './web-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    WebFormPageRoutingModule
  ],
  declarations: [WebFormPage]
})
export class WebFormPageModule {}
