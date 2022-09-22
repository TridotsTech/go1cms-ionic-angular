import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['../page-builder/page-builder.component.scss','./clients.component.scss'],
})
export class ClientsComponent implements OnInit {

  @Input() item;
  @ViewChild('scrollContent') scroll:ElementRef;
  constructor(public db:DbService) { }
  ngOnInit() {}


  emitScroll(scroll, direction) {    
    if (direction == 'right') 
      this.scroll.nativeElement.scrollLeft += 610;
    else if (direction == 'left')
      this.scroll.nativeElement.scrollLeft -= 610;
  }
}
