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
import { DbService } from 'src/app/services/db.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss'],
})
export class ListFilterComponent implements OnInit {

  @Input() item;
  @ViewChild('scrollable_cnt') scrollable_cnt:ElementRef;
  @ViewChild('left_arrow') left_arrow:ElementRef;
  @ViewChild('right_arrow') right_arrow:ElementRef;
  @Output() get_category_values = new EventEmitter();
  @ViewChild(IonContent) content:IonContent;

  constructor(public db:DbService,private router:Router,private location:Location) { }

  ngOnInit() {
    this.db.ismobile = this.db.checkmobile();
    console.log(this.item)
  }

  scroll(direction){
    if (direction == 'prev') {  
        this.scrollable_cnt.nativeElement.scrollLeft -= 650;
    } else if (direction == 'next') {
        this.scrollable_cnt.nativeElement.scrollLeft += 650;
        // console.log(direction,this.scrollable_cnt.nativeElement.scrollLeft)
    }
  }

  scrolled(event){
    this.scrollable_cnt.nativeElement.offsetWidth + this.scrollable_cnt.nativeElement.scrollLeft == this.scrollable_cnt.nativeElement.scrollWidth ? this.right_arrow.nativeElement.classList.add('hiding') : this.right_arrow.nativeElement.classList.remove('hiding')
    this.scrollable_cnt.nativeElement.scrollLeft == 0 ? this.left_arrow.nativeElement.classList.add('hiding') :  this.left_arrow.nativeElement.classList.remove('hiding')
  }

  
}
