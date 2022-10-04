import { Component, Input, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-extras',
  templateUrl: './extras.component.html',
  styleUrls: ['./extras.component.scss','../test/test.component.scss'],
})
export class ExtrasComponent implements OnInit {
@Input() row;
  constructor(public db:DbService) { }
  
  ngOnInit() {
    this.row.data.data = this.row.data.data && JSON.stringify(this.row.data.data)

    this.row.data.data=this.row.data.data && (JSON.parse(this.row.data.data));
  }

}
