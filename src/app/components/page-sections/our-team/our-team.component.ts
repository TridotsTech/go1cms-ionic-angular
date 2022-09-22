import { Component, OnInit, Input } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['../page-builder/page-builder.component.scss','./our-team.component.scss'],
})
export class OurTeamComponent implements OnInit {
  @Input() item;
  constructor(public db:DbService) { }

  ngOnInit() {
  }
}
