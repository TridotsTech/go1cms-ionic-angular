import {
  DatePipe,
  Location,
} from '@angular/common';
import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbService } from 'src/app/services/db.service';

import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.page.html',
  styleUrls: ['./blog-list.page.scss'],
})
export class BlogListPage implements OnInit {
  // all_blog_category_list;
  blog_data = []
  blog_category_list;
  page_no = 1;
  blog_list_name = '';
  no_products = false;
  id = '';

  @ViewChild(IonContent)  content:IonContent;
  constructor(public db: DbService,private location: Location,private datepipe: DatePipe,private route: ActivatedRoute) {

  }


  ngOnInit() {
    this.db.ismobile = this.db.checkmobile();
    this.get_category();
    this.route.params.subscribe((res) => {
        this.page_no = 1;
        this.id = res.id;
        this.get_blogHome();
    });

  }


  get_blogHome(){
    let data = {  page_no: this.page_no,  page_size: 9,  };

    this.id ? data['category'] = this.id : null

    this.db.get_all_blog_list(data).subscribe((res) => {
      if (res.message && res.message.length != 0) {
        this.no_products = false;

         if(this.page_no == 1){
              this.blog_data =  res.message;
          }else {
              this.blog_data = [...this.blog_data,...res.message];
          }

        }else {
          this.no_products = true;
          this.page_no == 1 ? this.blog_data = [] : null
        }
    });
  }


  loadData(data) {
    if (!this.no_products) {
        this.page_no = this.page_no + 1;
        this.get_blogHome();
    }
    setTimeout(() => {  data.target.complete(); }, 400);
  }


  get_category() {
    this.db.get_blog_categories().subscribe((res) => {
      this.blog_category_list = res.message;
      // console.log(this.blog_category_list);
    });
  }

  breadcrumb(child) {
    if ((child = 'blog')) {
      this.id = undefined;
      this.content.scrollToTop(400)
      this.location.replaceState('/blog-list');
      this.page_no = 1
      this.get_blogHome();
    }
  }


  blogby_category(data){
    this.id = data;
    this.content.scrollToTop(400)
    this.location.replaceState('/blog-list/' + data);
    this.page_no = 1
    this.get_blogHome();
  }

  
  @HostListener('window:resize', ['$event'])
  private func() {
    this.db.ismobile = this.db.checkmobile();
  }


  changeDate(data) {
    let temp = '';
    // date=new Date();  {{time.date | date:'MMM dd'}}
    let latest_date = this.datepipe.transform(data, 'dd');
    let html = latest_date.split('-');
    html.map((res) => {
      temp = res;
    });
    // console.log(temp)
    return temp;
  }

  

  // getBlog() {
  //   let data = {  page_no: this.page_no,  page_size: 9,  };
  //   this.db.get_all_blog_list(data).subscribe((res) => {
  //     if (res.message && res.message.length != 0) {
  //        if(this.page_no == 1){
  //             this.all_blog_category_list =  res.message;
  //           }else {
  //              res.message.map( d => {  this.all_blog_category_list.push(d); });
  //           }
  //       }else {
  //           this.no_products = true;
  //           // if(this.page_no == 1){
  //           //   this.cat_products = []
  //           // }
  //       }
  //   });
  //   this.id = '';
  // }

  
  // get_category_values(name) {
  //   this.no_products = false;
  //   // console.log('this.all_blog_category_list',this.all_blog_category_list)
  //   if (this.id != name || this.id == '') {
  //     this.page_no = 1;
  //   }
  //   let data = {
  //     category: name,
  //     page_no: this.page_no,
  //     page_size: 9,
  //   };
  //   //  this.blog_list_name=name;
  //   this.db.get_all_blog_list(data).subscribe((res) => {
  //     if (res.message && res.message.length != 0) {
  //       if(this.page_no == 1){
  //            this.all_blog_category_list =  res.message;
  //           //  console.log('this.all_blog_category_list',this.all_blog_category_list)
  //          }else {
  //             res.message.map( d => {  this.all_blog_category_list.push(d); });
  //          }
  //      }else {
  //       this.no_products = true;
  //       this.all_blog_category_list =  res.message;
  //       // console.log('this.all_blog_category_list',this.all_blog_category_list)
  //       // if(this.page_no == 1){
  //       //   this.cat_products = []
  //       // }
  //   }
  //     // this.all_blog_category_list = res.message;
  //     // console.log(this.all_blog_category_list);
  //   });
  //   
  //   // this.db.blog_list=name;
  //   this.id = name;
  // }





  // loadData(data) {
  //   // console.log('loaded datas scrolled');
  //   if (!this.no_products) {
  //     if (this.id == '') {
  //       this.page_no = this.page_no + 1;
  //       this.getBlog();
  //     } else if (this.id != '') {
  //       this.page_no = this.page_no + 1;
  //       this.get_category_values(this.id);
  //     }
  //   }
  //   setTimeout(() => {
  //     data.target.complete();
  //   }, 400);
  // }



    
//   if (res.message && res.message.length != 0) {
//     if(this.page_no == 1){
//       this.cat_products =  res.message;
//     }else {
//        res.message.map( d => {  this.cat_products.push(d);  });
//     }
//   this.get_cart_item();
// } else {
//   this.no_products = true;
//   if(this.page_no == 1){
//     this.cat_products = []
//   }
// }

}
