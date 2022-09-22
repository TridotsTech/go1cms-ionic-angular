import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

import { DbService } from 'src/app/services/db.service';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-location-popup',
  templateUrl: './location-popup.component.html',
  styleUrls: ['./location-popup.component.scss'],
})
export class LocationPopupComponent implements OnInit {
  myform;
  autocompleteInput: string;
  pincodes=[];
  // selected_city;
  selected_pincode;

  @ViewChild('addresstext') addresstext: ElementRef;
  constructor(public db:DbService,public modalCtrl:ModalController,public router:Router,private ngzone:NgZone) { 
    this.db.scroll_event.desktop_header  = false;    
    this.selected_pincode = localStorage.zipcode ? localStorage.zipcode : '';
  }


  ngOnInit() {}


 
}
