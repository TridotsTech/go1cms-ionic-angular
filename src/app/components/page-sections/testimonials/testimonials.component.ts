import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements OnInit {
  @Input() item;
  @ViewChild('testimonialSix') slides: IonSlides;
  @ViewChild('testimonialFive') slideFive: IonSlides;
  @ViewChild('testimonialThree') slideFour: IonSlides;
  constructor(public db:DbService) { }
  ngOnInit() {
    }
    swipe_next(){
      // console.log(this.slideSix);
      this.slides.slideNext();  
    }
    swipe_back(){
      // console.log(this.slideSix);
      this.slides.slidePrev();
    }
    slideFive_back(){
      this.slideFive.slidePrev()
    }
    slideFive_next(){
      this.slideFive.slideNext()
    }

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

  web_slider_one = {
    // freeMode: true,
    initialSlide: 1,
    slidesPerView: 3,
    speed: 400,
    loop: true,
    // centeredSlides: true,
    autoplay: {
      delay:8000,
      disableOnInteraction: false
    },
   }
   web_slider_two = {
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

}
