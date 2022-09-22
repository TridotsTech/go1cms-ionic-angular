import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from 'src/app/components/components.module';

import { IonicModule } from '@ionic/angular';

import { InternshipPageRoutingModule } from './internship-routing.module';
import { InternshipPage } from './internship.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InternshipPageRoutingModule,
    ComponentsModule
  ],
  declarations: [InternshipPage]
})
export class InternshipPageModule {}
