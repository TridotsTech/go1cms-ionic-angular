import { ViewportScroller } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';

import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-sub-list-header',
  templateUrl: './sub-list-header.component.html',
  styleUrls: ['./sub-list-header.component.scss'],
})
export class SubListHeaderComponent implements OnInit {

  @Input() sub_header_value;
  
  constructor(public db : DbService) { }

  ngOnInit() {}

}
