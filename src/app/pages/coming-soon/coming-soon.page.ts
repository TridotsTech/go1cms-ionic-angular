import {
  Component,
  OnInit,
} from '@angular/core';

import { DbService } from 'src/app/services/db.service';
import $ from 'jquery';
@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.page.html',
  styleUrls: ['./coming-soon.page.scss'],
})
export class ComingSoonPage implements OnInit {

  constructor(public db:DbService) { }

  ngOnInit() {

  }
  // backbtn(){
    // this.back_route == '/home' ? this.navCtrl.navigateRoot('/home') : null
  // }
  // data=[{'v':'122'},{'v':'234'}]
}
