import { Component, OnInit,Input } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

import {
  AlertController,
  IonContent,
  IonDatetime,
  IonSlides,
  ModalController,
  NavController,
  Platform,
} from '@ionic/angular';

@Component({
  selector: 'app-testimonialsview',
  templateUrl: './testimonialsview.component.html',
  styleUrls: ['./testimonialsview.component.scss'],
})
export class TestimonialsviewComponent implements OnInit {

  constructor(public modalCtrl:ModalController,public db:DbService) { }

  @Input() datas;

  ngOnInit() {
    // console.log(this.datas)
  }

}
