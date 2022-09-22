import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  content_data:any;
  internship:any = '';
  route_;

  @ViewChild(IonContent) content:IonContent;

  constructor(public route :ActivatedRoute,public db:DbService) { 
    this.route.params.subscribe(res => {
      if(res.page_route) {
        this.route_ = res.page_route;
        this.get_about(res.page_route);
      }

    })
  }

  ngOnInit() {}

  ionViewWillLeave(){
    this.db.header_info = this.db.website_settings.header_template;
    this.db.footer_info = (this.db.website_settings.footer_template && this.db.website_settings.footer_template.items) ? this.db.website_settings.footer_template.items : [];
  } 

  ionViewWillEnter(){
    this.content.scrollToTop(400);
    this.db.header_checking();
  }


  scroll_to_Top(){
    // console.log('hello');
    this.content.scrollToTop(400);
  }

  get_about(page){
    var res={  application_type: this.db.ismobile?"mobile":"web", domain: this.db.domainurl,  route: page }
    this.db.get_mobile_homepage(res).subscribe(data => 
      {
        this.content_data = data.message;
        this.db.check_header_footer(this.content_data.page_content,data);
      
        // if(data.message && data.message.footer_content){
        //   // this.db.footer_info = data.message.footer_content.items;
        //    this.db.footer_info =  data.message.footer_content;
        //    this.db.footer_info.layout_json =  JSON.parse(this.db.footer_info.layout_json);
        //    this.db.check_footer_layout();
        //   //  console.log(this.db.footer_info)
        // }else {
         
        //   if(this.db.website_settings && this.db.website_settings.footer_template){
        //     this.db.footer_info = this.db.website_settings.footer_template;
        //     this.db.footer_info.layout_json =  JSON.parse(this.db.footer_info.layout_json);
        //     this.db.check_footer_layout();
        //   }else{
        //     this.db.get_website_settings();
        //   }
          
        // }
           
        // if(data.message && data.message.header_content){
        //   this.db.header_info = data.message.header_content;
        //   // console.log('aklcasscalmc')
        // }else{

        //   if(this.db.website_settings && this.db.website_settings.header_template){
        //     this.db.header_info = this.db.website_settings.header_template;
        //   }else{
        //     this.db.get_website_settings();
        //   }
        // }

      
      }, 
      error => {
        console.log(JSON.stringify(error.json())); 
      });
    }
  }
