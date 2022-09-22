import {
  CommonModule,
  DatePipe,
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from 'src/app/components/components.module';

import { IonicModule } from '@ionic/angular';

import { BlogDetailPageRoutingModule } from './blog-detail-routing.module';
import { BlogDetailPage } from './blog-detail.page';

// import { HttpParams } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlogDetailPageRoutingModule,
    ComponentsModule
  ],
  declarations: [BlogDetailPage],
  providers:[
    DatePipe
  ],
})
export class BlogDetailPageModule {}
