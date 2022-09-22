import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

// interface ngStyleObj {
//   'grid-template-columns'?:string
// }

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  // grid_columns:ngStyleObj;
  grid_columns;
  route_;
  content_data;

  constructor(public route :ActivatedRoute,public db:DbService) { }

  ngOnInit() {

    this.route.params.subscribe(res => {
      if(res.page_route && res.page_route_1 && res.page_route_2) {
        this.route_ = res.page_route + '/' + res.page_route_1 + '/' + res.page_route_2;
        this.get_about(this.route_);
      }
    })

  }


  get_about(page){
    var res={ route: page }
    this.db.get_blog_details(res).subscribe(data => {
        console.log(data);
        this.content_data = data.message;
    })
  }

  content_datas=[
    {'title':'Coping with Hair Loss - Series 1',
    'published_on':'2021-12-08',
    'blogger' : "Admin",
    'blog_intro':'Welcome to your first&nbsp;series in Coping with Hair Loss. In each series every month, you will learn valuable inform',
    'content' : "<p>Welcome to your first&nbsp;series in <strong>Coping with Hair Loss</strong>. In each series every month, you will learn valuable information that will help you understand the underlying causes of hair loss, so you can learn how to avoid losing hair, treat symptoms and prevent further damage! Make sure to subscribe to our newsletter so that you don't miss out on any updates! Today we are going to talk about some of the more common causes of hair loss.</p>\n<h3>First a few facts:</h3>\n<p>According to resent statistics 35 million men and 21 million are suffering with hair loss in the U.S. alone, with over 810,000 of them getting professional treatment.</p>\n<p>The average number of hair follicles on the scalp is 110,000 and it’s very natural for a person to lose 50 to 100 hairs a day during the body’s renewal process. If you see bald patches or experience excessive thinning, you may be suffering from hair loss.</p>\n<p>Hair loss or commonly referred to as baldness is technically known as alopecia, which is considered a loss of hair from the head or body. Some types of baldness can be caused by an autoimmune disorder called alopecia areata.</p>\n<p>Extreme forms of alopecia areata are alopecia totalis, which involves the loss of all head hair, and alopecia universalis, which involves the loss of all hair from the head and the body.</p>\n<p>For many of us who suffer with severe signs of hair loss, there can be numerous underlying causes; like medication, chemotherapy, exposure to radiation and other harmful chemicals. It can also be caused by a fungal infection, trauma from injury or damage from compulsive pulling and that’s not to mention nutritional deficiencies and hormonal factors like thyroid disease, skin disease or even stress.</p>\n<p>In most of the cases, hair loss is temporary but in other cases, it can be permanent depending on the severity of disease. Some of the most common causes of hair loss are hormonal. They are a stimulant, which helps hair growth and also causes hair loss. Hormonal imbalances can affect both men and women. Hair thinning in men often follows a pattern from the front of the scalp through the crown, while hair thinning in women usually doesn’t follow any specific pattern.</p>\n<h3>Low serum iron:</h3>\n<p>Low serum iron is another common cause. If a person doesn’t consume enough iron rich food like lean protein, seafood or leafy greens in his or her diet this may lead to hair loss.</p>\n<p>For a complete list of iron rich foods visit:</p>\n<p><a href=\"http://www.redcrossblood.org/learn-about-blood/health-and-wellness/iron-rich-foods%20\" target=\"_blank\" rel=\"noopener noreferrer\">http://www.redcrossblood.org/learn-about-blood/health-and-wellness/iron-rich-foods&nbsp;</a></p>\n<p>In some cases, the body may not absorb enough of iron. If you think this is the case you should check with your doctor or health care professional as soon as possible for a proper diagnosis and treatment plan. Low iron in the body can be detected by a routine test and can often be corrected by taking in an iron rich diet in and supplements.</p>\n<p>To find out even more about the food you should include in your diet to help ensure your hair is thick, strong and healthy here is a great article on WebMD that you should check out: <a href=\"http://www.webmd.com/beauty/hair-styling/top-10-foods-for-healthy-hair\" target=\"_blank\" rel=\"noopener noreferrer\">http://www.webmd.com/beauty/hair-styling/top-10-foods-for-healthy-hair</a></p>\n<p>Make sure you look for your next issue soon. We will be talking about the importance of biotin and how it helps prevent hair loss.</p>\n<p>Wanna Try&nbsp;Our&nbsp;Anti- Hair Fall Control&nbsp;Range ? Check the products below,</p>\n<p><a href=\"https://innila.in/collections/hair-care/products/innila-red-onion-anti-hair-fall-and-dandruff-shampoo-200ml\" target=\"_blank\" rel=\"noopener noreferrer\">Innila Red Onion Anti-Hair Fall Shampoo</a></p>",   
    'related_bloglist': [{
      blog_intro :"To take care of our hair we should know where to start and what to try. Taking care of our hair can be hassle. It’s enough to take a look a",
      name : "BP-00002",
      published_on : "2022-02-09",
      route : "blog/apple-cider-vinegar-shampoo-and-it’s-benefits",
      thumbnail_image : "https://demo.go1cms.com//files/Blog_img_1.jpg",
      title :"Apple Cider Vinegar Shampoo and It’s Benefits"
    },{
      blog_intro :"To take care of our hair we should know where to start and what to try. Taking care of our hair can be hassle. It’s enough to take a look a",
      name : "BP-00002",
      published_on : "2022-02-09",
      route : "blog/apple-cider-vinegar-shampoo-and-it’s-benefits",
      thumbnail_image : "https://demo.go1cms.com//files/Blog_img_4.jpg",
      title :"Apple Cider Vinegar Shampoo and It’s Benefits"
    },
    {
      blog_intro :"To take care of our hair we should know where to start and what to try. Taking care of our hair can be hassle. It’s enough to take a look a",
      name : "BP-00002",
      published_on : "2022-02-09",
      route : "blog/apple-cider-vinegar-shampoo-and-it’s-benefits",
      thumbnail_image : "https://demo.go1cms.com//files/Blog_img_5.jpg",
      title :"Apple Cider Vinegar Shampoo and It’s Benefits"
    },
    {
      blog_intro :"To take care of our hair we should know where to start and what to try. Taking care of our hair can be hassle. It’s enough to take a look a",
      name : "BP-00002",
      published_on : "2022-02-09",
      route : "blog/apple-cider-vinegar-shampoo-and-it’s-benefits",
      thumbnail_image : "https://demo.go1cms.com//files/Blog_img_1.jpg",
      title :"Apple Cider Vinegar Shampoo and It’s Benefits"
    },
    {
      blog_intro :"To take care of our hair we should know where to start and what to try. Taking care of our hair can be hassle. It’s enough to take a look a",
      name : "BP-00002",
      published_on : "2022-02-09",
      route : "blog/apple-cider-vinegar-shampoo-and-it’s-benefits",
      thumbnail_image : "https://demo.go1cms.com//files/Blog_img_4.jpg",
      title :"Apple Cider Vinegar Shampoo and It’s Benefits"
    }],
    'gallery': {
      'title':'Gallery',
      'gallery_values' :[
      {
        image__video : "https://demo.go1cms.com//files/Blog_img_1.jpg",
       },
       {
        image__video : "https://demo.go1cms.com//files/Blog_img_4.jpg",
       
       },{
        image__video : "https://demo.go1cms.com//files/Blog_img_5.jpg",
       },{
        image__video : "https://demo.go1cms.com//files/Blog_img_1.jpg",
       }
      ],
    },
   
    'table':{
      title:'At a Glance',
      table_values:[
        {'label':'Finish Date','value':'15/12/2016'},
        {'label':'Clients','value':'RJK Group Ltd'},
        {'label':'Architect','value':'MJ Associates Architects'},
        {'label':'Location','value':'Chesterfield County, VA'},
        {'label':'Surface Area','value':'400 M2'},
        {'label':'Services Rendered','value':'Environmental Service Landscape Architecture Site Selection & Planning'},
        {'label':'Project Cost','value':'	$150,000'},
      ]
    },
     'project_summary' :{
      'title':'Project Summary',
      'image' : "https://demo.go1cms.com//files/Blog_img_1.jpg",
      'intro':'Lorem ipsum dolor sit amet, mea cu omnium urbanitas, labitur volumus id eum. Ius ignota offendit similique et, sea dolorum vituperata ullamcorper et, justo insolens omittantur sit ne. Aliquip pertinax vix ad, ea eos euismod officiis. Utamur minimum repudiare quiex ignota.',
    },
    'Final_Results' :{
      'title':'Final Results',
      'image' : "https://demo.go1cms.com//files/Blog_img_5.jpg",
      'intro':'Lorem ipsum dolor sit amet, mea cu omnium urbanitas, labitur volumus id eum. Ius ignota offendit similique et, sea dolorum vituperata ullamcorper et, justo insolens omittantur sit ne. Aliquip pertinax vix ad, ea eos euismod officiis. Utamur minimum repudiare quiex ignota.',
    }
   },
 ]


  detail_values1=[
    {
      "fullwidth": false,
      "u_id": "STL-0001_R1",
      "columns": [
        {
          "width": "100%",
          "u_id": "STL-0001_R1_C2",
          "rows": [
            {
              "width": "100%",
              "u_id": "STL-0001_R1_C2_R1",
              'data':'title',
              "columns": []
            },
            {
              "width": "100%",
              "u_id": "STL-0001_R1_C2_R1",
              
              "columns": [
                {"width": "8%",
                'data':'blogger',
                },
                {
                "width": "14%",
                'data':'published_on',
                },
                {
                  "width": "30%",
                  'data':'social_share',
                }
              ]
            },
            {
              "width": "100%",
              "u_id": "STL-0001_R1_C2_R2",
              'data':'blog_intro',
              "columns": []
            },
            {
              "width": "100%",
              "u_id": "STL-0001_R1_C2_R2",
              'data':'content',
              "columns": []
            },
            {
              "width": "100%",
              "u_id": "STL-0001_R1_C2_R2",
              'data':'related_bloglist',
              "columns": []
            }
           
          ]
        }
      ]
    }
  ]


  detail_values2=[
    {
      "fullwidth": true,
      "u_id": "STL-0001_R1",
      'rows':[{
        "width": "100%",
        'data':'title',
       },
       {
        "columns": [
         {
          "width": "65%",
          "u_id": "STL-0001_R1_C2",
          "rows": [
            {
              "width": "100%",
              "u_id": "STL-0001_R1_C2_R1",
              
              "columns": [
                {
                "width": "12%",
                'data':'blogger',
                },
                {
                "width": "17%",
                'data':'published_on',
                },
                {
                  "width": "30%",
                  'data':'social_share',
                }
              ]
            },
            {
              "width": "100%",
              "u_id": "STL-0001_R1_C2_R2",
              'data':'blog_intro',
              "columns": []
            },
            {
              "width": "100%",
              "u_id": "STL-0001_R1_C2_R2",
              'data':'content',
              "columns": []
            },
          ]
         },

         {
          "width": "35%",
          "u_id": "STL-0001_R1_C2",
          "rows": [
            {
              "width": "100%",
              "u_id": "STL-0001_R1_C2_R2",
              'data':'table',
              "columns": []
            }
           
          ]
         }
        ],
       },
     ],
    }
  ]

  detail_values=[
    {
      fullwidth: true,
      u_id: "STL-0001_R1",
      rows:[{
        width: "100%",
        data:'title',
        columns:[]
       },
       {
        columns: [
         {
          width: "55%",
          u_id: "STL-0001_R1_C2",
          margin: '0 10px 0 0',
          rows: [
            {
              width: "100%",
              u_id: "STL-0001_R1_C2_R2",
              data:'blog_intro',
              columns: []
            },
            {
              width: "100%",
              u_id: "STL-0001_R1_C2_R2",
              data:'content',
              columns: []
            },
          ]
         },

         {
          width: "45%",
          u_id: "STL-0001_R1_C2",
          margin: '0 0 0 10px',
          rows: [
            {
              width: "100%",
              u_id: "STL-0001_R1_C2_R2",
              data:'table',
              columns: []
            }
           
          ]
         }
        ],
       },

       {
        columns: [
         {
          width: "50%",
          u_id: "STL-0001_R1_C2",
          rows: [
            {
              width: "100%",
              u_id: "STL-0001_R1_C2_R2",
              data:'project_summary',
              margin: '0 10px 0 0',
              columns: []
            }
          ]
         },

         {
          width: "50%",
          u_id: "STL-0001_R1_C2",
          rows: [
            {
              width: "100%",
              u_id: "STL-0001_R1_C2_R2",
              data:'Final_Results',
              margin: '0 0 0 10px',
              columns: []
            }
          ]
         }
        ],
       },

       {
        width: "100%",
        data:'gallery',
        columns:[]
       },
     ],
    }
  ]

  assign(data){
    // console.log(data);
    let new_columns = ''
    data.columns.map(c=>{
       new_columns += new_columns.length == 0 ? `${c.width}` : ` ${c.width}`
    })
    this.grid_columns = {
      'grid-template-columns':new_columns
    }
    return this.grid_columns
 }

}
