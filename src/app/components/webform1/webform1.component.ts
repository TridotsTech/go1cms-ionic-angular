import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

// import { SignaturePad } from 'angular2-signaturepad';
import $ from 'jquery';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { EditWebformchildPage } from 'src/app/pages/edit-webformchild/edit-webformchild.page';
// import { TermsPage } from 'src/app/pages/terms/terms.page';
import { WebformChildPage } from 'src/app/pages/webform-child/webform-child.page';
import { DbService } from 'src/app/services/db.service';

import {
  AlertController,
  ModalController,
} from '@ionic/angular';

// import autos from '../../../assets/web_form_json/autos.json';
// import classified from '../../../assets/web_form_json/freeads.json';
// import jobs from '../../../assets/web_form_json/jobs.json';
// import real_estate from '../../../assets/web_form_json/real_estate.json';
// import rommates from '../../../assets/web_form_json/roommates.json';

// End

@Component({
  selector: 'app-webform1',
  templateUrl: './webform1.component.html',
  styleUrls: ['./webform1.component.scss'],
})
export class Webform1Component implements OnInit {
  submitted = false;
  captcha = false;
  // user_email_id=localStorage.user_email_id
  // signature pad

  signatureImg: string;
  // @ViewChild(SignaturePad) signaturePad: SignaturePad;

  signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 700,
    'canvasHeight': 300
  };

  // 
  
  @Input() web_form;
  @Input() type: any
  @Input() isModel: any = false
  @Input() model_path: any
  @Input() edit_data_details: any
  @Input() forms_route;

  @Input() cancle_btn_hide;
  @Input() button_positions;

  //singnature variables
  signature_fieldname = [];
  signature_base64_url = [];

  // image attach variables

  categoryfile: any;
  categoryimagedata: any;

  field_name: any = [];
  base64_url: any = [];
  item;
  file_name: any = [];

  //End 
  url: any
  info: any = [];
  form_data: FormGroup;
  form_ctrl_data: any = {};
  // section_break_data;
  json_data;
  doctype;
  form_tile;
  link_flelds_name = [];
  image_field_check = "no uploads";
  field_data;
  current_path = "events";
  img_file_name: any = [];
  current_page;
  page_props: any = {};
  retrict_duplicate=false;
  // form_values;
  tab_View_Ads_Navigation = [{ text: 'General', route: '/classifieds/webform/insert' }, { text: 'Jobs', route: '/jobs/webform/insert' }, { text: 'Autos', route: '/autos/webform/insert' }, { text: 'Realestate', route: '/realestates/webform/insert' }, { text: 'Roommate', route: '/roommates/webform/insert' }]
  constructor(public location:Location, private http: HttpClient,public ref: ChangeDetectorRef, public db: DbService, private formBuilder: FormBuilder, public alertController: AlertController, public modalCtrl: ModalController, public router: Router, public route: ActivatedRoute) {

    // console.log("full api data", jobs)

  }

  ngOnInit() {

    if(this.forms_route){
      this.get_form(this.forms_route); 
    }else{
      this.get_form_values();
    }
    


    //  console.log(autos,real_estate,classified,jobs,rommates,"---------------------")
    // this.route.params.subscribe(res => {

    //   let current_path = this.route.snapshot['_urlSegment'].segments[0].path

    //   switch (current_path) {
    //     case 'classifieds':
    //       this.field_data = classified.data.web_form_fields;
    //       this.doctype = classified.data.doc_type;
    //       this.form_tile = classified.data.name;
    //       this.json_data = this.field_data;
    //       break;
    //     case 'jobs':
    //       this.field_data = jobs.data.web_form_fields;
    //       this.doctype = jobs.data.doc_type;
    //       this.form_tile = jobs.data.name;
    //       this.json_data = this.field_data;
    //       break;
    //     case 'autos':
    //       this.field_data = autos.data.web_form_fields;
    //       this.doctype = autos.data.doc_type;
    //       this.form_tile = autos.data.name;
    //       this.json_data = this.field_data;
    //       break;
    //     case 'realestate':
    //       this.field_data = real_estate.data.web_form_fields;
    //       this.doctype = real_estate.data.doc_type;
    //       this.form_tile = real_estate.data.name;
    //       this.json_data = this.field_data;
    //       break;
    //     case 'roommates':
    //       this.field_data = rommates.data.web_form_fields;
    //       this.doctype = rommates.data.doc_type;
    //       this.form_tile = rommates.data.name;
    //       this.json_data = this.field_data;
    //       break;
    //   }

    //   // Store doctype for api resource method to db

    //   this.db.doc_type = this.doctype;
    //   this.db.ad_name = this.titleCase(this.form_tile);
    //   // this.db.ad_name = this.form_tile;


    //   this.store_info()
    //   this.store_header();
    //   this.filter_section_break();
    //   // this.check_assign_sec_break();
    //   this.assign_final_data()

    //   this.form_data = this.formBuilder.group(
    //     this.form_ctrl_data
    //   );

    // });
    
    // console.log(this.route.snapshot['_urlSegment'].segments[0].path,"-------------this")
    // console.log("--------rr",this.current_path = this.route.snapshot['_urlSegment'].segments[0].path)
    // if (location.pathname == "/classifieds/webform/insert") {

    //   this.field_data = classified.data.web_form_fields;
    //   this.doctype = classified.data.doc_type;
    //   this.form_tile = classified.data.name;
    //   this.json_data = this.field_data;

    // }

    // else if (location.pathname == "/jobs/webform/insert") {

    //   this.field_data = jobs.data.web_form_fields;
    //   this.doctype = jobs.data.doc_type;
    //   this.form_tile = jobs.data.name;
    //   this.json_data = this.field_data;
    // }

    // else if (location.pathname == "/autos/webform/insert") {

    //   this.field_data = autos.data.web_form_fields;
    //   this.doctype = autos.data.doc_type;
    //   this.form_tile = autos.data.name;
    //   this.json_data = this.field_data;

    // }

    // else if (location.pathname == "/realestates/webform/insert") {

    //   this.field_data = real_estate.data.web_form_fields;
    //   this.doctype = real_estate.data.doc_type;
    //   this.form_tile = real_estate.data.name;
    //   this.json_data = this.field_data;

    // }

    // else if (location.pathname == "/roommates/webform/insert") {

    //   this.field_data = rommates.data.web_form_fields;
    //   this.doctype = rommates.data.doc_type;
    //   this.form_tile = rommates.data.name;
    //   this.json_data = this.field_data;

    // }

  }

  get_form(data){
    this.db.web_form_dynamic(data).subscribe(res=>{
      // console.log(res)
      if(res && res.data){
        this.web_form = res.data;
        this.get_form_values();
      }
    })
  }

  get_form_values(){
    // Store doctype for api resource method to db
    this.retrict_duplicate=false;
    // this.get_datas();
    this.isModel ? this.url = this.model_path : this.url = location.pathname
    this.isModel ? this.current_path = this.type : this.current_path = this.route.snapshot['_urlSegment'].segments[0].path
    
    this.field_data = this.web_form.web_form_fields;
    this.doctype = this.web_form.doc_type;
    this.form_tile = this.web_form.name;
    this.json_data = this.field_data;

  
  this.db.doc_type = this.doctype;
  this.db.ad_name = this.titleCase(this.form_tile);
  // this.db.ad_name = this.titleCase(this.doctype);
  this.getIp();
  this.get_device_type();
  this.store_info()
  this.store_header();
  this.filter_section_break();
  // this.check_assign_sec_break();
  this.assign_final_data()
  this.form_data = this.formBuilder.group(
    this.form_ctrl_data
  );


  setTimeout(() => {
    // console.log("this.child_category",this.child_category)
    Object.keys(this.form_ctrl_data).map(key => {
      if (this.edit_data_details) {
        Object.keys(this.edit_data_details).map(resKey => {
          if (key == resKey) {
            // console.log(key, resKey)
            // this.form_ctrl_data[key].value = this.edit_data_details[resKey]
            if ((key == "sub_category" && this.edit_data_details[resKey]) || (key == "subcategory" && this.edit_data_details[resKey])) {

              if (this.child_category && this.child_category["Classified Category"]) {

                this.parent_id = this.edit_data_details["category"]
                this.load_child_options("Classified Category")

                this.child_category["Classified Category"].map(res => {
                  if (this.edit_data_details[resKey] == res.ids) {
                    this.form_ctrl_data[key].setValue(this.edit_data_details[resKey])
                    this.form_ctrl_data[key].touched = true
                  }
                })
              }

              else if (this.child_category && this.child_category["Job Category"]) {

                this.parent_id = this.edit_data_details["category"]
                this.load_child_options("Job Category")

                this.child_category["Job Category"].map(res => {
                  if (this.edit_data_details[resKey] == res.ids) {
                    this.form_ctrl_data[key].setValue(this.edit_data_details[resKey])
                    this.form_ctrl_data[key].touched = true
                  }
                })
              }
            }
            else {
              this.form_ctrl_data[key].setValue(this.edit_data_details[resKey])
              this.form_ctrl_data[key].touched = true
            }
          }
        })
      }
    })
    setTimeout(() => { this.hide_sub_category_fields_html(this.edit_data_details) }, 100)

  }, 500)


  //   // Main doc Json Data (Not Web Form)

  // if (location.pathname == "/classified") {


  //   // Main doc 

  //   // let field_data = doc.message.fields
  //   // this.doctype = classified.data.doc_type
  //   // this.form_tile = classified.data.name
  //   // this.json_data = field_data

  //   // end


  //   // Get doc json by api method

  //   // this.get_form_data(this.doctype);

  // }

  // console.log("For end title", this.form_tile)
  }


  clear_image_data(type, value, field_name) {

    if (type == "edit") {
      this.edit_data_details[field_name] = undefined
      this.form_ctrl_data[field_name].setValue("")
      this.base64_url.splice(this.field_name.indexOf(field_name), 1);
      this.field_name.splice(this.field_name.indexOf(field_name), 1);
      this.file_name.splice(this.file_name.indexOf(field_name));
    }

    else if (type == "fresh") {
      this.form_ctrl_data[field_name].setValue("")
      this.base64_url.splice(this.field_name.indexOf(field_name), 1);
      this.field_name.splice(this.field_name.indexOf(field_name), 1)
      this.file_name.splice(this.file_name.indexOf(field_name));
    }

  }


  get_datas() {
    this.isModel ? this.current_path = this.type : this.current_path = this.route.snapshot['_urlSegment'].segments[0].path
    switch (this.current_path) {
      case 'classifieds':
        this.current_page = 'Classified'
        break;
      case 'jobs':
        this.current_page = 'Job'
        break;
      case 'roommates':
        this.current_page = 'Roommate'
        break;
      case 'realestates':
        this.current_page = 'Realestate'
        break;
      case 'autos':
        this.current_page = 'Auto'
        break;
    }
    this.page_props = { current_page: 'free_ads', page: this.current_page, category_name: undefined, main_category: undefined, page_no: 0, main_category_link: 'category_route', current_path: this.current_path }
    // this.db.load_menus(this.page_props);
  }


  ngAfterContentChecked() {
    this.ref.detectChanges();
  }


  // get web form main data
  get_form_data(table_name) {

    let doc_name: string = '';
    let table_array = table_name.split(" ");

    table_array.map(res => {
      doc_name = doc_name.concat(res + '+')
    })

    doc_name = doc_name.substring(0, doc_name.length - 1)
    this.db.get_doc_data(doc_name).subscribe(res => {
    })
  }


  // Title case the title 
  titleCase(str) {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }


  // store form control details
  store_info() {
    // For Storing filtered data
    this.json_data.map(res => {
      // if (res.fieldtype != "Barcode" && res.fieldtype != "Button" && res.fieldtype != "Color" && res.fieldtype != "Duration" && res.fieldtype != "Dynamic Link" && res.fieldtype != "Fold" && res.fieldtype != "Geolocation" && res.fieldtype != "Heading" && res.fieldtype != "Image" && res.fieldtype != "Markdown Editor" && res.fieldtype != "Percent" && res.fieldtype != "Read Only" && res.fieldtype != "Rating" && res.fieldtype != "Table" && res.fieldtype != "Table MultiSelect") {
      if (res.fieldtype != "Barcode" && res.fieldtype != "Button" && res.fieldtype != "Color" && res.fieldtype != "Duration" && res.fieldtype != "Dynamic Link" && res.fieldtype != "Fold" && res.fieldtype != "Geolocation" && res.fieldtype != "Heading" && res.fieldtype != "Image" && res.fieldtype != "Markdown Editor" && res.fieldtype != "Percent" && res.fieldtype != "Read Only" && res.fieldtype != "Rating" && res.fieldtype != "Table MultiSelect") {
        this.info.push(res);
      }


      // getting link field options
      if (res.fieldtype == "Link") {
        // this.current_gen_links(res.options);
        this.link_flelds_name.push(res.options);
      }

      // if (res.fieldtype != 'Attach' || res.fieldtype != 'Attach Image') {
      //   //this value will prevent with image data submit For waiting the image upload complete 
      //   this.image_field_check = "true";
      // }
    })


    // For web form controls
    // this.info.data.web_form_fields.map(res => {
    this.info.map(res => {
      // if (res.label && res.fieldtype != "Section Break" && res.fieldtype != "Column Break" && res.fieldtype != "Barcode" && res.fieldtype != "Button" && res.fieldtype != "Color" && res.fieldtype != "Duration" && res.fieldtype != "Dynamic Link" && res.fieldtype != "Fold" && res.fieldtype != "Geolocation" && res.fieldtype != "Heading" && res.fieldtype != "Image" && res.fieldtype != "Markdown Editor" && res.fieldtype != "Percent" && res.fieldtype != "Read Only" && res.fieldtype != "Rating" && res.fieldtype != "Table" && res.fieldtype != "Table MultiSelect") {
      if (res.label && res.fieldtype != "Section Break" && res.fieldtype != "Column Break" && res.fieldtype != "Barcode" && res.fieldtype != "Button" && res.fieldtype != "Color" && res.fieldtype != "Duration" && res.fieldtype != "Dynamic Link" && res.fieldtype != "Fold" && res.fieldtype != "Geolocation" && res.fieldtype != "Heading" && res.fieldtype != "Image" && res.fieldtype != "Markdown Editor" && res.fieldtype != "Percent" && res.fieldtype != "Read Only" && res.fieldtype != "Rating" && res.fieldtype != "Table MultiSelect") {
        if (res.reqd == 1 && res.options != 'Email') {
          this.form_ctrl_data[res.fieldname] = new FormControl((''), Validators.required)
        } else if (res.reqd == 1 && res.options == 'Email') {
          this.form_ctrl_data[res.fieldname] = new FormControl((localStorage.user_email_id), [Validators.required, Validators.email])
          // console.log(res)
        } else if (res.options == 'Email') {
          this.form_ctrl_data[res.fieldname] = new FormControl((localStorage.user_email_id), Validators.email)
          // console.log(res)
        } else if (res.fieldtype == 'Check') {
          this.form_ctrl_data[res.fieldname] = new FormControl(false)
        } else {
          this.form_ctrl_data[res.fieldname] = new FormControl('')
        }
      }
    })
    // console.log('loop form group data', this.info)
    this.form_ctrl_data["terms_condt"] = new FormControl((false), Validators.requiredTrue)
  }


  // openWindowReload(link) {
  //   console.log(
  //     'alert woekekkeekk'
  //   )
  //   var href = link.href;
  //   var newTab =window.open(href,'_blank');
  //   newTab.location.reload();
  // }


  // Get link field options
  ref_doc = [];
  all_link_opts = {};

  current_gen_links(link_field_array) {
    // console.log("____________________________________________Modal Calling")
    link_field_array.map(refdoc => {
      if (refdoc == "Classified Category" || refdoc == "Job Category") {
        this.get_parent_options(refdoc)
      }
      else {
        this.ref_doc.push(refdoc);
        this.db.ref_doc_type = refdoc;
        this.db.get_link_field_options().subscribe(res => {
          let res_data = res.data
          let link_opts = [];

          res_data.map(res => {
            link_opts.push(res.name)
          })
          this.all_link_opts[refdoc] = link_opts;
        })
      }
    })
  }
  // End

  // Added by gopi on 30/03/22
  k = 1;
  child_category = {};

  get_parent_options(refdoc) {
    if (this.k == 1) {
      this.ref_doc.push(refdoc);
      this.db.ref_doc_type = refdoc;
      this.db.get_link_field_options_parent(refdoc).subscribe(res => {
        let res_data = res.data
        let link_opts = [];

        if (refdoc == "Classified Category") {
          res_data.map(res => {
            link_opts.push({ "options": res.category_name, "ids": res.name })
          })
        }
        else if (refdoc == "Job Category") {
          res_data.map(res => {
            link_opts.push({ "options": res.category_name, "ids": res.name })
          })
        }
        this.all_link_opts[refdoc] = link_opts;
      })
      this.k++
    }

    else if (this.k == 2) {
      this.k = 1;
      this.ref_doc.push(refdoc);
      this.db.ref_doc_type = refdoc;
      this.db.get_link_field_options_child(refdoc).subscribe(res => {
        let res_data = res.data
        let link_opts = [];
        res_data.map(each => {
          if (each.parent_category) {
            link_opts.push({ "option": each.category_name, "ids": each.name, "parent_category": each.parent_category });
          }
        })
        this.child_category[refdoc] = link_opts;
      })
    }
  }

  parent_id;
  final_child_category = {};
  sub_category = true;
  load_child_options(ref_doc) {
    // console.log("ref doc", ref_doc)
    // console.log("parent id",this.parent_id)
    this.sub_category = true;
    this.final_child_category = {};
    let values = []
    if (this.child_category && this.child_category[ref_doc]) {
      this.child_category[ref_doc].map(res => {
        if (res.parent_category == this.parent_id)
          values.push({ "options": res.option, "ids": res.ids })
      })
    }
    this.final_child_category[ref_doc] = values;

    if (ref_doc == "Classified Category") {
      if (this.parent_id) {
        $("#subcategory").show();
      }
      else {
        $("#subcategory").hide();
      }
    }
    else if (ref_doc == "Job Category") {
      if (this.parent_id) {
        $("#sub_category").show();
      }
      else {
        $("#sub_category").hide();
      }
    }
    this.reset_hide_subcategory(ref_doc, values);
  }

  hide_sub_category_fields_html(edit_values) {
    // console.log("this.form_ctrl_data",this.form_ctrl_data)
    // console.log("this.edit_data_details",this.edit_data_details)
    // console.log("this.final_child_category", this.final_child_category)
    // console.log("this.child_category",this.child_category)
    // console.log("Classified Category",this.child_category['Classified Category'])
    // console.log("Job Category",this.child_category['Job Category'])
   
    $(function () {

      if(edit_values && edit_values["sub_category"]){
        // console.log('this.edit_data_details["sub_category"]',edit_values["sub_category"])
        $("#sub_category").show();
        this.sub_category = true;
      }

      else if(edit_values && edit_values["subcategory"]){
        // console.log('this.edit_data_details["subcategory"]',edit_values["subcategory"])
        $("#subcategory").show();
        this.sub_category = true;
      }

      else{
        // console.log("main page loaded")
        $("#sub_category").hide();
        $("#subcategory").hide();
        this.sub_category = false;
      }

      $("textarea.native-textarea.sc-ion-textarea-md").parent().css("height","100%")
      $("textarea.native-textarea.sc-ion-textarea-md").css("height","100%")

    });
  }
  
  reset_hide_subcategory(ref_doc, values) {
    if (ref_doc == "Classified Category") {
      $("#subcategorychild").val("");
    }
    else if (ref_doc == "Job Category") {
      $("#sub_categorychild").val("");
    }
    if (values.length == 0) {
      $("#sub_category").hide();
      $("#subcategory").hide();
    }
  }

  // Filter the section for section break and if a form having without section breake last if conditon will work
  section_break_data = {};
  each_sec_data = [];
  section_break_name = [];
  test_section_break_data = [];
  test_section_break_name = [];

  // if api have column break or not column break and not have section breake the value will be sstore here
  no_sec_col = [];
  //end


  // Setting margin value for each flex div
  // The css and the below value must be same for apply e:g flex:0 0 calac(%-flex_margin)
  flex_margin: any = "30px";
  // end var
  store_field_type = [];
  // Store field name && check it has lable or not
  // store_field_name;
  // count = 0;
  filter_section_break() {

    // function call for Getting link field options
    this.current_gen_links(this.link_flelds_name);
    this.info.map((res, index) => {
      // if (res.label && res.fieldtype == "Section Break") {
      //   this.store_field_name = res.fieldname;
      //   this.each_sec_data = [];
      //   this.count = 0;
      // }
      // console.log(res.fieldtype)
      this.store_field_type.push(res.fieldtype);
      if (res.fieldtype == "Section Break") {
        // console.log(res.fieldname);
        // console.log(index);
        // console.log("i", this.i);
        // console.log(this.info.length);
        let k = index;
        let count = 0;
        // console.log(k)
        while (k < this.info.length) {
          // console.log(k)
          if (k != index) {
            // console.log(res.fieldname);
            // console.log("each fieldname", this.info[k].fieldname);
            if (this.info[k].fieldtype != "Section Break" && this.info[k].fieldtype != "Column Break") {
              // console.log("each fieldname", this.info[k].fieldname);
              // console.log(k)
              this.each_sec_data.push(this.info[k]);
            } else if (this.info[k].fieldtype == "Section Break") {
              break
            }
          }

          if (this.info[k].fieldtype == "Column Break") {
            count++
          }
          k++
        }

        this.section_break_data[res.fieldname] = this.each_sec_data;
        this.section_break_data[res.fieldname].count = count + 1;
        let p__flex = ((100 / (count + 1)) + '%');
        let flex_out = "0 0 calc(" + p__flex + " " + "-" + " " + this.flex_margin + ")";
        // console.log("percent", p__flex)
        this.section_break_data[res.fieldname].flex = flex_out.toString();
        // this.section_break_data[res.fieldname].label = res.label
        if (res.label || !res.label) {
          if (!res.label) {
            this.section_break_data[res.fieldname].label = undefined;
          }
          else {
            this.section_break_data[res.fieldname].label = res.label
          }
        }
        this.test_section_break_data.push(res.fieldname);
        this.test_section_break_name.push(res.fieldname);
        this.each_sec_data = [];
      //  console.log(this.section_break_data)
        // this.section_break_data[this.store_field_name] = this.each_sec_data;
        // this.section_break_data[this.store_field_name].count = this.count + 1;
        // let p__flex = ((100 / (this.count + 1)) + '%');
        // let flex_out = "0 0 calc(" + p__flex + " " + "-" + " " + this.flex_margin + ")";
        // // console.log("percent", p__flex)
        // this.section_break_data[this.store_field_name].flex = flex_out.toString();
        // if (res.label) {
        //   this.section_break_data[this.store_field_name].label = res.label
        // }
        // if (!this.section_break_name.includes(this.store_field_name)) {
        //   this.section_break_name.push(this.store_field_name);
        // }
        // console.log(this.k)
        // console.log("All section data", this.section_break_data)
        // console.log(this.section_break_name);
      }
    });

    if (!this.store_field_type.includes("Section Break")) {
      this.info.map(res => {
        if (res.fieldtype != "Column Break") {
          this.no_sec_col.push(res);
        }
      })
    }
  }
  //End


  // Check and assign a section brake fields into another section break if section comes without label
  label_name;
  section_break_data_2 = undefined;
  count = 0;
  check_assign_sec_break() {
    // console.log(this.test_section_break_name);
    return new Promise<void>((resolve, reject) => {
      this.test_section_break_name.map((res, index) => {
        if (this.section_break_data[res] && this.section_break_data[res].label) {
          this.label_name = res;
        } else if (this.section_break_data[res] && !this.section_break_data[res].label) {
          // console.log("error", res)
          // console.log("each field", this.section_break_data[res])
          // console.log("each label_name", this.section_break_data[this.label_name])
          this.section_break_data[res].map(name => {
            // console.log("__________________________________________________________________sec data",name)
            this.section_break_data[this.label_name].push(name);
          })
          // // console.log("delete sections", this.section_break_data[res]);
          delete this.section_break_data[res];
          let index_value = this.test_section_break_data.indexOf(res)
          this.test_section_break_data.splice(index_value, 1);
        }
      })
      resolve();
    })
    // this.section_break_name = this.test_section_break_data
    // this.section_break_data_2 = this.section_break_data;
    // console.log("All section data-2", this.section_break_data)
    //   console.log('sec name', this.section_break_name)
  }


  // Assign final data ref
  async assign_final_data() {
    await this.check_assign_sec_break();
    this.section_break_name = this.test_section_break_data
    this.section_break_data_2 = this.section_break_data;
    // console.log("section name", this.section_break_name)
    // console.log("All section data-2", this.section_break_data)
  }

// user IP address
ip_address:any;
posted_from;
browser_name;
  getIp(){
    this.http.get<{ip:string}>('https://jsonip.com').subscribe( data => {
     this.ip_address=data.ip
    })
  }

  get_device_type(){
    // console.log("_____________Device",this.db.check_device_type())
    this.posted_from=this.db.check_device_type();
    // this.posted_from='Website'
    if(this.posted_from == 'Mobile Web' || this.posted_from == 'Website'){
    let browser_name=this.getBrowser().split('/')
    if(browser_name && browser_name[0] != "unknown"){
      this.browser_name=browser_name[0]
    }
  }
  }

  getBrowser = () => {
    const userAgent = navigator.userAgent;
    let browser = "unkown";
    // Detect browser name
    browser = (/ucbrowser/i).test(userAgent) ? 'UCBrowser' : browser;
    browser = (/edg/i).test(userAgent) ? 'Edge' : browser;
    browser = (/googlebot/i).test(userAgent) ? 'GoogleBot' : browser;
    browser = (/chromium/i).test(userAgent) ? 'Chromium' : browser;
    browser = (/firefox|fxios/i).test(userAgent) && !(/seamonkey/i).test(userAgent) ? 'Firefox' : browser;
    browser = (/; msie|trident/i).test(userAgent) && !(/ucbrowser/i).test(userAgent) ? 'IE' : browser;
    browser = (/chrome|crios/i).test(userAgent) && !(/opr|opera|chromium|edg|ucbrowser|googlebot/i).test(userAgent) ? 'Chrome' : browser;;
    browser = (/safari/i).test(userAgent) && !(/chromium|edg|ucbrowser|chrome|crios|opr|opera|fxios|firefox/i).test(userAgent) ? 'Safari' : browser;
    browser = (/opr|opera/i).test(userAgent) ? 'Opera' : browser;

    // detect browser version
    switch (browser) {
        case 'UCBrowser': return `${browser}/${this.browserVersion(userAgent,/(ucbrowser)\/([\d\.]+)/i)}`;
        case 'Edge': return `${browser}/${this.browserVersion(userAgent,/(edge|edga|edgios|edg)\/([\d\.]+)/i)}`;
        case 'GoogleBot': return `${browser}/${this.browserVersion(userAgent,/(googlebot)\/([\d\.]+)/i)}`;
        case 'Chromium': return `${browser}/${this.browserVersion(userAgent,/(chromium)\/([\d\.]+)/i)}`;
        case 'Firefox': return `${browser}/${this.browserVersion(userAgent,/(firefox|fxios)\/([\d\.]+)/i)}`;
        case 'Chrome': return `${browser}/${this.browserVersion(userAgent,/(chrome|crios)\/([\d\.]+)/i)}`;
        case 'Safari': return `${browser}/${this.browserVersion(userAgent,/(safari)\/([\d\.]+)/i)}`;
        case 'Opera': return `${browser}/${this.browserVersion(userAgent,/(opera|opr)\/([\d\.]+)/i)}`;
        case 'IE': const version = this.browserVersion(userAgent,/(trident)\/([\d\.]+)/i);
            return version ? `${browser}/${parseFloat(version) + 4.0}` : `${browser}/7.0`;
        default: return `unknown/0.0.0.0`;
    }
}

browserVersion (userAgent,regex){
    return userAgent.match(regex) ? userAgent.match(regex)[2] : null;
}


  // Save submitted data
  save_details() {
    // console.log("_______api doctype", this.form_data.get('terms_condt'))
    // console.log("from data", this.form_data)
    this.submitted = true;
    // setTimeout(() => {     //Delay the api call for attach and getting image api call response for get the URL of image and attach to image field 
    if (this.image_field_check == "no uploads" || this.image_field_check == "true") {
      // Store empty variables
      this.info.map(res => {
        // if (res.fieldtype == "Attach" || res.fieldtype == "Attach Image") {
        //   this.form_data.value[res.fieldname] = {
        //     filename: "",
        //     filedata: ""
        //   }
        // } 
        if (res.fieldtype == 'Check') {
          // console.log('checking', this.form_data.value[res.fieldname])
          if (this.form_data.value[res.fieldname]) {
            this.form_data.value[res.fieldname] = 1
            // console.log('if value checked', this.form_data.value[res.fieldname])
          } else if (!this.form_data.value[res.fieldname]) {
            this.form_data.value[res.fieldname] = 0
          }
        }
      });
      //To store the base 64 converted image in the current form data
      this.field_name.map((res, index) => {
        // this.form_data.value[res] = this.base64_url[index]
        // this.form_data.value[res] = {
        //   filename: this.file_name[index],
        //   filedata: this.base64_url[index]
        // 
        this.form_data.value[res] = this.file_name[index]
      })
      this.signature_fieldname.map((res, index) => {
        this.form_data.value[res] = this.signature_base64_url[index]
      })
      // End
      // console.log('value', this.form_data)
    
      // console.log('my form', this.form_data)
      // console.log('Email', this.form_data.get('email_id'))
      // console.log('title', this.form_data.get('title'))
      // console.log('category', this.form_data.get('category'))
      // console.log('value', this.form_data)
      // console.log(this.form_data.get('category').errors.required);
      // console.log('image', this.categoryimagedata)
      // console.log('image', this.field_name, this.base64_url)
      // console.log('field', this.signature_fieldname)
      // console.log('img', this.signature_base64_url)
      // && this.captcha
      //  
      if (this.form_data.status == "VALID" && !this.retrict_duplicate && this.captcha) {
        this.retrict_duplicate=true;
        // alert("Valid")
        let data = {};
        data['posted_from']=this.posted_from
        data['ip_address']=this.ip_address
        data['browser']=this.browser_name
        this.info.map(res => {
          // console.log(this.form_data.value['title'])
          if (res.fieldtype != "Column Break" && res.fieldtype != "Section Break" && res.fieldtype != "Table") {
            data[res.fieldname] = this.form_data.value[res.fieldname]
          }
        })

        //  Find snd store the child field name
        const keys = Object.keys(this.child_data);
        keys.map(ress => {
          data[ress] = this.child_data[ress];
        })
        // console.log("key", keys)
        // console.log("final sent data", data)
        let input_data = {
          responsedata: data
        }
        // console.log(this.db.doc_type);
        // let input_data = JSON.stringify({ responsedata: data })
        if (this.isModel) {
          this.db.update_form_data(data, this.edit_data_details.name).subscribe(res => {
            if (res.data && res.data.name) {
              this.db.alert('Updated Successfully');
              this.form_data.reset();
              this.db.doc_type = "";
              this.child_data = {};
              this.test_child_data = {};
              this.submitted = false;
              this.image_field_check == "true"
              this.isModel ? this.db.close_modal() : null
              this.captcha = false;
              this.set_email_id();
            }
            else{
              this.retrict_duplicate = false;
              this.db.alert('Sorry, We are unable to process your request. Please contact our admin');
            }
          });
        } else {
          data['is_active'] = true
          this.db.post_form_data(data).subscribe(res => {
            if (res.data.is_active == 1) {
              this.db.alert('Ad Submitted Successfully');
              this.db.ads_response = res.data
              // this.router.navigateByUrl('/myaccount/active')
              this.router.navigateByUrl('/success/'+this.current_path)
              // this.db.presentAlert('/' + this.doctype.toLowerCase() + 's');
              this.form_data.reset();
              this.db.doc_type = "";
              this.child_data = {};
              this.test_child_data = {};
              this.submitted = false;
              this.image_field_check == "true"
              this.captcha = false;
              this.set_email_id();
            }
            else{
              this.retrict_duplicate = false;
              this.db.alert('Sorry, We are unable to process your request. Please contact our admin: info@miindia.com');
            }
          })
        }

        // this.db.post_form_data(data).subscribe(res => {
        //   // console.log("final response", res)
        //   if (res.data) {
        //     this.db.presentAlert('/' + this.doctype.toLowerCase() + 's');
        //     this.form_data.reset();
        //     this.child_data = {};
        //     this.test_child_data = {};
        //     this.submitted = false;
        //     this.image_field_check == "true"
        //   }
        // })
      }
    } else if (this.image_field_check == "false") {
      this.db.imageAlert();
    }
    // }, 1500);
  }



  //Image attach and Path finder 
  image_count = [];
  changeListener($event, fieldname): void {


    // if (this.field_name.includes(fieldname)) {
    //   this.field_name.map((d, index) => {
    //     if (d == fieldname) {
    //       // console.log(file.url)
    //       this.file_name=[]
    //     }
    //   })
    // }



    //this value will prevent with image data submit For waiting the image upload complete 
    this.image_count.push(fieldname);
    this.image_field_check = "false";

    // console.log('image event', $event.target.files.length)
    // console.log('last value', this.form_data.get(fieldname))
    // let data = this.form_data.get(fieldname)
    // console.log('last value', data.value)
    // console.log(fieldname) 

    this.readThis($event.target, fieldname);
    // this.readMultipleFile($event.target, fieldname);

  }



  readMultipleFile(inputValue: any, fieldname) {
    this.img_file_name = []
    if (inputValue.files.length > 0) {
      for (let i = 0; i <= inputValue.files.length - 1; i++) {
        // console.log(inputValue.files[i])
        var file: File = inputValue.files[i];
        var file_size = inputValue.files[i].size
        this.convertion(file_size, file, fieldname)
      }
    }

  }


  convertion(file_size, file, fieldname) {
    this.categoryfile = file.name
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      // console.log(myReader.result)
      this.categoryimagedata = myReader.result;
      // this.form_data.value[fieldname] = this.categoryimagedata

      // PUsh image base 64

      if (this.field_name.includes(fieldname)) {
        this.field_name.map((d, index) => {
          if (d == fieldname) {
            this.base64_url.splice(index, 1, this.categoryimagedata);
            this.field_name.splice(index, 1, fieldname);
          }
        })
      }

      else if (!this.field_name.includes(fieldname)) {
        this.field_name.push(fieldname);
        this.base64_url.push(this.categoryimagedata);
      }

      let img_data = {
        file_name: this.categoryfile,
        content: this.categoryimagedata,
        decode: "True",
        // file: this.categoryimagedata,
        // is_private: 0,
        // folder: "Home",
        // file_name:this.categoryfile
      }

      if (file_size <= 10000000) {  //10Mb in BYtes

        this.db.upload_image(img_data).subscribe(res => {

          let checks_rep = res ? true : false;

          let unique_name = res.data.name;

          if (checks_rep == true) {

            this.db.upload_image_url(unique_name).subscribe(url => {
              // console.log(url.data.file_url, "-----")
              let file_url = url.data.file_url

              if (url) {
                if (this.field_name.includes(fieldname)) {
                  this.field_name.map((d, index) => {
                    if (d == fieldname) {
                      this.img_file_name.push(file_url)
                      this.file_name.splice(index, 1, this.uniq(this.img_file_name));
                    }
                  })
                }

                else if (!this.field_name.includes(fieldname)) {
                  this.file_name.push(file_url)

                }

              }

              let index_v = this.image_count.indexOf(fieldname);
              this.image_count.splice(index_v, 1);
              if (this.image_count.length == 0) {
                this.image_field_check = "true";
              }

            })
          }
        })
      }
      else if (file_size > 10000000) {

        this.db.filSizeAlert();
          this.base64_url.splice(this.field_name.indexOf(this.field_name[fieldname]), 1);
          this.field_name.splice(this.field_name.indexOf(this.field_name[fieldname]), 1);
          let ind_v = this.image_count.indexOf(fieldname);
          this.image_count.splice(ind_v, 1);
          if (this.image_count.length == 0) {
            this.image_field_check = "true";
          }

        this.form_data.controls[fieldname].reset();

      }
      else if (file_size == 0) {
      }

    }
    myReader.readAsDataURL(file);
  }

  uniq(array) {
    return array.sort().filter(function (item, pos, ary) {
      return !pos || item != ary[pos - 1];
    });
  }



  readThis(inputValue: any, fieldname): void {
    // console.log(inputValue)
    // console.log("Size", inputValue.files[0].size)
    if (inputValue.files.length > 0) {
      var file: File = inputValue.files[0];
      var file_size = inputValue.files[0].size

      // console.log('file name', file.name)

      // Push file name

      // if (this.field_name.includes(fieldname)) {
      //   this.field_name.map((d, index) => {
      //     if (d == fieldname) {
      //       this.file_name.splice(index, 1, file.name);
      //       // this.file_name[index].push(file.name);
      //     }
      //   })
      // }
      // else if (!this.field_name.includes(fieldname)) {
      //   this.file_name.push(file.name)

      // }

      this.categoryfile = file.name
      var myReader: FileReader = new FileReader();

      myReader.onloadend = (e) => {
        // console.log(myReader.result)
        this.categoryimagedata = myReader.result;
        // this.form_data.value[fieldname] = this.categoryimagedata

        // PUsh image base 64

        if (this.field_name.includes(fieldname)) {
          this.field_name.map((d, index) => {
            if (d == fieldname) {
              this.base64_url.splice(index, 1, this.categoryimagedata);
              this.field_name.splice(index, 1, fieldname);
              // this.base64_url[index].push(this.categoryimagedata);
              // this.field_name[index].push(fieldname)
              // if(this.edit_data_details && this.edit_data_details[fieldname]){
              // this.edit_data_details[fieldname]=this.categoryimagedata}

            }
          })
        }

        else if (!this.field_name.includes(fieldname)) {
          this.field_name.push(fieldname);
          this.base64_url.push(this.categoryimagedata);
          // if(this.edit_data_details && this.edit_data_details[fieldname]){
          // this.edit_data_details[fieldname]=this.categoryimagedata}
        }
        // console.log('three', this.field_name, this.base64_url, this.file_name)
        // this.image = myReader.result;

        // Push file name

        let img_data = {
          // file: this.base64_binary(this.categoryimagedata),

          file_name: this.categoryfile,
          content: this.categoryimagedata,
          decode: "True",
          // file: this.categoryimagedata,
          // is_private: 0,
          // folder: "Home",
          // file_name:this.categoryfile
        }
        // console.log('Image data', this.categoryimagedata);


        if (file_size <= 10000000) {  //10Mb in BYtes

          this.db.upload_image(img_data).subscribe(res => {

            // console.log("img res", res.data.name)

            let checks_rep = res ? true : false;

            let unique_name = res.data.name;

            if (checks_rep == true) {

              this.db.upload_image_url(unique_name).subscribe(url => {

                let file_url = url.data.file_url

                if (url) {

                  if (this.field_name.includes(fieldname)) {
                    this.field_name.map((d, index) => {
                      if (d == fieldname) {
                        this.file_name.splice(index, 1, file_url);
                        // this.file_name[index].push(file.name);
                      }
                    })
                  }

                  else if (!this.field_name.includes(fieldname)) {
                    this.file_name.push(file_url)

                  }

                }

                //this value will prevent with image data submit For waiting the image upload complete 


                // this.image_field_check = "true";
                let index_v = this.image_count.indexOf(fieldname);
                // console.log("index value +========", index_v)
                this.image_count.splice(index_v, 1);
                // console.log("over all count", this.image_count)
                if (this.image_count.length == 0) {
                  this.image_field_check = "true";
                }

              })
            }
          })
        }

        else if (file_size > 10000000) { //10Mb in bytes

          // console.log("file size excced",file_size)
          this.db.filSizeAlert();
          this.base64_url.splice(this.field_name.indexOf(this.field_name[fieldname]), 1);
          this.field_name.splice(this.field_name.indexOf(this.field_name[fieldname]), 1);
          if(this.edit_data_details && this.edit_data_details[fieldname]){
            this.edit_data_details[fieldname]="";
          }
          let ind_v = this.image_count.indexOf(fieldname);
          this.image_count.splice(ind_v, 1);
          if (this.image_count.length == 0) {
            this.image_field_check = "true";
          }

          this.form_data.controls[fieldname].reset();

        }
        else if (file_size == 0) {

          // console.log("zero file size")
        }

      }
      myReader.readAsDataURL(file);
    }
  }


  // readThis(inputValue: any, fieldname): void {
  //   // console.log(inputValue)
  //   // console.log("Size", inputValue.files[0].size)
  //   if (inputValue.files.length > 0) {


  //     var file: File = inputValue.files[0];
  //     var file_size = inputValue.files[0].size

  //     // console.log('file name', file.name)

  //     // Push file name

  //     // if (this.field_name.includes(fieldname)) {
  //     //   this.field_name.map((d, index) => {
  //     //     if (d == fieldname) {
  //     //       this.file_name.splice(index, 1, file.name);
  //     //       // this.file_name[index].push(file.name);
  //     //     }
  //     //   })
  //     // }
  //     // else if (!this.field_name.includes(fieldname)) {
  //     //   this.file_name.push(file.name)

  //     // }

  //     this.categoryfile = file.name
  //     var myReader: FileReader = new FileReader();

  //     myReader.onloadend = (e) => {
  //       // console.log(myReader.result)
  //       this.categoryimagedata = myReader.result;
  //       // this.form_data.value[fieldname] = this.categoryimagedata

  //       // PUsh image base 64

  //       if (this.field_name.includes(fieldname)) {
  //         this.field_name.map((d, index) => {
  //           if (d == fieldname) {
  //             this.base64_url.splice(index, 1, this.categoryimagedata);
  //             this.field_name.splice(index, 1, fieldname);
  //             // this.base64_url[index].push(this.categoryimagedata);
  //             // this.field_name[index].push(fieldname)
  //           }
  //         })
  //       }

  //       else if (!this.field_name.includes(fieldname)) {
  //         this.field_name.push(fieldname);
  //         this.base64_url.push(this.categoryimagedata);
  //       }
  //       // console.log('three', this.field_name, this.base64_url, this.file_name)
  //       // this.image = myReader.result;

  //       // Push file name

  //       let img_data = {
  //         // file: this.base64_binary(this.categoryimagedata),
  //         file_name: this.categoryfile,
  //         content: this.categoryimagedata,
  //         decode: "True",
  //       }
  //       // console.log('Image data', this.categoryimagedata);


  //       if (file_size <= 10000000) {  //10Mb in BYtes

  //         this.db.upload_image(img_data).subscribe(res => {

  //           // console.log("img res", res.data.name)

  //           let checks_rep = res ? true : false;

  //           let unique_name = res.data.name;

  //           if (checks_rep == true) {

  //             this.db.upload_image_url(unique_name).subscribe(url => {

  //               let file_url = url.data.file_url

  //               if (url) {

  //                 if (this.field_name.includes(fieldname)) {
  //                   this.field_name.map((d, index) => {
  //                     if (d == fieldname) {
  //                       console.log(file_url)
  //                        this.img_file_name.push(file_url);
  //                       // this.file_name[index].push(file.name);
  //                     }
  //                   })
  //                 }

  //                 else if (!this.field_name.includes(fieldname)) {
  //                   this.file_name.push(file_url)

  //                 }

  //               }

  //               //this value will prevent with image data submit For waiting the image upload complete 


  //               // this.image_field_check = "true";
  //               let index_v = this.image_count.indexOf(fieldname);
  //               // console.log("index value +========", index_v)
  //               this.image_count.splice(index_v, 1);
  //               // console.log("over all count", this.image_count)
  //               if (this.image_count.length == 0) {
  //                 this.image_field_check = "true";
  //               }

  //             })
  //           }
  //         })
  //       }

  //       else if (file_size > 10000000) { //10Mb in bytes

  //         this.db.filSizeAlert();
  //         // this.image_field_check = "true";
  //         if (this.image_count.length == 0) {
  //           this.image_field_check = "true";
  //         }
  //         this.form_data.controls[fieldname].reset();

  //       }
  //       else if (file_size == 0) {

  //         // console.log("zero file size")
  //       }

  //     }
  //     myReader.readAsDataURL(file);
  //   }
  // }

  // Convert base 64 into binary image data
  base64_binary(dataURI) {

    var BASE64_MARKER = ';base64,';
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }

    return array;

  }


  // onclick Get Link Field Options

  // ref_doc = [];

  // res_data = [];

  // link_opts = [];

  // all_link_opts = {};

  // gen_links(refdoc, event) {

  //   // console.log("event", event)

  //   // console.log(this.all_link_opts);

  //   if (!this.ref_doc.includes(refdoc)) {

  //     this.link_opts = [];

  //     this.ref_doc.push(refdoc);

  //     this.db.ref_doc_type = refdoc;

  //     // console.log("ref doc type", refdoc)
  //     // console.log("Doctype", this.db.doc_type)

  //     // console.log(this.link_opts.length);
  //     // console.log(this.link_opts);

  //     this.db.get_link_field_options().subscribe(res => {

  //       // console.log("link field ", res.data)

  //       this.res_data = res.data

  //       this.res_data.map(res => {

  //         this.link_opts.push(res.name)

  //       })
  //     })
  //     this.all_link_opts[refdoc] = this.link_opts;

  //   }

  // }



  // Signature pad 

  // ngAfterViewInit() {
  //   this.signaturePad.set('minWidth', 2);
  //   this.signaturePad.clear();
  // }

  // clearSignature() {
  //   this.signaturePad.clear();
  // }

  // drawComplete(fieldname) {

  //   const base64Data = this.signaturePad.toDataURL();

  //   if (this.signature_fieldname.includes(fieldname)) {

  //     this.signature_fieldname = [];
  //     this.signature_base64_url = [];
  //   }

  //   this.signature_fieldname.push(fieldname);
  //   this.signature_base64_url.push(base64Data);
  //   this.signatureImg = base64Data;
  // }

  // not used functions

  // drawComplete() {
  //   console.log(this.signaturePad.toDataURL());
  // }

  // drawStart() {
  //   console.log('begin drawing');
  // }


  // savePad() {
  //   const base64Data = this.signaturePad.toDataURL();
  //   this.signatureImg = base64Data;
  // }

  // signature End

  // To split the number of options

  // count = 0;
  // all_options = [];
  // temp_store = [];

  // no_of_options(options) {

  //   this.count = this.count + 1

  //   console.log("count", this.count)
  //   console.log("all options", this.all_options)
  //   console.log("temp", this.temp_store)

  //   if (!this.temp_store.includes(this.all_options)) {

  //     this.all_options = options.split("\n")

  //     this.temp_store = this.all_options

  //     // console.log('ALLoptions', all_options)

  //     this.all_options.map(res => {

  //       console.log('options', res)
  //       // document.getElementById("select-options").innerHTML = "<ion-select-option>" + res + "</ion-select-option>"
  //       // let html_var = "<ion-select-option></ion-select-option>"
  //       // var node = document.createElement("<ion-select-option></ion-select-option>")
  //       // var textnode = document.createTextNode(res);
  //       // node.appendChild(textnode);
  //       // document.getElementById("select-options").appendChild(node);
  //       document.getElementById("select-options").innerHTML += "<ion-select-option>" + res + "</ion-select-option>"

  //     })
  //   }
  // let html_var = "<ion-select-option></ion-select-option>";
  // var textnode = document.createTextNode(all_options[0]);
  // node.appendChild(textnode);
  // var node = document.createElement(html_var);
  // document.getElementById("select-options").appendChild(node);

  // document.getElementById("select-options").innerHTML = "<ion-select-option>" + all_options[0] + "</ion-select-option>"
  // document.getElementById("select-options").innerHTML = "<ion-select-option>" + all_options[1] + "</ion-select-option>"

  // }


  // separate_option(options) {
  //   // let temp = ''
  //   // console.log(options)
  //   this.all_options = options.split("\n");
  //   // this.all_options.map(res => {
  //   //   temp  = res
  //   // })
  //   return this.all_options;
  // }

  // changed(event) {
  //   console.log(event.detail.value)
  // }




  // Child table function to get json data of child table
  all_child_data = [];
  c_field_name;
  child_data = {};
  each_child_data;
  child_table_field_name = [];
  child_header_label = [];
  header_flex_margin: string = "0px";
  test_child_data = {};

  store_header() {
    this.info.map((res, index) => {
      res.child_header = [];
      res.child_fields = [];
      if (res.fieldtype == "Table") {
        let child_table_name = res.options
        let doc_name: string = '';
        let table_array = child_table_name.split(" ");
        table_array.map(res => {
          doc_name = doc_name.concat(res + '+')
        })

        doc_name = doc_name.substring(0, doc_name.length - 1)
        this.db.get_doc_data(doc_name).subscribe(respon => {
          let header_data = respon.docs[0].fields
          if (header_data) {
            header_data.map(header => {
              if (header.in_list_view) {
                res.child_header.push(header);
                this.child_header_label.push(header);

              }
            })
            let p__flex = ((100 / (this.child_header_label.length)) + '%');
            let flex_out = "0 0 calc(" + p__flex + " " + "-" + " " + this.header_flex_margin + ")";
            this.child_header_label = [];
            res.child_header.map(flex_res => {
              flex_res.flex = flex_out;
            })
          }
        })
      }
    })
  }


  // Modal pop-up
  store_child_fields = {};
  arrayFields = [];
  open_child_modal(child_table_name, child_field_name) {
    let doc_name: string = '';
    let table_array = child_table_name.split(" ");

    table_array.map(res => {
      doc_name = doc_name.concat(res + '+')
    })

    doc_name = doc_name.substring(0, doc_name.length - 1)
    let modal_class;
    if (this.db.ismobile) {
      modal_class = "mbl-webformchildPopup"
    } else if (!this.db.ismobile) {
      modal_class = "webformchildPopup"
    }

    // this.db.get_doc_data(doc_name).subscribe(res => {
    //   if (res) {
    //     this.pop_up_child(res, child_table_name, child_field_name, modal_class);
    //   }
    // })

    if (!this.arrayFields.includes(child_field_name)) {
      this.arrayFields.push(child_field_name);
      this.db.get_doc_data(doc_name).subscribe(res => {
        if (res) {
          this.pop_up_child(res, child_table_name, child_field_name, modal_class);
        }
        this.store_child_fields[child_field_name] = res;

      })
    } else if (this.arrayFields.includes(child_field_name)) {
      this.pop_up_child(this.store_child_fields[child_field_name], child_table_name, child_field_name, modal_class);
    }
  }


  async pop_up_child(alldata, child_table_name, child_field_name, modal_class) {
    const modal = await this.modalCtrl.create({
      component: WebformChildPage,
      cssClass: modal_class,
      componentProps: {
        all_data: alldata,
        child_table_name: child_table_name,
        child_table_field_name: child_field_name,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.each_child_data = data.form_data;
      if (this.child_data[data.child_table_field_name]) {
        this.child_data[data.child_table_field_name].push(this.each_child_data)
        this.test_child_data = this.child_data;

      } else if (!this.child_data[data.child_table_field_name]) {
        this.all_child_data = [];
        this.all_child_data.push(this.each_child_data);
        this.child_data[data.child_table_field_name] = this.all_child_data
        this.test_child_data = this.child_data;
      }
    }
  }

  // Edit Form popup
  edit_child_modal(all_values, child_table_name, child_field_name, index_value) {
    // let doc_name: string = '';
    // let table_array = child_table_name.split(" ");
    // table_array.map(res => {
    //   // console.log(res)
    //   doc_name = doc_name.concat(res + '+')
    //   // console.log(doc_name);
    // })
    // doc_name = doc_name.substring(0, doc_name.length - 1)

    let modal_class;
    if (this.db.ismobile) {
      modal_class = "mbl-editwebformchildPopup";
    } else if (!this.db.ismobile) {
      modal_class = "editwebformchildPopup";
    }

    // this.db.get_doc_data(doc_name).subscribe(res => {
    //   if (res) {
    //     this.edit_pop_up_child(all_values, res, child_table_name, child_field_name, index_value, modal_class);
    //   }
    // })
    this.edit_pop_up_child(all_values, this.store_child_fields[child_field_name], child_table_name, child_field_name, index_value, modal_class);
  }


  async edit_pop_up_child(all_values, alldata, child_table_name, child_field_name, index_value, modal_class) {
    const modal = await this.modalCtrl.create({
      component: EditWebformchildPage,
      cssClass: modal_class,
      componentProps: {
        all_data: alldata,
        child_table_name: child_table_name,
        child_table_field_name: child_field_name,
        all_values: all_values,
        index_value: index_value
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.child_data[data.child_table_field_name][index_value] = data.form_data;
      // this.ref.detectChanges();
    }
  }


  // Select and unselect the list of child tables
  select_unselect(data, alldata, index_value) {
    if (data.select) {
      if (data.select == 1) {
        data.select = 0;
      } else if (data.select == 0) {
        data.select = 1;
        data.index_value = index_value;
      }
    } else if (!data.select) {
      data.select = 1;
      data.index_value = index_value;
    }

    this.overall_select_unselect(alldata, index_value);
  }

  overall_select_unselect(alldata, index_value) {
    let over_all_values = [];
    alldata.map(s => {
      if (s.select) {
        over_all_values.push(s.select)
      } else if (!s.select) {
        s.select = 0;
        over_all_values.push(s.select)
      }
    })

    if (over_all_values.includes(1)) {
      alldata.select = 1;
    } else if (!over_all_values.includes(1)) {
      alldata.select = 0;
    }

    this.all_select_unselect(over_all_values, alldata);
  }


  // Assign a valuse for select all and unselect all 
  all_select_unselect(values, alldata) {
    if (!values.includes(0)) {
      alldata.select_all = 1;
    } else if (values.includes(0)) {
      alldata.select_all = 0;
    }
  }


  // Select all and unselect all
  select_all(alldata) {
    alldata.map(s => { s.select = 1; })
    alldata.select_all = 1;
    alldata.select = 1;
  }

  unselect_all(alldata) {
    alldata.map(s => { s.select = 0; })
    alldata.select_all = 0;
    alldata.select = 0;
  }


  // delete records
  delete_records(alldata, fieldname) {
    alldata.select = 0;
    if (alldata.select_all == 0) {
      alldata.map(del => {
        if (del.select == 1) {
          // this.test_child_data[fieldname].splice(del.index_value, 1);
          this.child_data[fieldname].splice(del.index_value, 1);
        }
      })
    } else if (alldata.select_all == 1) {
      this.child_data[fieldname] = [];
    }
  }


  nav_by_breadcrumb() {
    this.router.navigateByUrl("/" + this.current_path);
  }

  cancel_details() {
    this.form_data.reset();
    this.child_data = {};
    this.test_child_data = {};
    this.submitted = false;
    this.image_field_check == "true"
    this.isModel ? this.db.close_modal() : this.router.navigateByUrl('/' + this.doctype.toLowerCase() + 's')
  }



  


  // @HostListener('window:resize', ['$event'])
  // private func() {
  //   this.db.check_mobile();
  // }

  public resolved(captchaResponse: string): void {
    this.captcha = true;
    // console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    // console.log(`reCAPTCHA error encountered; details:`, errorDetails);
    this.captcha = false;
  }



  // async openDetail(){
  //   this.location.replaceState('/terms/terms-and-condition')
  //   const modal = await this.modalCtrl.create({
  //     component: TermsPage,
  //     cssClass:'message-detail', 
     
  //   })
  //   await modal.present();      
  //   let data = await modal.onWillDismiss();
  //   if(data){
  //     this.db.side_menu = true;
  //     if(data.data == 'success'){
  //       //  console.log(data,'sucess');
  //     }
  //   }
  // }


  set_email_id(){
    Object.keys(this.form_ctrl_data).map(key => {
      if(key == 'email'){
        this.form_ctrl_data[key].setValue(localStorage.user_email_id)
      }
    })
  }

 
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    // console.log('Back button pressed');
    $("ion-select-popover").hide();
    $("popover-content").hide();
  }

}
