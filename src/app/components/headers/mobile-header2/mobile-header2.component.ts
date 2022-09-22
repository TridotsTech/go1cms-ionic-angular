import {
  Component,
  OnInit,
} from '@angular/core';

import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-mobile-header2',
  templateUrl: './mobile-header2.component.html',
  styleUrls: ['./mobile-header2.component.scss','./../mobile-header/mobile-header.component.scss'],
})
export class MobileHeader2Component implements OnInit {

  constructor(public db:DbService) { }

  ngOnInit() {

  }



}
