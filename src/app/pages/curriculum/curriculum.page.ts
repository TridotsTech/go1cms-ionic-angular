import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.page.html',
  styleUrls: ['./curriculum.page.scss'],
})
export class CurriculumPage implements OnInit {
  content_data;
  constructor(public db:DbService) { }

  ngOnInit() {
    this.get_about('curriculum')
  }
  get_about(page){
    var res={  application_type: this.db.ismobile?"mobile":"web", domain: this.db.domainurl,  route: page }
   this.db.get_mobile_homepage(res).subscribe(data => {
     this.content_data = data.message;
   }, error => {   console.log(JSON.stringify(error.json())); });
 }
}
