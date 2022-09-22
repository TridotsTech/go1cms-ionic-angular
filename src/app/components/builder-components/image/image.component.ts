import { Component, Input, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss','../test/test.component.scss'],
})
export class ImageComponent implements OnInit {
@Input() row;

  constructor(public db: DbService) { }

  ngOnInit() {}

}
