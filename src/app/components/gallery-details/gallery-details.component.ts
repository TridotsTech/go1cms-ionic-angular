import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeOpenDetail, BeforeSlideDetail } from 'lightgallery/lg-events';
import lightGallery from 'lightgallery';
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
  VERSION,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-gallery-details',
  templateUrl: './gallery-details.component.html',
  styleUrls: ['./gallery-details.component.scss'],
})
export class GalleryDetailsComponent implements OnInit {

  @Input() item;
  @Input() scrollable;
  @Input() data;
  @ViewChild('scrollable_cnt') scrollable_cnt:ElementRef;
  @ViewChild('left_arrow') left_arrow:ElementRef;
  @ViewChild('right_arrow') right_arrow:ElementRef;

  constructor(public db:DbService) { }

  ngOnInit() {
  }

  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    // console.log(index, prevIndex);
  };
  

  name = "Angular " + VERSION.major;
  settings = {
    counter: false,
    plugins: [lgZoom],
    mobileSettings: {
      controls: true,
      showCloseIcon: true,
      download: true,
      rotate: true
    },
  };
  
  
  scroll(direction){
    // let d =  document.getElementById(id);
    let d = this.scrollable_cnt['_elementRef'].nativeElement;
    if (direction == 'prev') {  
      // d.scrollLeft -= 250;
        d.scrollLeft -= 650;
        
    } else if (direction == 'next') {
      // d.scrollLeft += 250;
       d.scrollLeft += 650;
    }
  }


  scrolled(event){
    this.scrollable_cnt['_elementRef'].nativeElement.offsetWidth + this.scrollable_cnt['_elementRef'].nativeElement.scrollLeft == this.scrollable_cnt['_elementRef'].nativeElement.scrollWidth ? this.right_arrow.nativeElement.classList.add('hiding') : this.right_arrow.nativeElement.classList.remove('hiding')
    this.scrollable_cnt['_elementRef'].nativeElement.scrollLeft == 0 ? this.left_arrow.nativeElement.classList.add('hiding') :  this.left_arrow.nativeElement.classList.remove('hiding')
  }

}
