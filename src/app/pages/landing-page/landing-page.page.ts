import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {

  content_data:any;
  scroll_top = false;
  @ViewChild(IonContent) content:IonContent;
  constructor(public db:DbService) { }

  ngOnInit() {
    this.get_about();
  }

  get_about(){
    var res={  application_type: this.db.ismobile?"mobile":"web", domain: this.db.domainurl,  route: "landing-page" }
    this.db.get_mobile_homepage(res).subscribe(data => 
      {
        this.content_data = (data.message.page_content) || (data.message.list_content);
        this.db.sub_header_data = data.message.sub_header;
        this.db.check_header_footer(this.content_data,data);
      }, 
      error => {
        console.log(JSON.stringify(error.json())); 
      });
  }

  ionViewWillEnter(){
    this.content.scrollToTop(400);
    this.db.header_checking();
  }

  scrollToTop() {
    this.content.scrollToTop(400);
  }

  @HostListener('ionScroll', ['$event']) onScroll(event){
    if(event.detail.scrollTop > 0){
      this.scroll_top = true;
    }
    else{
      this.scroll_top = false;
    }
  }



}
