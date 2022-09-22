import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-gallery-detail',
  templateUrl: './gallery-detail.page.html',
  styleUrls: ['./gallery-detail.page.scss'],
})
export class GalleryDetailPage implements OnInit {
  gallery_details:any;
  constructor(public db:DbService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.gallery_detail(res.id);
    })
  }

  data = [
    {'display_type':'horizontal','box_size':'3',
    images : [
      {'image':'assets/image/gallery-1.jpg','name':'Image #1'},
      {'image':'assets/image/gallery-2.jpg','name':'Image #2'},
      {'image':'assets/image/gallery-3.jpg','name':'Image #3'},
      {'image':'assets/image/gallery-4.jpg','name':'Image #4'},
      {'image':'assets/image/gallery-5.jpg','name':'Image #5'},
      {'image':'assets/image/gallery-6.jpg','name':'Image #6'},
      {'image':'assets/image/tea.jpg','name':'Image #7'},
    ]
  }

  ]

  gallery_detail(id){
    this.db.gallery_detail(id).subscribe(res =>{
      this.gallery_details = res.data
      // console.log(this.gallery_details);
    })
  }
}
