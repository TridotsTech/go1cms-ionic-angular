import { Component, OnInit, Input, ViewChild,Output, EventEmitter } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['../page-builder/page-builder.component.scss','./sliders.component.scss'],
})
export class SlidersComponent implements OnInit {
  @Input() item;
  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild(IonSlides) test_slides: IonSlides;
  @Output() redirect_next_page = new EventEmitter();
  constructor(public db:DbService) { }

  ngOnInit() {}


  slideOpts = {
    // initialSlide: 1,
    speed: 1000
  };
  mobile_slider = {
    // freeMode: true,
    // slidesPerView: this.db.ismobile? 1.2 : 1,
    spaceBetween: 1 ,
    speed: 400,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
  }

  web_slider = {
    // freeMode: true,
    initialSlide: 1,
    speed: 400,
    loop: true,
    // centeredSlides: true,
    autoplay: {
      delay:8000,
      disableOnInteraction: false
    },
  }

  slidePrev() {
    // console.log('nnkn1c',this.slides.slidePrev())
    this.slides.slidePrev();
  }

  slideNext() {
    // console.log('nnknc',this.slides)
    this.slides.slideNext();
  }

  test_slidePrev() {
    // console.log('nnknc',this.test_slides)
    this.test_slides.slidePrev();
  }

  test_slideNext() {
    // console.log('nnknc',this.test_slides)
    this.test_slides.slideNext();
  }

  jsonparse(){
           
  }

}
