import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.page.html',
  styleUrls: ['./gallery-list.page.scss'],
})
export class GalleryListPage implements OnInit {

  gallery = [];
  constructor(public db:DbService) { }

  ngOnInit() {
    this.gallery_list();
  }

  gallery_list(){
    this.db.gallery_list().subscribe(res =>{
      this.gallery = res.data;
    })
  }
}
