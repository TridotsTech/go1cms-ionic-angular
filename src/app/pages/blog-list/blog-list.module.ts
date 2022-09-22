import {
  CommonModule,
  DatePipe,
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from 'src/app/components/components.module';

import { IonicModule } from '@ionic/angular';

import { BlogListPageRoutingModule } from './blog-list-routing.module';
import { BlogListPage } from './blog-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlogListPageRoutingModule,
    ComponentsModule
  ],
  declarations: [BlogListPage],
  providers:[
    DatePipe
  ],
})
export class BlogListPageModule {}
