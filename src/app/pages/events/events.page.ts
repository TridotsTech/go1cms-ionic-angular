import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  item;
  constructor(public db:DbService,public route :ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      console.log(res)
      this.event_detail(res.events);
    })
  }

  event_detail(id){
    this.db.get_doctype_data('Event Schedule/'+id).subscribe(res =>{
          this.item = res.data
          console.log(this.item)
          // return res.data
        })
  }

  check_img(data){
      if(data){
        if(data.indexOf('https') == -1){
          return this.db.baseUrl+data;
        } else if(data.indexOf('https') == 0){
          return data
        }
      }
  }

}
