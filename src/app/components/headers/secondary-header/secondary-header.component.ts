import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-secondary-header',
  templateUrl: './secondary-header.component.html',
  styleUrls: ['./secondary-header.component.scss'],
})
export class SecondaryHeaderComponent implements OnInit {
  all_category = false;
  child_drop_down = true;
  product_drop_down = true;
  category_left_arrow = false;
  drop_down2 = false;
  @Output() cart_pop = new EventEmitter();
  // menu = false;
  // all_data;
  childs; //Second categories
  sub_childs;

  @Input() cat_products;

  @Input() css_hide;
  // @Input() topheader;
  @ViewChild('addresstext') addresstext: ElementRef;
  @ViewChild('dropdown2', { read :ElementRef}) dropdown2 : ElementRef;
  @ViewChild('category',{read:ElementRef}) category :ElementRef;
  @ViewChild('all_categories',{ read :ElementRef}) all_categories : ElementRef;
  @ViewChild('child_productdown', { read :ElementRef}) child_productdown : ElementRef;
  constructor(public db:DbService,private changedetect:ChangeDetectorRef) { }

  ngOnInit() {
    this.all_category = false;
  }

  hide_all_categories(event){
    const xTouch = event.clientX;
    const yTouch = event.clientY;
    const rect = this.all_categories.nativeElement.getBoundingClientRect();
    const topBoundary = rect.top + 2;
    const leftBoundary = rect.left + 2;
    const rightBoundary = rect.right - 2;
    const bottomBoundary = rect.bottom ;
    if (yTouch < bottomBoundary ) {
      this.all_category = false
    }
  }


  goto(route,child_no,type){
    if(child_no == 'child-1'){
        this.child_drop_down = false;
        this.db.childs.child_2_name = undefined
        this.db.childs.child_3_name = undefined
        if(type == 'click'){
          this.db.childs.child_1_name = route.category_name;
        }
        // this.db.childs.child_1 = route.route;
        // this.db.childs.child_2 = undefined
        // this.db.childs.child_3 = undefined
    } else if(child_no == 'child-2'){

       if(type == 'click'){
          this.db.childs.child_3 = undefined;
          this.db.childs.child_3_name = undefined;
          this.db.childs.child_2 = route.route;
          this.db.childs.child_2_name = route.category_name;
       }
      //  this.product_drop_down = false;

    }else if(child_no == 'child-3'){
      console.log("CHILD",route.route);
       this.db.childs.child_3 = route.route;
       this.db.childs.child_3_name = route.category_name;
    }

    if(route.default_view && type == 'click'){

      this.db.product_box.view = route.default_view;
      this.all_category = false;
    }

    // this.router.navigateByUrl('/category/'+route.route)
  }



  // goto_category(){
    
  // }



  hide_(event) {
    const xTouch = event.clientX;
    const yTouch = event.clientY;
    const rect = this.child_productdown.nativeElement.getBoundingClientRect();
    const topBoundary = rect.top + 2;
    const leftBoundary = rect.left + 2;
    const rightBoundary = rect.right - 2;
    const bottomBoundary = rect.bottom ;
    // console.log("x",xTouch);
    // console.log("y",yTouch);
    // console.log(rect)
    if (xTouch < leftBoundary || yTouch > bottomBoundary ) {
      this.product_drop_down = false
    }
  }

  scrolled(event){
    if(event.target.scrollLeft != 0){
      this.category_left_arrow = true;
    }else if(event.target.scrollLeft == 0){
      this.category_left_arrow = false;
    }
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

  checkOverflow (element) {
    return element.offsetHeight < element.scrollHeight ||  element.offsetWidth < element.scrollWidth;
  }

    
  scroll(direction){
    if (direction == 'next') {
        this.category.nativeElement.scrollLeft -= 350;
    } else if (direction == 'prev') {
        this.category.nativeElement.scrollLeft += 350;
    }
  }


  ngAfterContentChecked() {
    this.changedetect.detectChanges();
  }

  hide_dropdown2(event) {
    // console.log("working..")
    const xTouch = event.clientX;
    const yTouch = event.clientY;
    const rect = this.dropdown2.nativeElement.getBoundingClientRect();
    const topBoundary = rect.top + 2;
    const leftBoundary = rect.left + 2;
    const rightBoundary = rect.right - 2;
    if (xTouch < leftBoundary || xTouch > rightBoundary || yTouch < topBoundary) {
      this.drop_down2 = false;
    }
  }


  _menu = [
    {
      title: 'My Profile',
      route: '/my-profile/dashboard'
    },
    {
      title: 'My Orders',
      route: '/my-profile/my-orders'
    },
  ]

}
