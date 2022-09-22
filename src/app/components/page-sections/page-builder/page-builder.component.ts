import { Location } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationExtras,
  Router,
} from '@angular/router';

import { DbService } from 'src/app/services/db.service';

import {
  AlertController,
  IonContent,
  IonDatetime,
  IonSlides,
  ModalController,
  NavController,
  Platform,
} from '@ionic/angular';
import { TestimonialsviewComponent } from '../../testimonialsview/testimonialsview.component';


@Component({
  selector: 'app-page-builder',
  templateUrl: './page-builder.component.html',
  styleUrls: ['./page-builder.component.scss'],

  // 'assets/css/page-component.scss','./page-builder.component.scss'
})
export class PageBuilderComponent implements OnInit {

  focus : any = {};
  left_arrow = false;
  @ViewChild('scrollContent') scroll:ElementRef;
  @Input() viewContent;
  @Input() about_us;
  // @Input() cat_products;
  emailform :FormGroup;

  @Input() internship;
  @Input() home;
  @ViewChild(IonContent) private content: IonContent;
  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild(IonSlides) test_slides: IonSlides;
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  birthday_info:any={};
  submitted = false;
  video;
  month_list:any=[{name:'January'},{name:'February'},{name:'March'},{name:'April'},{name:'May'},{name:'June'},{name:'July'},{name:'August'},{name:'September'},{name:'October'},{name:'November'},{name:'December'}]
  
  slideOpts = {
    // initialSlide: 1,
    speed: 1000
  };
  child = [];
  sub_child;
  childCategory;
  constructor(public db:DbService,public navCtrl:NavController,private alertCtrl:AlertController,private platform:Platform,private modalCtrl:ModalController,
    private location:Location,private route:ActivatedRoute,private formBuilder:FormBuilder,private router:Router,public sanitizer: DomSanitizer) {
    // this.db.scroll_event.desktop_header = true;
    // this.birthday_info.month = 'January';s
    this.db.ismobile = this.db.checkmobile();
   }

   url:any

  ngOnInit() {



    this.route.params.subscribe(res => {
      this.db.header_menu = '/p/'+(res.page_route);
    })
    // this.db.mycart_emit.subscribe(res => {
    //   console.log("cart emitted",res)
    //   res == 'getted' ? this.get_recommeded() : null 
    // })

    if(location.pathname == '/about-us'){
      this.url = location.pathname
    }
    else{
      this.url = location.pathname.split('/')[2]
    }
    
    // console.log(this.viewContent);
    // console.log('homeeeee if2',this.db.location)
    // this.viewContent = []
    this.db.ismobile = this.db.checkmobile();
    this.emailform = this.formBuilder.group({
      email : new FormControl('',[Validators.required,Validators.email]),
      birth_date : new FormControl((''),[Validators.required]),
      month: new FormControl((this.birthday_info.month || ''), Validators.required)
      // month : new FormControl('',[Validators.required])
    })

    // this.viewContent.map(res =>{
    //   if(res.btn != undefined || res.btn != null){
    //     res.btn ? res.btn_text = JSON.parse(res.btn):'';
    //     console.log('dkasmdka',res)
    //   }
    // })
    // setTimeout(()=>{this.category_tabs_auto_select();},1000);
  }
  ngAfterViewInit(){
    this.scrollTrigger('.animate');
 }

scrollTrigger(selector){
 let els
 els = document.querySelectorAll(selector)
 els = Array.from(els)
 els.forEach(el => {
     this.addObserver(el)
 })
}

Animation(){
  // this.viewContent.map(res =>{
    // if(res.section_type == 'Static Section' && res.section_name =='Sub Header'){
      // console.log("SAMple")
      this.router.navigateByUrl('/home');
      this.scrollTrigger('.animate');
      location.reload(); 
    // }
  // })
}

addObserver(el){ 
 if(!('IntersectionObserver' in window)){
     el.target.classList.add('active');
 }
 let observer = new IntersectionObserver((entries, observer) => {
     entries.forEach(entry => {
         if(entry.isIntersecting){
          entry.target.classList.add('active')
          observer.unobserve(entry.target)
         }
     })
 })
 observer.observe(el)
}


  sanitize_url(data){
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+ data);
  }

  sanitaize_html(data){
    return this.sanitizer.bypassSecurityTrustHtml(data);
  }

  sanitaize_css(data){
    return this.sanitizer.bypassSecurityTrustStyle(data);
  }


  

  // scrolled(event){
  //   if(event.target.scrollLeft != 0){
  //     this.left_arrow = true;
  //   }else if(event.target.scrollLeft == 0){
  //     this.left_arrow = false;
  //   }
  // }

  @HostListener('window:resize', ['$event'])
  private func(){
    this.db.ismobile  = this.db.checkmobile();
  }

  get email(){
    return this.emailform.get('email')
  }

  get birth_date(){
    return this.emailform.get('birth_date')
  }

  get month(){
    return this.emailform.get('month')
  }


  ionViewDidLeave() {
  }

  ionViewWillUnload(){
  }

  ionViewWillEnter() {
    // this.db.childs = {};
    this.submitted = false;
    this.email.setValue('');
    this.month.setValue('January');
    this.birth_date.setValue('')
    this.content.scrollToTop();
  }


  // slideOpts = {
  //   // freeMode: true,
  //   slidesPerView: 1.3,
  //   spaceBetween: 10,
  //   speed: 400,
  //   loop: true,
  //   centeredSlides: true,
  //   autoplay: {
  //     delay: 1700,
  //     disableOnInteraction: false
  //   },
  //   navigation : true
  // }

  
  testimonial_slides_autoplay_none = {
    // freeMode: true,
    slidesPerView: 2,
    spaceBetween: 8,
    speed: 100,
    loop: true,
    // centeredSlides: true,
    autoplay: {
      delay: 1700,
      disableOnInteraction: false
    },
  }


  testimonial_slide = {
    // freeMode: true,
    slidesPerView: 4,
    spaceBetween: 8,
    speed: 400,
    loop: true,
    // centeredSlides: true,
    autoplay: {
      delay: 30000,
      disableOnInteraction: false
    },
  }

  testimonial_slide_mobile ={
    // freeMode: true,
    slidesPerView: 1,
    spaceBetween: 8,
    speed: 400,
    loop: true,
    // centeredSlides: true,
    autoplay: {
      delay: 30000,
      disableOnInteraction: false
    },
  }

  async view_data(data){
    // console.log(data.view)
      const modal = await this.modalCtrl.create({
        component :TestimonialsviewComponent,
        cssClass: 'testimonials-popup',
        componentProps:{
          datas : data,
        }
      })
      this.db.modal = true;
      // this.modal_popup = false;
      await modal.present(); 
  }
  

    //addtocart
    // async addtocart(value) {
    //   // console.log(value)
    //   !value.ids ? (value.ids ='' ,value.selected_attribute ='') : null
    //   value.product_attributes && value.product_attributes.length != 0 ?   this.router.navigateByUrl('/pr/'+value.route) : this.db.addtocart(value)
    // }

    // async removetocart(value) {
    //   !value.ids ? (value.ids ='' ,value.selected_attribute ='') : null
    //   value.product_attributes && value.product_attributes.length != 0 ?   this.router.navigateByUrl('/pr/'+value.route) :this.db.removetocart(value)
    // } 

    
    // birthday_club(){
    //   this.submitted = true;
    //   if(this.emailform.status == 'VALID'){
    //   if(Number(this.emailform.value.birth_date) > 0 && Number(this.emailform.value.birth_date) < 32){
    //     let data = { email: this.emailform.value.email , domain: this.db.domain  }
    //       this.db.check_birthdayclub(this.emailform.value.email).subscribe(res=>{
    //         if(res.data && res.data.length != 0 && res.data[0].name){
    //             this.inert_birthday_club();
    //         } else {
    //              this.db.alert('We could not find your email with our system.Please register as customer in meatton and then try to register as birthday club member.');
    //         }
    //       })
    //     }  else{
    //       this.db.alert('Birth Date value must be less than or equal to 31')
    //     }
    //     // this.db.insert_email_subscription(data).subscribe(res =>{
    //     //   this.db.alert(res.message);
    //     // })
    //   }
    // }

    // get_recommeded(){
    //   // console.log("view content ",this.db.viewContent)
    //   if(this.db.viewContent && this.db.viewContent.length != 0){
    //       this.db.viewContent.map(res => {
    //         if (res.data && res.data.length != 0 && (res.section_type == 'Lists' || res.section_type == 'Predefined Section' || res.section_type == 'Custom Section') ) {
    //           res.data.map(r => {
    //             r.temp_disabled = true;
    //             r.count = this.db.checkcart(r.name);
    //             r.wish_count = this.db.checkWishCart(r.name);
    //             r.temp_disabled = false;
    //           })
    //         }
    //       })
    //   }
    // }

    // addtowish(value){
    //   if(value.wish_count != 0){
    //     this.db.removewish(value)
    //   } else if(value.wish_count == 0){
    //     if(value.product_attributes.length == 0) {
    //       this.db.addtowish(value);
    //     } else {
    //       this.db.ismobile? this.router.navigateByUrl('/pr/'+value.route) : this.router.navigateByUrl('/pr/'+value.route)
    //         // this.db.ismobile? this.router.navigateByUrl('/pr/'+value.route) : this.openQuickView(value)
    //       // this.product_detail.ids ?   this.db.addtowish(value) : this.db.alert_animate.next("Please select attributes..!")
    //     }
    //   }
    // }

    // inert_birthday_club(){
    //   // console.log(this.emailform.value)
    //   // let formData = {};
    //   // formData.doctype = "BirthDay Club Member"
    //   // formData.day = $('#birth_date').val();
    //   // formData.month = $('#birth_month').val();
    //     // formData.email = $('#birth_email').val();
    //   //   let empty = this.dateValue.split(' ')
    //   // const d = new Date(this.dateValue);
    //   // const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    //   let data = {
    //       doctype : "BirthDay Club Member",
    //       email : this.emailform.value.email,
    //       day : this.emailform.value.birth_date,
    //       month : this.emailform.value.month,
    //   }
    //   let datas = { doc : data}
    //   this.db.inert_birthdayclub(datas).subscribe(res =>{
    //     if(res.message){
    //       this.db.alert("Congratulations Your a Birthday Club member..!")
    //     } else {
    //       var b = JSON.parse(res._server_messages);
    //       var b1 = JSON.parse(b);
    //        this.db.alert(b1.message);
    //     }
    //     // console.log(res);
    //   })
    // }

    // changeDate(data){
    //   let temp = ''
    //   let latest_date =this.datepipe.transform(data, 'dd');
    //   let html = latest_date.split('-')
    //   html.map(res => {  temp = res })
    //   return temp
    // }


    img_style(data, type) {
      if (type == 'color') {
        return { 'background': data };
      } else if (type == 'img') {
        return { 'background': 'url(' + this.db.product_img(data) + ')center center / 100% auto no-repeat', 'background-size': 'contain' };
      } else if (type == 'img-cover') {
        return { 'background': 'url(' + this.db.product_img(data) + ')center center / 100% auto no-repeat', 'background-size': 'contain' };
      }  else if (type == 'colorcode') {
        return { 'color': data };
      }else if (type == 'bgcolor') {
        return { 'background': data, 'color': data };
      } else if (type == 'full-bg-img') {
        return { 'background': 'url(' + this.db.product_img(data) + ')' };
      } else if (type == 'bg-image') {
        return { 'background' : 'url('+ this.db.product_img(data) +') no-repeat'};
      } else if (type == 'About-bg-image') {
        return { 'background' : 'url('+ this.db.product_img(data) +') no-repeat',"background-attachment": "fixed","background-position": "center","background-size": "cover"};
      } else if (type == 'full-bg-img__') {
        return { 'background' : 'url('+ this.db.product_img(data) +') no-repeat',"min-height": "160px","background-size": "cover","position":"relative"};
      }
    }



    // view_all(item){
    //   // console.log(item);
    //   let data={
    //     route:item
    //   }
    //   this.db.get_all_route(data).subscribe(res=>{
    //     // console.log(res);
    //     let data = res;
    //     // console.log(data.message.route_detail[0].route);
    //     if(data.message.type == 'Product'){}
    //         // this.navCtrl.push(ItemDescriptionPage, {item:data.message.route_detail[0], page:'home'})
    //       if(data.message.type == 'Product Category'){}
    //         // this.navCtrl.push(ProductlistPage, {item:data.message.route_detail[0], page:'home1'})
    //       if(data.message.type == 'Pages'){}
    //         // this.navCtrl.push(AddcarPage, {item:data.message.route_detail[0], page:'home'})
    //       if(data.message.type == 'Product Brand'){}
    //         // this.navCtrl.push(ProductlistPage, {item:data.message.route_detail[0], page:'home2'})
    //       if(data.message.type == 'Page Section'){this.viewall(data.message.route_detail[0].route)}
            
    //   })
    // }


    viewall(data){
      // console.log(data);
      let params: NavigationExtras = {
                queryParams: {'id': data},
               }
      this.navCtrl.navigateForward(['viewall'], params);
      // this.router.navigateByUrl('/viewall/'+data);
    }


    emitScroll(scroll, direction) {    
        if (direction == 'right') {
          this.scroll.nativeElement.scrollLeft += 610;
         } else if (direction == 'left') {
        this.scroll.nativeElement.scrollLeft -= 610;
         }   
    }

  redirect_next_page(routUrl){
    // console.log(routUrl);
    if(routUrl != ''){
      this.db.get_all_route( {'route' : routUrl }).subscribe((res)=>{
        // console.log(res,"response");
        if(res && res.message.type == 'Product Category'){
            this.db.ismobile ? this.router.navigateByUrl('/c' + '/' +routUrl) :this.router.navigateByUrl('/c'+ '/' + routUrl);
            // console.log(routUrl)
        }else if(res && res.message.type == 'Product'){
            this.db.ismobile ? this.router.navigateByUrl('/pr'+ '/'+routUrl) :this.router.navigateByUrl('/pr'+ '/'+routUrl);
        } else if(res && res.message.type == 'Pages'){
          // this.db.ismobile ? this.router.navigateByUrl('/pr'+routUrl) :this.router.navigateByUrl('/pr'+routUrl);
        }else if(res && res.message.type == 'Product Brand'){
          this.db.ismobile ? this.router.navigateByUrl('/brands'+'/'+routUrl) :this.router.navigateByUrl('/brands'+'/'+routUrl);
        }else if(res && res.message.type == 'Page Section'){
          this.viewall(routUrl)
        } else {
          this.router.navigateByUrl(routUrl)
        }
    },(err) =>{ })
   } else {
    this.router.navigateByUrl(routUrl)
   }
  }


  go_via_route(route){
    // console.log(route)
    !this.db.ismobile ? this.router.navigateByUrl('/c/'+route):this.router.navigateByUrl('/c/'+route);
  }

  navigate_details_page(item){
    this.router.navigateByUrl('/detail/'+item.name)
  }

  // setTimeout(() => { alert('Hello') }, 1000)
  // setTimeout(()=>{      
  // async open_video() {
  //   let modal = await this.modalCtrl.create({
  //     component: VideoPopupComponent,
  //     cssClass: "video_popup",
  //     componentProps: {
  //         youtube_id: "pjAPUWV1ds8"
  //     }
  //  });
  // //  this.modal = true;
  //   await modal.present();
  //   let { data } = await modal.onWillDismiss();
  // }
// }, 1000);

  // category_tabs(product,name){
  //   // console.log(this.db.category);
  //   this.child = product.child;
  //   this.childCategory = name;
  // }

  // category_tabs_auto_select(){
  //   let c = 0;
  //   this.db.category.map(res => {
  //     if(res.child.length != 0 && c==0){
  //       this.child = res.child;
  //       // console.log("SELECTED",this.child);
  //       this.childCategory = res.name; 
  //       c++;
  //     }
  //   }) 
  // }

  // web_slider = {
  //   // freeMode: true,
  //   pagination: true,
  //     initialSlide: 1,
  //   slidesPerView: 3,
  //   speed: 400,
  //   loop: true,
  //   centeredSlides: true,
  //   // autoplay: {
  //   //   delay:8000,
  //   //   disableOnInteraction: false
  //   // },
  // }
  web_slider_one = {
   // freeMode: true,
   initialSlide: 1,
   slidesPerView: 3,
   speed: 400,
   loop: true,
   // centeredSlides: true,
   autoplay: {
     delay:8000,
     disableOnInteraction: false
   },
  }

  // section_2=[
  //   {'title':'Frequently asked questions','sub_title':'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.','show':true},
  //   {'title':'Do your applications support timestamps?','sub_title':'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.','show':false},
  //   {'title':'Lorem Ipsum is simply dummy','sub_title':'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.','show':false}
  // ]

  // section_1=[
  //   {'title':'Frequently asked questions','sub_title':'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.','show':true},
  //   {'title':'Do your applications support timestamps?','sub_title':'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.','show':false},
  //   {'title':'Lorem Ipsum is simply dummy','sub_title':'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.','show':false},
  //   {'title':'How is data security addressed in Affirm?','sub_title':'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.','show':false},
  //   {'title':'How long does it take to extract invoice data ?','sub_title':'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.','show':false},
  //   {'title':'How is the demo account, ie the free trial account?','sub_title':'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.','show':false}
  // ]
  

  // plan_details = [
  //   {"name": "1 month Plan","price":"69","billing_interval":"Month","icon":"", "features":[{"features":"Priority Customer Support"},{"features":"Priority Customer Support"}]},
  //   {"name": "1 month Plan","price":"69","billing_interval":"Month","icon":"", "features":[{"features":"Priority Customer Support"},{"features":"Priority Customer Support"}]},
  //   {"name": "1 month Plan","price":"69","billing_interval":"Month","icon":"", "features":[{"features":"Priority Customer Support"},{"features":"Priority Customer Support"}]}
  //  ]
  //  pricing_plan = [
  //   {"name": "Basic","price":"69","billing_interval":"Month","sub_title":"Most Papular",
  //    "features":[{"features":"Priority Customer Support"},{"features":"Priority Customer Support"},{"features":"Priority Customer Support"},{"features":"Priority Customer Support"}]},
  //   {"name": "Professional","price":"69","billing_interval":"Month","sub_title":"Most Papular",
  //    "features":[{"features":"Priority Customer Support"},{"features":"Priority Customer Support"},{"features":"Priority Customer Support"},{"features":"Priority Customer Support"}]},
  //   {"name": "Enterprise","price":"69","billing_interval":"Month","sub_title":"Most Papular",
  //    "features":[{"features":"Priority Customer Support"},{"features":"Priority Customer Support"},{"features":"Priority Customer Support"},{"features":"Priority Customer Support"}]}
  //  ]
  //  plan_for = [
  //   {"name": "Intro","price":"69","billing_interval":"Month","sub_title":"Most Papular",
  //    "features":[{"features":"Priority Customer Support"},{"features":"Priority Customer Support"},{"features":"Priority Customer Support"},{"features":"Priority Customer Support"}]},
  //   {"name": "Base","price":"69","billing_interval":"Month","sub_title":"Most Papular",
  //    "features":[{"features":"Priority Customer Support"},{"features":"Priority Customer Support"},{"features":"Priority Customer Support"},{"features":"Priority Customer Support"}]},
  //   {"name": "Popular","price":"69","billing_interval":"Month","sub_title":"Most Papular",
  //    "features":[{"features":"Priority Customer Support"},{"features":"Priority Customer Support"},{"features":"Priority Customer Support"},{"features":"Priority Customer Support"}]},
  //   {"name": "Enterprise","price":"69","billing_interval":"Month","sub_title":"Most Papular",
  //    "features":[{"features":"Priority Customer Support"},{"features":"Priority Customer Support"},{"features":"Priority Customer Support"},{"features":"Priority Customer Support"}]}
  //  ]
  //  flexible_plan = [
  //   {"name": "Personal","price":"299","billing_interval":"","icon":"", "features":[{"features":"Priority Customer Support"},{"features":"Priority Customer Support"},{"features":"Priority Customer Support"},{"features":"Priority Customer Support"}]},
  //   {"name": "Pro","price":"299","billing_interval":"","icon":"", "features":[{"features":"Priority Customer Support"},{"features":"Priority Customer Support"},{"features":"Priority Customer Support"},{"features":"Priority Customer Support"}]},
  //  ]


  //  brands = [
  //   {"brand_logo":"https://innila.tridotstech.com//files/ocrXbfxgUS41/innila-logo.png"},
  //   {"brand_logo":"https://cdn.gokommerce.com/innila/6Z45KFMM_Fairbee_logo-1.png"},
  //   {"brand_logo":"https://cdn.gokommerce.com/innila/6Z45KFMM_Fairbee_logo-1.png"},
  //   {"brand_logo":"https://innila.tridotstech.com//files/ocrXbfxgUS41/innila-logo.png"},
  //   {"brand_logo":"https://cdn.gokommerce.com/innila/6Z45KFMM_Fairbee_logo-1.png"},
  //   {"brand_logo":"https://innila.tridotstech.com//files/ocrXbfxgUS41/innila-logo.png"},
  //   {"brand_logo":"https://innila.tridotstech.com//files/ocrXbfxgUS41/innila-logo.png"},
  //   {"brand_logo":"https://cdn.gokommerce.com/innila/6Z45KFMM_Fairbee_logo-1.png"},
  //   {"brand_logo":"https://cdn.gokommerce.com/innila/6Z45KFMM_Fairbee_logo-1.png"},
  //   {"brand_logo":"https://innila.tridotstech.com//files/ocrXbfxgUS41/innila-logo.png"},
  //   {"brand_logo":"https://cdn.gokommerce.com/innila/6Z45KFMM_Fairbee_logo-1.png"},
  //   {"brand_logo":"https://innila.tridotstech.com//files/ocrXbfxgUS41/innila-logo.png"},
  //  ]
 
  
}
