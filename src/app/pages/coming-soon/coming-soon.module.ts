import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from 'src/app/components/components.module';

import { IonicModule } from '@ionic/angular';

import { ComingSoonPageRoutingModule } from './coming-soon-routing.module';
import { ComingSoonPage } from './coming-soon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComingSoonPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ComingSoonPage]
})
export class ComingSoonPageModule {}
