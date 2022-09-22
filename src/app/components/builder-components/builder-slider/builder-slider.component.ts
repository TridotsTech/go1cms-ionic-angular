import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-builder-slider',
  templateUrl: './builder-slider.component.html',
  styleUrls: ['./builder-slider.component.scss'],
})
export class BuilderSliderComponent implements OnInit {
  @Input() row;
  @ViewChild(IonSlides) slides: IonSlides;
  constructor(public db:DbService) { }

  ngOnInit() {
    // this.row.data.data &&  JSON.parse(this.row.data.data);
  }
  img_style(data, type) {
    if (type == 'color') {
      return { 'background': data };
    } else if (type == 'img') {
      return { 'background': 'url(' + data + ')center center / 100% auto no-repeat', 'background-size': 'contain' };
    } else if (type == 'img-cover') {
      return { 'background': 'url(' + data + ')center center / 100% auto no-repeat', 'background-size': 'contain' };
    }  else if (type == 'colorcode') {
      return { 'color': data };
    }else if (type == 'bgcolor') {
      return { 'background': data, 'color': data };
    } else if (type == 'full-bg-img') {
      return { 'background': 'url(' + data + ')' };
    } else if (type == 'bg-image') {
      return { 'background' : 'url('+ data +') no-repeat'};
    } else if (type == 'About-bg-image') {
      return { 'background' : 'url('+ data +') no-repeat',"background-attachment": "fixed","background-position": "center","background-size": "cover"};
    } else if (type == 'full-bg-img__') {
      return { 'background' : 'url('+ data +') no-repeat',"min-height": "160px","background-size": "cover","position":"relative"};
    }
  }
  web_slider = {
    // freeMode: true,
    initialSlide: 1,
    slidesPerView: 1,
    speed: 400,
    loop: true,
    // centeredSlides: true,
    autoplay: {
      delay:8000,
      disableOnInteraction: false
    },
  }
  slidePrev() {
    this.slides.slidePrev();
  }
  
  slideNext() {
    this.slides.slideNext();
  }
  parse(data){
    return JSON.parse(this.row.data.data)
  }
}
