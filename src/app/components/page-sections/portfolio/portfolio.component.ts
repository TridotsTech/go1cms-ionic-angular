import { Component, OnInit,Input } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['../page-builder/page-builder.component.scss','./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  @Input() item;
  constructor(public db:DbService) { }

  ngOnInit() {}

}
