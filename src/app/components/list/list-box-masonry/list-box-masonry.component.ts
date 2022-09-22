import { Component, Input, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-list-box-masonry',
  templateUrl: './list-box-masonry.component.html',
  styleUrls: ['../list-box/list-box.component.scss','./list-box-masonry.component.scss'],
})
export class ListBoxMasonryComponent implements OnInit {
 
  @Input() list_value;
  @Input() column_count;

  constructor(public db:DbService) { }


  ngOnInit() {}

}
