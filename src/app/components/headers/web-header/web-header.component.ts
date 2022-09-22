import {
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
  OnInit,
  Output,
  Input,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-web-header',
  templateUrl: './web-header.component.html',
  styleUrls: ['./web-header.component.scss'],
})
export class WebHeaderComponent implements OnInit {
 
  drop_down2 = false;
  // @Output() openModal = new EventEmitter();
  @Output() cart_pop = new EventEmitter();
  @Input() cat_products;
  @ViewChild('addresstext') addresstext: ElementRef;
  @ViewChild('dropdown2', { read :ElementRef}) dropdown2 : ElementRef;
  @Input() sub_header_value;

  constructor(public db:DbService,public zone: NgZone,public router:Router) { }

  ngOnInit() {
    // this.search_dropdown && this.search_productss.length != 0 && !this.search_dropdown.nativeElement.contains(event.target) ? (this.search_productss = [] , this.keyword ='') : null      
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

  redirect(){
    this.router.navigateByUrl('/');
    console.log(this.router.navigateByUrl('/'));
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
