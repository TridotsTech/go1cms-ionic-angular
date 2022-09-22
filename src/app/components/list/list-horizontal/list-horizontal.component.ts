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

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-list-horizontal',
  templateUrl: './list-horizontal.component.html',
  styleUrls: ['../list-box/list-box.component.scss','./list-horizontal.component.scss'],
})
export class ListHorizontalComponent implements OnInit {

  @Input() list_value;
  @Input() row_count;
  @Input() scrollable;
  @Input() border_color;
  @ViewChild('scrollable_cnt') scrollable_cnt:ElementRef;
  @ViewChild('left_arrow') left_arrow:ElementRef;
  @ViewChild('right_arrow') right_arrow:ElementRef;
  @Input() arrow = true;

  constructor(private mc:ModalController,private router:Router,public db:DbService,private modalCtrl:ModalController,private changedetect:ChangeDetectorRef,private location:Location) {  }

  ngOnInit() {
    this.db.ismobile = this.db.checkmobile();
    this.db.product_box.row_count = this.row_count ? this.row_count : null;
  }

  @HostListener('window:resize', ['$event'])
  private func(){
     this.db.ismobile = this.db.checkmobile();
  }




  checkOverflow (element) {
    if(element){
      return element.offsetHeight < element.scrollHeight ||  element.offsetWidth < element.scrollWidth;
    } else {
      return false;
    }
  }


  scroll(direction){
    // let d =  document.getElementById(id)
    if (direction == 'prev') {  
      // d.scrollLeft -= 250;
        this.scrollable_cnt.nativeElement.scrollLeft -= 650;
    } else if (direction == 'next') {
      // d.scrollLeft += 250;
        this.scrollable_cnt.nativeElement.scrollLeft += 650;
    }
  }


  scrolled(event){
    this.scrollable_cnt.nativeElement.offsetWidth + this.scrollable_cnt.nativeElement.scrollLeft == this.scrollable_cnt.nativeElement.scrollWidth ? this.right_arrow.nativeElement.classList.add('hiding') : this.right_arrow.nativeElement.classList.remove('hiding')
    this.scrollable_cnt.nativeElement.scrollLeft == 0 ? this.left_arrow.nativeElement.classList.add('hiding') :  this.left_arrow.nativeElement.classList.remove('hiding')
  }

  ngAfterContentChecked() {
    this.changedetect.detectChanges();
  }



  goto_detail(route){
    this.router.navigateByUrl('/pr/'+route)
  }


}
