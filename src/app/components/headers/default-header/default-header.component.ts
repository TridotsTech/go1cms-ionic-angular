import { Component, OnInit,Output,Input,EventEmitter } from '@angular/core';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['../web-header/web-header.component.scss','./default-header.component.scss'],
})
// '../secondary-header/secondary-header.component.scss'
export class DefaultHeaderComponent implements OnInit {

  drop_down2 = false;
  // @Output() openModal = new EventEmitter();
  @Output() cart_pop = new EventEmitter();
  @Input() web_header;
  @Input() sub_list_color;
  @Input() menu;
  constructor(public db: DbService) { }

  ngOnInit() {
    // console.log(this.sub_list_color)
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
