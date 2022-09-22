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
  selector: 'app-mobile-header3',
  templateUrl: './mobile-header3.component.html',
  styleUrls: ['./mobile-header3.component.scss'],
})
export class MobileHeader3Component implements OnInit {
  @Input() back_route;
  constructor(public db:DbService ,public menuCtrl:MenuController,private navCtrl: NavController) { }

  ngOnInit() {

  }

  openMenu() {
    this.menuCtrl.open();
  }

  backbtn(){
    this.back_route == '/' ? this.navCtrl.navigateRoot('/') : null
  }

}
