import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-web-form',
  templateUrl: './web-form.page.html',
  styleUrls: ['./web-form.page.scss'],
})
export class WebFormPage implements OnInit {

form_values;

  constructor(public db:DbService,public route : ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(res =>{
      console.log(res)
      if(res && res.page_route){
          this.get_form(res.page_route);  
      }
    })
  }

  get_form(data){
    this.db.web_form_dynamic(data).subscribe(res=>{
      console.log(res)
      if(res && res.data){
        this.form_values = res.data;
      }
    })
  }


    

}
