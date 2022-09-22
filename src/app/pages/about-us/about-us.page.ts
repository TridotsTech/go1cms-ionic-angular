import {
  Component,
  OnInit,
} from '@angular/core';

import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  content_data;
  constructor(public db:DbService) {
    // this.db.scroll_event.desktop_header = false;
  }

  ngOnInit() {
    this.get_about('about-us');
    // this.get_about1('about-us');
  }

  ionViewWillLeave(){
    this.db.footer_info = (this.db.website_settings.default_footer && this.db.website_settings.default_footer.items) ? this.db.website_settings.default_footer.items : [];
    this.db.header_info = this.db.website_settings.default_header;
  } 


  get_about(page){
    var res={  application_type: this.db.ismobile?"mobile":"web", domain: this.db.domainurl,  route: page }
   this.db.get_mobile_homepage(res).subscribe(data => {
     this.content_data = data.message;
    
    if(data.message.footer_content){
      this.db.footer_info = data.message.footer_content.items;
    }
       
    if(data.message.header_content){
     this.db.header_info = data.message.header_content;
    // console.log('this.db.header_info',this.db.header_info)
    }else{
      this.db.header_info = this.db.website_settings.default_header;
    //  console.log('this.db.header_info',this.db.header_info)
    }

   }, error => {   console.log(JSON.stringify(error.json())); });
 }

//  get_about1(page){
//   var res={ page_route: page, domain: this.db.domain }
//   this.db.get_page_details(res).subscribe(data => {
//         this.content_data = data.message;
//       }, error => {
//         console.log(JSON.stringify(error.json()));
//     });
//  }


}
