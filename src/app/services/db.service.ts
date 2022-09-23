import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import $ from 'jquery';
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
  Platform,
} from '@ionic/angular';
import { ReferenceSiteComponent } from '../components/reference-site/reference-site.component';
import { LocationStrategy } from '@angular/common';
@Injectable({
  providedIn: 'root'
})

export class DbService {
  domain = "core.go1cms.com";
  domainurl = "core.go1cms.com"

  baseUrl = `https://${this.domainurl}/`;
  baseResource = `https://${this.domainurl}/api/resource/`;
  baseMethod = `https://${this.domainurl}/api/method/`;

  driver_proofs: any
  businessId: "BS-00001";
  current_page_builder_data;
  viewContent = [];
  ismobile;
  website_settings: any = {};
  business_info: any = {};
  category_list;
  httpOptions;
  httpHeaders;
  category_id = [];
  category = [];
  understand = false;
  submitted_data = false
  path;
  scroll_event: any = { desktop_header: true, mobile_header: false, no_search_icon: false }; //Scrol
  modal = false;
  android = false;
  location;
  header_info;
  video_header = false;
  childs: any = {}; //Selected child attributes
  product_box = { view: 'Grid View', row_count: 4 }
  footer_info;
  slider_button = true;
  secondary_header = true;
  doc_type;
  ref_doc_type;
  ad_name;
  header_menu;
  ads_response: any
  location_array: any = [];
  counter_value = false
  recaptcha_key = '6LfUpoQhAAAAAKTvG1ENhVPAWZ1UEZFXkrrGVd5o'
  header_within_slider = 1;
  transparent_header;
  sub_header_data;
  // ui_block = new Subject();

  //bala


  constructor(private http: HttpClient, private alertCtrl: AlertController, private platform: Platform, private router: Router, private navCtrl: NavController, private modalCtrl: ModalController, private loadingCtrl: LoadingController, private locationStrategy: LocationStrategy) {
    // this.get_parent_category();
  }

  async alert(data) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: data,
      buttons: ['Ok']
    })
    await alert.present();
  }

  checkmobile() {
    let width = this.platform.width();
    // console.log("Screen resized..", width);
    if (width > 768) {
      this.ismobile = false;
      return false
    } else if (width < 768) {
      this.ismobile = true;
      return true;
    }
  }

  route_url(url) {
    if (url) {
      if (url.indexOf('https') == -1) {
        this.router.navigateByUrl(url);
      } else if (url.indexOf('https') == 0) {
        window.open(url, '_blank');
      }
    }
  }

  

  scrolled(data) {

    // console.log(data.detail.scrollTop);
    if (data.detail.scrollTop < 40) {
      this.scroll_event.sticky_header = false;
    } else {
      this.scroll_event.sticky_header = true;
    }

    if (data.detail.scrollTop < 50) {
      this.scroll_event.transparent_header = false;
    } else {
      this.scroll_event.transparent_header = true;
    }

    if (data.detail.scrollTop < 110) {
      setTimeout(() => { this.scroll_event.header_sticky_on_top = false }, 300);
    } else {
      setTimeout(() => { this.scroll_event.header_sticky_on_top = true }, 300);
    }


    if (data.detail.scrollTop < 150) {
      this.scroll_event.desktop_header = true;

    } else {
      this.scroll_event.desktop_header = false
    }

    if (data.detail.scrollTop < 200) {
      this.scroll_event.mobile_header = false;
    } else {
      this.scroll_event.mobile_header = true;
    }

    // let i = 0;

    if (data.detail.scrollTop > 235) {
      this.scroll_event.header_sticky = true
      // setTimeout(()=>{ this.scroll_event.header_sticky = true },400);
    }

    if (data.detail.scrollTop == 0 || data.detail.scrollTop < 40) {
      this.scroll_event.header_sticky = false
    }


  }

  header_checking() {
    this.scroll_event.header_sticky = false;
    this.scroll_event.sticky_header = false;
    this.scroll_event.transparent_header = false;
  }

  isInViewport(class_name) {
   
  }

  product_img(data) {
    if (data) {
      if (data.indexOf('https') == -1) {
        return this.baseUrl + data;
      } else if (data.indexOf('https') == 0) {
        return data
      }
    }
  }

  img_style(data, type) {
    if (type == 'color') {
      return { 'background': data };
    } else if (type == 'img') {
      return { 'background': 'url(' + this.product_img(data) + ')center center / 100% auto no-repeat', 'background-size': 'contain' };
    } else if (type == 'colorcode') {
      return { 'color': data };
    } else if (type == 'bgcolor') {
      return { 'background': data, 'color': data };
    } else if (type == 'full-bg-img') {
      return { 'background': 'url(' + this.product_img(data) + ') no-repeat', 'background-size': 'contain !important' }
    } else if (type == 'bg-image') {
      return { 'background': 'url(' + this.product_img(data) + ') no-repeat' }
    } else if (type == 'full-bg-img__') {
      return { 'background': 'url(' + this.product_img(data) + ') no-repeat', "min-height": "260px", "background-size": "cover", "position": "relative" };
    } else if (type == 'color__') {
      return { 'background': data, "min-height": "260px", "position": "relative" };
    } else if (type == 'width') {
      return { 'width': data };
    } else if (type == 'margin') {
      return { 'margin': data };
    }
  }


  check_footer() {

    let data;
    if (this.footer_info && this.footer_info.length != 0) {
      this.footer_info.map((res, i) => {

        if (res.section_name == 'Footer Social Links' && res.section_type == 'Static Section') {
          data.Footer_Social_Links = res;
          // this.footer_info.splice(i);
          // this.footer_info.splice(2);
        } else if (res.section_name == 'Footer Download App' && res.section_type == 'Static Section') {
          data.Footer_Download_App = res;
          // this.footer_info.splice(i);
          // this.footer_info.splice(2);
        }
        else {
          data = res;
        }
      })

      this.footer_info = this.footer_info.filter(item => item.section_name !== 'Footer Social Links');
      this.footer_info = this.footer_info.filter(item => item.section_name !== 'Footer Download App')

    }
    // console.log(this.footer_info)
  }

  favIcon: HTMLLinkElement = document.querySelector('#appIcon');


  get_home_data() {
    var data = {
      application_type: this.ismobile ? "mobile" : "web",
      domain: this.domainurl,
      route: "core-home",
      // route : "landing-page",
      business: ""
    }
    this.get_mobile_homepage(data).subscribe(res => {
      this.current_page_builder_data = data.application_type
      this.viewContent = res.message.page_content;
      this.sub_header_data = res.message.sub_header;
      this.check_header_footer(this.viewContent, res);
     

    },
      error => {
        // console.log(JSON.stringify(errSor.json())); 
      })
  }





  get_parent_category() {

    var data = { domain: this.domainurl, show_count: 1 }
    if (this.category.length == 0) {
      this.get_parent_categories(data).subscribe(data => {
        this.category = data.message;
      });
    }
  }


  check_header_footer(content_data, data) {

    content_data.map(res => {

      if (res.layout_json) {
        res.layout_json = JSON.parse(res.layout_json);
      }

      if (res.btn != undefined || res.btn != null) {
        res.btn ? res.btn_text = JSON.parse(res.btn) : '';
      }

      if (res.btn1 != undefined || res.btn1 != null) {
        res.btn1 ? res.btn_text1 = JSON.parse(res.btn1) : '';
      }
    })

    if (data.message && data.message.header_content) {
      this.header_info = data.message.header_content;
      this.header_info.layout_json = JSON.parse(this.header_info.layout_json);
      this.check_header_layout();
    } else {

      if (this.website_settings && this.website_settings.header_template) {
        this.header_info = this.website_settings.header_template;
      } else {
        this.get_website_settings();
      }
    }

    if (data.message && data.message.footer_content) {
      this.footer_info = data.message.footer_content;
      this.footer_info.layout_json = JSON.parse(this.footer_info.layout_json);
      this.check_footer_layout();
    } else {
      if (this.website_settings && this.website_settings.footer_template) {
        this.footer_info = this.website_settings.footer_template;
        this.footer_info.layout_json = JSON.parse(this.footer_info.layout_json);
        this.check_footer_layout();

      } else {
        this.get_website_settings();
      }
    }

  }


  get_website_settings() {
    this.get_all_website_settings().subscribe(res => {
      this.website_settings = res.message;
      this.favIcon.href = (this.website_settings.theme_settings && this.website_settings.theme_settings.favicon) ? this.product_img(this.website_settings.theme_settings.favicon) : '';
      this.category_list = this.website_settings.additional_menus;


      this.header_info = (this.website_settings && this.website_settings.header_template) ? this.website_settings.header_template : undefined;
      if (this.header_info) {
        this.header_info.layout_json = JSON.parse(this.header_info.layout_json);
      }

      this.footer_info = (this.website_settings && this.website_settings.footer_template) ? this.website_settings.footer_template : undefined;
      if (this.footer_info) {
        this.footer_info.layout_json = JSON.parse(this.footer_info.layout_json);
      }

      this.check_footer_layout();
      this.check_header_layout();
    })

  }

  check_footer_layout() {
    if (this.footer_info.layout_json) {
      this.footer_info.layout_json.map(res => {
        res.columns.map((rec, index) => {
          let check = this.footer_info.items.find(res => res.column_index == index);
          if (check)
            rec.layout_data = check.items;
        })
      })
    }
  }

  check_header_layout() {

    this.header_info.layout_json.map(res => {
      res.columns.map((rescol, index) => {
        let data = this.header_info.items.find(res => res.column_index == index)
        if (data) {
          if (this.header_info.call_to_action_button == 1 && (data.section_name == 'Header Button' && data.section_type == 'Static Section')) {
            rescol.layout_data = data;
            let values = { button_link: this.header_info.button_link, button_text: this.header_info.button_text, link_target: this.header_info.link_target };
            rescol.layout_data = { ...rescol.layout_data, ...values };
          } else {
            rescol.layout_data = data;
            if (data.section_name == 'Header Menu' && data.section_type == 'Menu') {
              this.header_info.menu = data;
            }
          }
        }
      })
    })
  }


  back() {
    if (this.modal) {
      this.modal = false;
      this.modalCtrl.dismiss();
    } else {
      this.navCtrl.back();
    }
  }

  get_business_info() {
    let data = { "name": this.businessId ? this.businessId : 'BS-00001' }
    this.get_business_detail(data).subscribe(res => {
      this.business_info = res.message[0]
    })
  }

  get(endpoint: string) {
    if (localStorage.api_key != undefined) {
      this.httpHeaders = new HttpHeaders({ 'mode': 'no-cors', 'Authorization': 'token ' + localStorage.api_key + ":" + localStorage.api_secret });
    }
    return this.http.get(endpoint, this.httpOptions);
  }

  postmethod(endpoint: string, data) {
    if (localStorage.api_key != undefined) {
      this.httpHeaders = new HttpHeaders({ 'Authorization': 'token ' + localStorage.api_key + ":" + localStorage.api_secret });
    }
    if (localStorage.customerRefId && localStorage.api_key) {
      this.httpOptions = ({ headers: this.httpHeaders });
    } else {
      this.httpOptions = {};
    }
    return this.http.post(endpoint, data, this.httpOptions);
  }

  async open_site(url) {
    const modal = await this.modalCtrl.create({
      component: ReferenceSiteComponent,
      cssClass: 'reference-site',
      componentProps: { url: url }
    })
    await modal.present();
    let data = await modal.onWillDismiss();
    if (data) {
      if (data.data == 'success') {
      }
    }
  }

  get_mobile_homepage(data): Observable<any> {
    let endpoint = "go1_cms.go1_cms.api.get_page_content"
    // let endpoint= 'ecommerce_business_store.ecommerce_business_store.mobileapi.get_mobile_home_page';
    // let endpoint= 'ecommerce_business_store.ecommerce_business_store.mobileapi.get_page_content';
    // return this.postmethod(this.baseMethod+endpoint,data)
    return this.http.post(this.baseMethod + endpoint, data)
  }

  get_blog_details(data): Observable<any> {
    let endpoint = 'ecommerce_business_store.ecommerce_business_store.api.get_blog_details';
    return this.http.post(this.baseMethod + endpoint, data);
  }

  get_all_blog_list(data): Observable<any> {
    let endpoint = 'ecommerce_business_store.ecommerce_business_store.api.get_blog_list';
    return this.http.post(this.baseMethod + endpoint, data);
  }

  get_parent_categories(data): Observable<any> {
    let endpoint = 'ecommerce_business_store.ecommerce_business_store.api.get_parent_categories';
    return this.postmethod(this.baseMethod + endpoint, data);
  }

  get_all_website_settings(): Observable<any> {
    // let endpoint = 'ecommerce_business_store.ecommerce_business_store.api.get_all_website_settings';
    let endpoint = 'go1_cms.go1_cms.api.get_all_website_settings';
    return this.get(this.baseMethod + endpoint);
  }

  gallery_list(): Observable<any> {
    let doc_type = 'Gallery';
    let endpoint = doc_type + `?fields=["title","name","cover_image"]`;
    return this.http.get(this.baseResource + endpoint);
  }

  gallery_detail(data): Observable<any> {
    let doc_type = 'Gallery';
    let endpoint = doc_type + '/' + data + `?fields=["title","cover_image","gallery"]`;
    return this.http.get(this.baseResource + endpoint);
  }

  get_doctype_datas(data): Observable<any> {
    let endpoint = data
    return this.get(this.baseMethod + endpoint);
  }

  get_doctype_data(data): Observable<any> {
    let endpoint = data
    return this.get(this.baseResource + endpoint);
  }

  get_business_detail(data): Observable<any> {
    let endpoint = 'ecommerce_business_store.ecommerce_business_store.mobileapi.get_business_detail';
    return this.postmethod(this.baseMethod + endpoint, data);
  }

  get_all_route(data): Observable<any> {
    let endpoint = 'ecommerce_business_store.ecommerce_business_store.mobileapi.get_all_route';
    return this.postmethod(this.baseMethod + endpoint, data);
  }

  insert_admission(data, doctype): Observable<any> {
    let doc_type = doctype
    let endpoint = doc_type;
    return this.http.post(this.baseResource + endpoint, data);
  }

  get_page_side_menu_data(data): Observable<any> {
    let endpoint = 'go1_cms.go1_cms.api.get_page_side_menu_data';
    return this.postmethod(this.baseMethod + endpoint, data);
  }

  insert_contact_form(data): Observable<any> {
    let endpoint = 'ecommerce_business_store.ecommerce_business_store.api.contactform';
    return this.postmethod(this.baseMethod + endpoint, data);
  }

  // Upload image 
  upload_image(data: any): Observable<any> {
    let endpoint = "File";
    return this.postmethod(this.baseResource + endpoint, data);
  }

  web_form_dynamic(data): Observable<any> {
    let endpoint = "Web Form/" + data;
    return this.get(this.baseResource + endpoint);
  }

  get_doc_data(doc_name): Observable<any> {
    let endpoint = "frappe.desk.form.load.getdoctype?doctype=";
    return this.getmethod(this.baseMethod + endpoint + doc_name);
  }


  // Get
  page_length = "?limit_page_length=100&order_by=name%20asc"
  get_link_field_options(): Observable<any> {
    let endpoint = this.ref_doc_type + this.page_length;
    return this.getmethod(this.baseResource + endpoint);
  }

  filter;
  get_link_field_options_parent(refdoc): Observable<any> {
    let endpoint = this.ref_doc_type + this.filter;
    return this.getmethod(this.baseResource + endpoint);
  }

  get_link_field_options_child(refdoc): Observable<any> {
    let endpoint = this.ref_doc_type + this.filter;
    return this.getmethod(this.baseResource + endpoint);
  }


  get_link_field_options_wArg(doc_name): Observable<any> {
    let endpoint = doc_name + this.page_length + '&order_by=name%20asc';
    return this.getmethod(this.baseResource + endpoint);
  }

  update_form_data(data, id): Observable<any> {
    let endpoint = this.doc_type + '/' + id;
    return this.putmethod(this.baseResource + endpoint, data);
  }

  post_form_data(data: any): Observable<any> {
    let endpoint = this.doc_type;
    return this.postmethod(this.baseResource + endpoint, data);
  }

  upload_image_url(unique_name: any): Observable<any> {
    let endpoint = "File/";
    return this.getmethod(this.baseResource + endpoint + unique_name);
  }



  // put method
  putmethod(endpoint: string, data) {
    if (localStorage.api_key != undefined) {
      this.httpHeaders = new HttpHeaders({ Authorization: "token " + localStorage.api_key + ":" + localStorage.api_secret, });
    }
    if (localStorage.api_key && localStorage.api_secret) {
      this.httpOptions = { headers: this.httpHeaders };
    } else {
      this.httpOptions = {};
    }
    return this.http.put(endpoint, data, this.httpOptions);
  }

  // Get Method 
  getmethod(endpoint: string) {
    if (localStorage.api_key != undefined) {
      this.httpHeaders = new HttpHeaders({
        Authorization: "token " + localStorage.api_key + ":" + localStorage.api_secret,
      });
    }
    if (localStorage.api_key && localStorage.api_secret) {
      this.httpOptions = { headers: this.httpHeaders };
    } else {
      this.httpOptions = {};
    }
    return this.http.get(endpoint, this.httpOptions);
  }

  // Delete method
  delete_method(endpoint: string) {

    if (localStorage.api_key != undefined) {
      this.httpHeaders = new HttpHeaders({
        Authorization: "token " + localStorage.api_key + ":" + localStorage.api_secret,
      });
    }
    if (localStorage.api_key && localStorage.api_secret) {
      this.httpOptions = { headers: this.httpHeaders };
    } else {
      this.httpOptions = {};
    }
    return this.http.delete(endpoint, this.httpOptions);
  }


  // Image file upload alert
  async imageAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-alert-class',
      header: "Your Image Is Being Upload.!",
      message: 'Please wait...!',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.alertCtrl.dismiss();
        }
      }]
    });
    await alert.present();
  }

  async filSizeAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-alert-class',
      header: "File Size Exceeded.!",
      message: 'Please Upload Files Below Size Of 10.0 MB...!',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.alertCtrl.dismiss();
        }
      }]
    });
    await alert.present();
  }


  check_img(data) {
    if (data) {
      if (data.indexOf('http') == -1) {
        if (data.indexOf('/assets') == -1) 
          return this.baseUrl + data;
        else 
          return data
      } else if (data.indexOf('http') == 0) 
        return data
    } else 
      return null
  }

  check_img_2(data) {
    if (data) {
      if (data.indexOf('http') == -1) {
        if (data.indexOf('/assets') == -1) 
          return this.baseUrl + data;
        else 
          return data
      } else if (data.indexOf('http') == 0) 
        return data
    } else 
      return null
  }

  // Close Modal
  close_modal() {
    this.modalCtrl.dismiss();
  }

  check_device_type() {
    if (this.platform.is('android')) {
      return 'Android Mobile App'
    }
    else if (this.platform.is('ios')) {
      return 'IOS Mobile App'
    }
    else {
      return 'Website'
    }
  }

  preventBackButton() {
    if (this.ismobile) {
      try {
        history.pushState(null, null, location.href);
        this.locationStrategy.onPopState(() => {
          history.pushState(null, null, location.href);
        })
        if (location.pathname != this.location_array[this.location_array.length - 1] || this.location_array.length == 0) {
          this.location_array.push(location.pathname);
        }
      }
      catch (e) {
      }
    }
  }

  header_templates = [
    {
      top_menu: 1,
      is_menu_full_width: 0,
      layout_json: [
        { 'width': '30%' },
        { 'width': '40%' },
        { 'width': '30%' }
      ]
    }
  ]
}
