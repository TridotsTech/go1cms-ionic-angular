import { ViewportScroller } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';

import { DbService } from 'src/app/services/db.service';

import {
  AlertController,
  MenuController,
  ModalController,
  NavController,
  Platform,
} from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() back_route;
  @Input() home;
  @Input() no_search_icon;
  @Input() no_home;
  @Input() no_cart;
  @Input() cat_products;
  @Input() title;
  @Input() search_btn;
  @Input() menu_btn;
  @Input() menu;
  @Input() desktop;
  @Input() top_header;
  @Input() sub_header_value;

  // @Input() modal;
  Top_header = false;
  containerActive:boolean;
  // @Output() openModal = new EventEmitter();
  @Output() cart_pop = new EventEmitter();
  // @Output() fetch_location = new EventEmitter();

 //My account drop down
  // drop_down3 = false; //Location drio down
 

  search_area = false;
  // ismobile;

  // change_location = false;




  // sub_category = false;
  // sub_sub_category = false;

  // list_height;

  scroll_icon = false



 
  // @ViewChild('mainproduct', { read :ElementRef}) mainproduct : ElementRef;
 
  
 
  
  // @ViewChild('location_dropdown') location_dropdownn :ElementRef;
  // @ViewChild('locations') locations :ElementRef;

  // autocompleteInput: string;
  
  // @Input() adressType: string;
 
 
  constructor(private menuCtrl: MenuController, private navCtrl: NavController, private platform: Platform, public db: DbService,private alertCtrl:AlertController,private router:Router,private modalCtrl:ModalController,private eRef:ElementRef,private renderer2: Renderer2,private scroller: ViewportScroller) {
    // this.renderer2.listen('window', 'click', (e: Event) => {
      // if ( (this.search_dropdown && this.search_dropdown.nativeElement.contains(e.target))  ) {
            // Clicked inside plus preventing click on icon
            // console.log("inside the area...")
        //  } else {
          // console.log("outside the area...")
      //  }
    // });
   }

  ngOnInit() {
    // console.log("outside the area...",this.sub_header_value);
    // if(this.db.path == '/'){
    //   this.Top_header = false;
    // }
    // this.db.video_header = this.top_header;
    // if(this.Top_header){
    //   this.db.video_header = true;
    // }else{
    //   this.db.video_header = false;
    // }
    this.db.ismobile = this.db.checkmobile();
    // this.drop_down3 =  true; 
  
  }






  // @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    // console.log(event);
    // if(this.db.locationpopup){
    //     this.db.locationpopup = false
    // }
//  }




  close_menu() {
    this.menuCtrl.close();
  }





  // hide_dropdown3(event) {
  //   // console.log("working..")
  //   this.search_area = false;
  //   const xTouch = event.clientX;
  //   const yTouch = event.clientY;
  //   const rect = this.location_container.nativeElement.getBoundingClientRect();
  //   const topBoundary = rect.top + 2;
  //   const leftBoundary = rect.left + 2;
  //   const rightBoundary = rect.right - 2;
  //   if (xTouch < leftBoundary || xTouch > rightBoundary || yTouch < topBoundary) {
  //     this.db.locationpopup = false;
  //   }
  // }


  // main_product(event){
  //   const xTouch = event.clientX;
  //   const yTouch = event.clientY;
  //   const rect = this.mainproduct.nativeElement.getBoundingClientRect();
  //   const topBoundary = rect.top;
  //   const leftBoundary = rect.left + 2;
  //   const rightBoundary = rect.right - 2;
  //   const bottomBoundary = rect.top;
  //   //     console.log("x",xTouch);
  //   // console.log("y",yTouch)
  //   // console.log(rect)
  //   if (yTouch < topBoundary) {
  //     this.product_drop_down = false;
  //   }
  // }







  @HostListener('window:resize', ['$event'])
  private func(){
     this.db.ismobile = this.db.checkmobile();
  }












  changelocation(){

  }

  currentlocation(){
    // this.db.locationpopup = false;
    // this.db.location = undefined;
    // (fetch_location)=""
    // this.fetch_location.emit();
    // this.db.current_locate()
  }




  // search_places(event){
  //   console.log(event.detail.value);
  //   this.db.search_places(event.detail.value).subscribe(res =>{
  //     console.log(res.results);
  //   })
  // }


  choosed_location(location){
    // console.log("TEsting...")
    // this.db.city = location;
    // this.db.locationpopup = false;
  }

  menu_categories =[

    // {
    //   text: 'Why Meatton',
    //   route: '/why'
    // },
    // {
    //   text: 'Our Story',
    //   route: '/story'
    // },
    {
      text: 'About Us',
      route: '/about-us'
    },
    {
      text : 'Contact Us',
      route:'/contact-us'
    }
  ]


  // searchproducts(d) {
  //   if (this.keyword != '' && this.keyword != undefined) {
  //     var data = { "searchTxt": this.keyword, page_no: 1, page_len: 15 }
  //     setTimeout( ()=>{
  //       this.db.search_products(data).subscribe(data => {
  //           // console.log(data)
  //           data && data.message && data.message.length != 0 ?   this.search_productss = data.message :    this.search_productss = [];
  //       }, error => {
  //         console.log(JSON.stringify(error.json()));
  //       });
  //     },100)

  //   } else {
  //       setTimeout( () => {  this.search_productss = [];},100)
  //   }

  // }


 async ngAfterViewInit() {
      // console.log(this.db.locationpopup)
      // if(this.db.locationpopup){
      // await  this.getPlaceAutocomplete('');
      // }
  }
  


   

  // invokeEvent(place: Object) {
  //   this.setAddress.emit(place);
  // }

   zip_code(zipcode){
      if(localStorage.zipcode && localStorage.zipcode == zipcode ){
          return true
      } 
    }

    // scrolled(event){
    //   let temp = document.getElementById(event.target.id)
    //   let child_r = document.getElementById(event.target.id)
    //   let child_l = document.getElementById(event.target.id)
    //   temp.offsetWidth + temp.scrollLeft == temp.scrollWidth ? child_r.classList.add('hide_r') : child_r.classList.remove('hide_r')
    //   temp.scrollLeft == 0 ? child_l.classList.add('hide_r') :  child_l.classList.remove('hide_r')
    // }

    // checkOverflow (element) {
    //   if(element){
    //     return element.offsetHeight < element.scrollHeight ||  element.offsetWidth < element.scrollWidth;
    //   } else {
    //     return false;
    //   }
    // }
  
    // scroll(direction,id){
    //   let d =  document.getElementById(id)
    //   if (direction == 'next') {  
    //     d.scrollLeft -= 250;
    //   } else if (direction == 'prev') {
    //     d.scrollLeft += 250;
    //   }
    // }


    vendor(value){
       if(value == "register"){
        //  this.db.register_vendor = true;
        this.router.navigateByUrl('/vendor-registration/register')
       }else if(value == "login"){
        // this.db.register_vendor = false;
        this.router.navigateByUrl('/vendor-registration/login')
       }
    }

//bala
    removeicon(){
  this.containerActive=true;
}

  }
  
