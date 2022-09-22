import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss'],
})
export class ImagesListComponent implements OnInit {

  constructor(public db:DbService) { }

  ngOnInit() {}

}
