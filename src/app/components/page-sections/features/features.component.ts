import { Component, Input, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['../page-builder/page-builder.component.scss','./features.component.scss'],
})
export class FeaturesComponent implements OnInit {

  @Input() item;

  constructor(public db:DbService) { }

  ngOnInit() {}

}
