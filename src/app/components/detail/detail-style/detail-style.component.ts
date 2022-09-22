import { Location } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

import { ModalController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-detail-style',
  templateUrl: './detail-style.component.html',
  styleUrls: ['./detail-style.component.scss'],
})
export class DetailStyleComponent implements OnInit {

  @Input() value;
  @Input() detail;
  share_url;
  constructor(public db:DbService) { }

  ngOnInit() {
    // console.log(this.dat
    this.share_url = this.db.baseUrl+"/"+location.pathname;
    // console.log(this.detail);
    // console.log(this.detail[0][this.data]);
  } 

}
