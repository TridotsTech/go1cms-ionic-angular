import { Location } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

import { ModalController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-list-style',
  templateUrl: './list-style.component.html',
  styleUrls: ['./list-style.component.scss'],
})
export class ListStyleComponent implements OnInit {

 @Input() item;
 @Input() page_route;
 @Output() scroll_to_Top = new EventEmitter ;

 left = 0;
 no_products = false;
 page_no = 1;
 selected_menu;

  constructor(public loadingController: LoadingController,private mc:ModalController,private router:Router,public db:DbService,private modalCtrl:ModalController,private changedetect:ChangeDetectorRef,private location:Location) {  }

  ngOnInit() {
    this.db.ismobile = this.db.checkmobile();
    // console.log(this.item)
  }

  @HostListener('window:resize', ['$event'])
  private func(){
     this.db.ismobile = this.db.checkmobile();
  }

  get_category(value){
    let data = value
    this.get_category_values(data.menu,data.item);
  }

  async get_category_values(menu,item){

    if(this.selected_menu){
   
    if(this.selected_menu.name != menu.name){
      this.page_no = 1;
      this.no_products = false;
      this.scroll_to_Top.emit();
      this.selected_menu = menu;
      // await loader.present();
    }else{
      this.selected_menu = menu;
    }

   }else{
    this.selected_menu = menu;
    // await loader.present();
   } 


    
   


   let data={
    page_route : this.page_route,
    linked_doc : menu.name,
    page_no: this.page_no,
    page_size: 20
   }

   this.db.get_page_side_menu_data(data).subscribe(res=>{
    
    // console.log(res)
 
    if (res.message && res.message.length != 0) {
      if(this.page_no == 1){
        item.list_content =  res.message;
        // loader.dismiss();
      }else {
        item.list_content = [...item.list_content,...res.message];
        // loader.dismiss();
      }
   }else {
     this.no_products = true;
     this.page_no == 1 ?  item.list_content = [] : null;
    //  loader.dismiss();
    //  this.scroll_to_Top.emit();
    }
   })

  }


  loadData(data,item) {
    // console.log(this.no_products)
    if(!this.no_products){
      this.page_no = this.page_no + 1;
      this.get_category_values(this.selected_menu,item);
    }
    setTimeout(()=>{ data.target.complete() },400);
  }
  


}

