import { DbService } from 'src/app/services/db.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss','../test/test.component.scss'],
})
export class AccordionComponent implements OnInit {
   @Input() row;
  constructor(public db:DbService) { }

  ngOnInit() {
    this.row.data.data = this.row.data.data &&  JSON.stringify(this.row.data.data)

    this.row.data.data=this.row.data.data &&  (JSON.parse(this.row.data.data));  }
  open_close(count,data){
    console.log(data);
    data.map((res,i)=>{
      console.log(i,count);
      if(i==count){
        res.show = res.show ? false : true;
      }else{
        res.show = false;
      }
    })
  }
  checking(value,index){
    value.map((res,i)=>{
      if(i == index){
        res.show = !res.show;
      }else{
        res.show = false;
      }
    })
 } 
}
