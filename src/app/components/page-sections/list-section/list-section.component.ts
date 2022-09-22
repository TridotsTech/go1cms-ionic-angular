import { Component, OnInit,Input } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-list-section',
  templateUrl: './list-section.component.html',
  styleUrls: ['../page-builder/page-builder.component.scss','./list-section.component.scss'],
})
export class ListSectionComponent implements OnInit {
  @Input() item;
  constructor(public db:DbService) { }

  ngOnInit() {}

  open_close(count,data){
    console.log(count,data);
    data.map((res,i)=>{
      if(i==count){
        res.show = res.show ? false : true;
      }else{
        res.show = false;
      }
    })
  }

}
