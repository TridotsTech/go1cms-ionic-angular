import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {

  @Input() item;
  // @ViewChild(IonContent) private content: IonContent;
  
  constructor(public db:DbService) { }

  ngOnInit() {
    // this.db.ui_block.subscribe(res=>{
    //   console.log('jjjjjjj',res)
    //   res == 'trigger' ? this.goto_rating() : null;
    // })
  }
  

  // goto_rating(){
  //   console.log('jjjjjjj')
  //   let itemList = document.getElementById('ui-blocks');
  //   this.content.scrollToPoint(0,itemList.offsetTop,1000);
  // }

}
