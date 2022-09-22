import { ModalController } from '@ionic/angular';

import { Component, Input, OnInit } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-reference-site',
  templateUrl: './reference-site.component.html',
  styleUrls: ['./reference-site.component.scss'],
})
export class ReferenceSiteComponent implements OnInit {

  @Input() url:any;
  
  constructor(public sanitizer: DomSanitizer,public db:DbService,public modalCtrl:ModalController) { }

  ngOnInit() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
