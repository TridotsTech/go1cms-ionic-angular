import { Component, OnInit, Input } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

// interface ngStyleObj {
//   'grid-template-columns'?:string
// }

@Component({
  selector: 'app-template-builder',
  templateUrl: './template-builder.component.html',
  styleUrls: ['./template-builder.component.scss','../test/test.component.scss'],
})
export class TemplateBuilderComponent implements OnInit {

 @Input() sections;

  constructor(public db:DbService) { }
  ngOnInit() {
    console.log(this.sections)
  }
  // grid_columns:ngStyleObj
  
        assign(data){
          let new_columns = ''
          data.columns.map(c=>{
             new_columns += new_columns.length==0 ? `${c.width}` : ` ${c.width}`
          })
          let grid_columns = {
            'grid-template-columns':new_columns
          }
          return grid_columns
       }
}
