import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import {
  RECAPTCHA_SETTINGS,
  RecaptchaModule,
  RecaptchaSettings,
  RecaptchaV3Module,
} from 'ng-recaptcha';
import { ComponentsModule } from 'src/app/components/components.module';

import { IonicModule } from '@ionic/angular';

import { ContactUsPageRoutingModule } from './contact-us-routing.module';
import { ContactUsPage } from './contact-us.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactUsPageRoutingModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaV3Module,
    ComponentsModule
  ],
  declarations: [ContactUsPage],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: { siteKey: "<YOUR_KEY>" } as RecaptchaSettings,
  }],
})
export class ContactUsPageModule {}
