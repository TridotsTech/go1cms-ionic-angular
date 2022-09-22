import { Component, OnInit,Input } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['../page-builder/page-builder.component.scss','./counters.component.scss'],
})
export class CountersComponent implements OnInit {

  @Input() item;
  constructor(public db:DbService) { }

  ngOnInit() {
   
  }

}
