import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { IonContent } from '@ionic/angular';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-page-builder',
  templateUrl: './page-builder.page.html',
  styleUrls: ['./page-builder.page.scss'],
})
export class PageBuilderPage implements OnInit {
  content_data:any;
  internship:any = '';
  route_value;
  // sub_header_data;
  @ViewChild(IonContent) content:IonContent;

  constructor(public route :ActivatedRoute,public db:DbService) { 
    this.route.params.subscribe(res => {
      this.get_about(res.page_route);
      this.route_value = res.page_route
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


  get_about(page){
    var res={  application_type: this.db.ismobile?"mobile":"web", domain: this.db.domainurl,  route: page }
    this.db.get_mobile_homepage(res).subscribe(data => 
      {
        
        this.content_data = data.message.page_content;
        this.db.sub_header_data = data.message.sub_header;
        this.db.check_header_footer(this.content_data,data);
        
      
      }, 
      error => {
        console.log(JSON.stringify(error.json())); 
      });
    }
  }
