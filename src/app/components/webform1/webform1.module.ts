import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QuillModule } from 'ngx-quill';
import { SignaturePadModule } from 'angular2-signaturepad';
import { Webform1Component } from './webform1.component';
import { RouterModule } from '@angular/router';
import {
  RecaptchaModule,
  RecaptchaV3Module,
} from 'ng-recaptcha';
import { TermsPage } from 'src/app/pages/terms/terms.page';

@NgModule({
  declarations: [Webform1Component],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    SignaturePadModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaV3Module,
    QuillModule.forRoot(),
  ],
  exports: [Webform1Component]
})
export class Webform1Module { }
