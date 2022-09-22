import { Component, Input, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss','../test/test.component.scss'],
})
export class ButtonComponent implements OnInit {
@Input() row;
  constructor(public db:DbService) { }

  ngOnInit() {
    
  }

}
