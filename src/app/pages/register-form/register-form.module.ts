import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from 'src/app/components/components.module';

import { IonicModule } from '@ionic/angular';

import { RegisterFormPageRoutingModule } from './register-form-routing.module';
import { RegisterFormPage } from './register-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterFormPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RegisterFormPage]
})
export class RegisterFormPageModule {}
