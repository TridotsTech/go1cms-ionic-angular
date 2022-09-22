import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent implements OnInit {
  showmore1 = false
  @Input() menu;
  constructor(public db:DbService,private router:Router) { }

  ngOnInit() { 
    
  }
  
  show_more(){
    this.showmore1 = !this.showmore1;
  }

  policy =[  
    {
      title: 'About us',
      route:'/p/about-us',
      icon: '/assets/icon/about.svg',
      enable: 1
    },
    {
      title: 'Terms & conditions',
      route:'/terms-condition',
      icon: '/assets/icon/terms.svg',
      enable: 1
    },
    {
      title:'Privacy Policy',
      route:'/privacy-policy',
      icon: '/assets/icon/privacy-policy.svg',
      enable: 1
    },
    {
      title:'Cancellation Policy',
      route:'/cancellation-policy',
      icon: '/assets/icon/cancellation-policy.svg',
      enable: 1
    }
  ]

}
