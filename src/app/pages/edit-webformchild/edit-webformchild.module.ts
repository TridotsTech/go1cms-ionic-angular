import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EditWebformchildPageRoutingModule } from './edit-webformchild-routing.module';

import { EditWebformchildPage } from './edit-webformchild.page';
// import { SignaturePadModule } from 'angular2-signaturepad';
// import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditWebformchildPageRoutingModule,
    ReactiveFormsModule,
    // SignaturePadModule,
    // QuillModule.forRoot(),
  ],
  declarations: [EditWebformchildPage]
})
export class EditWebformchildPageModule { }
