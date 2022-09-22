import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { DbService } from 'src/app/services/db.service';

import {
  MenuController,
  NavController,
} from '@ionic/angular';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
})
export class MobileHeaderComponent implements OnInit {
  @Input() back_route;
  @Input() no_home;
  @Input() no_cart;
  @Input() title;
  @Input() home;
  @Input() no_search_icon;
  constructor(public db:DbService,public menuCtrl:MenuController,private navCtrl: NavController) { }

  ngOnInit() {}

  openMenu() {
    this.menuCtrl.open();
  }

  backbtn(){
    this.back_route == '/' ? this.navCtrl.navigateRoot('/') : null
  }

}
