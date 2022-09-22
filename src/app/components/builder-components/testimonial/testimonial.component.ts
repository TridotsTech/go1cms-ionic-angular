import { Component, Input, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss','../test/test.component.scss'],
})
export class TestimonialComponent implements OnInit {
@Input() row;
  constructor(public db:DbService) { }

  ngOnInit() {
    this.row.data.data = this.row.data.data && JSON.stringify(this.row.data.data)

    this.row.data.data=this.row.data.data && (JSON.parse(this.row.data.data));  }

}
