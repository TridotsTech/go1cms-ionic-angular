import { Component, OnInit,Input } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-cta',
  templateUrl: './cta.component.html',
  styleUrls: ['../page-builder/page-builder.component.scss','./cta.component.scss'],
})
export class CTAComponent implements OnInit {
  @Input() item;
  constructor(public db:DbService) { }

  ngOnInit() {}

}
