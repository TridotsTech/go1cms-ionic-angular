import { Component, Input, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss','../test/test.component.scss'],
})
export class TextComponent implements OnInit {
@Input() row;
  constructor(public db:DbService) { }

  ngOnInit() {}

}
