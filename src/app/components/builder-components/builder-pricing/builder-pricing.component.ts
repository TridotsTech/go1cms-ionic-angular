import { Component, OnInit,Input } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-builder-pricing',
  templateUrl: './builder-pricing.component.html',
  styleUrls: ['./builder-pricing.component.scss','../test/test.component.scss'],
})
export class BuilderPricingComponent implements OnInit {
  @Input() row;
  constructor(public db:DbService) { }

  ngOnInit() {
    this.row.data.data = this.row.data.data &&  JSON.stringify(this.row.data.data)

    this.row.data.data=this.row.data.data &&  (JSON.parse(this.row.data.data));  }

}
