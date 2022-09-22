import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['../page-builder/page-builder.component.scss','./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  @Input() item;
  @ViewChild(IonSlides) slide:IonSlides;
  constructor(public db:DbService) { }

  ngOnInit() {}


  blog1_next(){

  this.slide.slideNext();

 }
 blog1_prev(){
  this.slide.slidePrev();
 }
  
 blog_slider_one={
  speed:400,
  slidesPerView: 4,
  spaceBetween: 12 ,
  allowTouchMove: false
 }

}
