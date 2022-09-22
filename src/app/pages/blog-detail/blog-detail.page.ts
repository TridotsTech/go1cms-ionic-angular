import { DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbService } from 'src/app/services/db.service';
import { environment } from 'src/environments/environment';

import { ModalController } from '@ionic/angular';

import { CommentsPage } from '../comments/comments.page';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.page.html',
  styleUrls: ['./blog-detail.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogDetailPage implements OnInit {

  @ViewChild('scrollContent') scroll:ElementRef;
  route_value;
  blog_details_array;
  scrollable=true;
  left_arrow = false;
  arrow=true;
  blog_category_list;
  share_url;
  constructor(private route:ActivatedRoute,public db:DbService,private datepipe:DatePipe,private modalCtrl:ModalController) {
    // this.share_url ="https://"+environment.app_config.live_url+"/"+location.pathname
  }


  ngOnInit() {
    // console.log(this.db.blog_list);
    this.db.ismobile = this.db.checkmobile();
    this.route.params.subscribe(res =>{
      // console.log(res);
      // console.log(res.route);
      this.route_value=res.route;
      this.blog_detail();
    })
    // get_category
    this.get_category();

    var textSample= " %2F A sentence with symbols &/ characters that have special meaning?";
    var uri = 'http://example.com/foo?hello=' + decodeURIComponent(textSample);
    // console.log('123456'+uri);
  }

  @HostListener('window:resize', ['$event'])
  private func(){
     this.db.ismobile = this.db.checkmobile();
  }

  blog_detail(){
    let data={
        "route":this.route_value
    }
      this.db.get_blog_details(data).subscribe(res=>{
            // console.log(res);
            // console.log(res.message);
           this.blog_details_array=res.message;
          //  console.log(this.blog_details_array);
      })
  }

  get_category() {
    this.db.get_blog_categories().subscribe((res) => {
      this.blog_category_list = res.message;
      // console.log(this.blog_category_list);
    });
  }

  changeDate(data){
    let temp = ''
    // date=new Date();  {{time.date | date:'MMM dd'}}
    let latest_date =this.datepipe.transform(data, 'dd');
    let html = latest_date.split('-')
    html.map(res => {
      temp = res
    })
    // console.log(temp)
    return temp
  }


    async comment_section(){
      const modal = await this.modalCtrl.create({
        component: CommentsPage,
        componentProps:{
          name : this.blog_details_array.blog_details.name
        }
      })
      await modal.present();
      let { data } = await modal.onWillDismiss();

     if(data && data.status == 'success') {
      // console.log(data.status);
      this.db.modal = false;
      this.blog_detail();
    }
  }

  breadcrumb(data){
  //   if(data='blog'){
  //     this.db.blog_list='';
  //   }
 }

 emitScroll(scroll, direction) {
  if (direction == 'right') {
    // console.log('right')
      this.scroll.nativeElement.scrollLeft += 550;
  } else if (direction == 'left') {
    // console.log('left')
    this.scroll.nativeElement.scrollLeft -= 550;
  }
}

scrolled(event){
  if(event.target.scrollLeft != 0){
    this.left_arrow = true;
  }else if(event.target.scrollLeft == 0){
    this.left_arrow = false;
  }
}


}

