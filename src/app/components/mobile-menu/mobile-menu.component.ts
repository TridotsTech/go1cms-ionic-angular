import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import {MenuController} from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent implements OnInit {
  showmore1 = false
  @Input() menu;
  constructor(public db:DbService,private router:Router,public menuCtrl:MenuController) { }

  ngOnInit() { 
    this.menu.map(rec =>{
      if(rec.section_name == "Header Menu" && rec.section_type == "Menu"){
        rec.menus.map(res =>{
          res.show = false;
          if(res.child_menu && res.child_menu.length != 0){
            res.child_menu.map(data =>{
              data.show =false;
              if(data.child_menu && data.child_menu.length != 0){
                data.child_menu.map(child_data =>{
                  child_data.show = false;
                })
              }
            })
          }
        })
      }
    })
  }

  click_menu(menu, index){
    if(menu.redirect_url && menu.redirect_url.indexOf('https') == 0)
    {
      window.open(menu.redirect_url)
    }
    else
      menu.child_menu && menu.child_menu.length != 0 ? menu.show = !menu.show  : this.router.navigateByUrl(menu.redirect_url)
    if(menu.child_menu && menu.child_menu.length != 0){
    }
    else{
      this.menuCtrl.enable(false);
      setTimeout(() => { 
        this.menuCtrl.enable(true)
      }, 1000);
    }
   
  }

  open_close(count,data){
    data.map((res,i)=>{
      if(i==count){
        res.show = res.show ? false : true;
      }else{
        res.show = false;
      }
    })
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
