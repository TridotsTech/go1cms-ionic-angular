import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['../page-builder/page-builder.component.scss','./faq.component.scss'],
})
export class FAQComponent implements OnInit {
  @Input() item;

  // @Output() open_close = new EventEmitter;
  constructor(public db:DbService) { }

  ngOnInit() {}

  open_close(count,data){
    data.map((res,i)=>{
      if(i==count){
        res.show = res.show ? false : true;
      }else{
        res.show = false;
      }
    })
  }
}
