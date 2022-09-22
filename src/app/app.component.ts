import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  NgZone,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
} from '@angular/router';

import { App } from '@capacitor/app';
import { StatusBar } from '@capacitor/status-bar';
import {
  AlertController,
  MenuController,
  ModalController,
  Platform,
  PopoverController,
} from '@ionic/angular';

import { DbService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  path;
  tabs = false;
  modal_popup = true;
  added_animate = false;
  alert_animate = false;
  add_animatings: any = [];
  alert_animatings: any = [];
 
  @ViewChild('location_popups') location_popups :ElementRef;
  @ViewChild('overlay') overlay :ElementRef;
  constructor(public db:DbService,private router:Router,private platform:Platform,private modalCtrl:ModalController,private popupCtrl:PopoverController,private menuCtrl:MenuController,private zone: NgZone,@Inject(PLATFORM_ID) private platformId,private alertCtl:AlertController) {
  }

 

  ngOnInit() {

      // if(!document.getElementById('razorPayCheckout'))
      //   $.getScript("https://checkout.razorpay.com/v1/checkout.js", function() {})

      this.db.ismobile = this.db.checkmobile();
      this.db.get_website_settings();

    if(this.db.ismobile){
      if(this.platform.is('android')){
        // this.get_app_version()
      }

      this.platform.ready().then(res =>{
        if((this.db.ismobile || res == 'ios' || res == 'ipad' || res == 'iphone' || res == 'mobile' || res == 'tablet') && res != 'dom'){
          this.db.android = true;
          StatusBar.setBackgroundColor({color:'#000000'});
          this.platform.backButton.subscribe(() => {
            const url = this.router.url;

            if(url == '/tabs/category' || url == '/tabs/wishlist' || url == '/tabs/my-profile'){
                this.router.navigateByUrl('/mobile/home')
            } else if (url == "/home" || url == "/" || url == "/tabs/home") {
                  App.exitApp();
                // navigator['app'].exitApp();
            }

         })
        } 
     })
    } 


      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          this.path = event.url;
          this.db.path = event.url;
          // if(this.path == '/'){
          //   this.db.ismobile ? this.router.navigateByUrl('/tabs/home') : null
          // }
          if (this.path == '/' || this.path =='/home' || this.path == '/category' || this.path == '/wishlist' || this.path == '/my-profile' ) {
            this.tabs = true;
          } else {
            this.tabs = false;
          }   
          
  
        }
      });

  }

  
    @HostListener('window:resize', ['$event'])
    private func(){
      this.db.ismobile = this.db.checkmobile();
      let temp =  this.db.ismobile ? "mobile" : "web"
      if(temp != this.db.current_page_builder_data){
        
      }
    }
}


