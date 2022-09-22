import { Component, OnInit ,ViewChild,Input} from '@angular/core';
import { DbService } from 'src/app/services/db.service';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  @Input() row;
  constructor(public db:DbService) { }

  ngOnInit() {
    this.row.data.data = this.row.data.data &&  JSON.parse(this.row.data.data);

  }
  
  
 checkIsShow(tabs,tab,row){
  tabs.map((res,i)=>{
    if(i == tab){
      res.isShow = true;
      row.content = res.content
    }else{
      res.isShow = false;
    }
  })
 }

}
