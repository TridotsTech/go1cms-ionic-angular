import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
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


  // domain = "demo.go1cms.com";
  // domainurl = "demo.go1cms.com"
  // domain = "webservice.go1cms.com";
  // domainurl = "webservice.go1cms.com"

  domain = "core.go1cms.com";
  domainurl = "core.go1cms.com"

  // domain = "agency.go1cms.com";
  // domainurl = "agency.go1cms.com"

  // domain = "admin.go1cms.com";
  // domainurl = "admin.go1cms.com"
  baseUrl = `https://${this.domainurl}/`;
  baseResource = `https://${this.domainurl}/api/resource/`;
  baseMethod= `https://${this.domainurl}/api/method/`;
  
  // route='go1grocery-mobile-app-home';
  // route= environment.app_config.route;
    
  // captcha_key= environment.app_config.captcha_key

  // businessId = environment.app_config.businessId;
  // route : `home-page`;
  driver_proofs:any
  businessId : "BS-00001";
  current_page_builder_data;
  viewContent =[];
  ismobile;
  website_settings :any = {};
  business_info : any = {};
  category_list;
  httpOptions;
  httpHeaders;
  category_id = [];
  category = [];
  understand = false;
  submitted_data = false
  path;
  scroll_event:any = { desktop_header : true,mobile_header:false,no_search_icon:false}; //Scrol
  modal = false;
  android = false;
  location;
  header_info;  
  // header_layout;
  // header_info_item
  video_header = false;
  childs:any={}; //Selected child attributes
  product_box = { view : 'Grid View', row_count : 4 }
  footer_info;
  // footer_layout;
  slider_button = true;
  secondary_header = true;
  doc_type;
  ref_doc_type;
  ad_name;
  header_menu;
  ads_response:any
  location_array:any = [];
  counter_value = false
  recaptcha_key = '6LfUpoQhAAAAAKTvG1ENhVPAWZ1UEZFXkrrGVd5o'
  header_within_slider = 1;
  transparent_header;
  sub_header_data;


//bala


  constructor(private http: HttpClient,private alertCtrl: AlertController,private platform:Platform,private router:Router,private navCtrl:NavController,private modalCtrl:ModalController,private loadingCtrl:LoadingController,private locationStrategy: LocationStrategy) {
    // this.get_parent_category();
   }

  async alert(data){
    const alert = await this.alertCtrl.create({
        header : 'Alert',
        subHeader :data,
        buttons :['Ok']
    })
    await alert.present();
  }

  checkmobile(){
    let width = this.platform.width();
    // console.log("Screen resized..", width);
    if(width > 768){
      this.ismobile = false;
        return false
    } else if(width < 768){
      this.ismobile = true;
      return true;
    }
 }

 route_url(url){
  if(url){
    if(url.indexOf('https') == -1){
      this.router.navigateByUrl(url);
    } else if(url.indexOf('https') == 0){
       window.open(url,'_blank');
      
    }
  }
}

 scrolled(data){

  // console.log(data.detail.scrollTop);
  if(data.detail.scrollTop < 40){
    this.scroll_event.sticky_header = false;
  }else{
    this.scroll_event.sticky_header = true;
  }

  if(data.detail.scrollTop < 50){
    this.scroll_event.transparent_header = false;
  }else{
    this.scroll_event.transparent_header = true;
  }

  if(data.detail.scrollTop < 110){
    setTimeout(()=>{ this.scroll_event.header_sticky_on_top = false },300);
  }else{
    setTimeout(()=>{ this.scroll_event.header_sticky_on_top = true },300);
  }


  if(data.detail.scrollTop < 150){  
    this.scroll_event.desktop_header = true;
                
  }else {
    this.scroll_event.desktop_header  = false
  }

  if(data.detail.scrollTop < 200){
      this.scroll_event.mobile_header = false;
  }else{
      this.scroll_event.mobile_header = true;       
  }

  // let i = 0;

  if(data.detail.scrollTop > 235 ){
    this.scroll_event.header_sticky = true 
    // setTimeout(()=>{ this.scroll_event.header_sticky = true },400);
  }

  if(data.detail.scrollTop == 0 ||  data.detail.scrollTop < 40){
    this.scroll_event.header_sticky = false
  }

  // if(data.detail.scrollTop < 235 ){
  //   setTimeout(()=>{ this.scroll_event.header_sticky = false },600);
   
  // }else{
  //   setTimeout(()=>{ this.scroll_event.header_sticky = true },800);
  // }

}

header_checking(){
  this.scroll_event.header_sticky = false;
  this.scroll_event.sticky_header = false;
  this.scroll_event.transparent_header = false;
}

isInViewport(class_name){
  // var elementTop = $("."+class_name).offset().top;
  // var elementBottom = elementTop + $("."+class_name).outerHeight();
  // var viewportTop = $(window).scrollTop();
  // var viewportBottom = viewportTop + $(window).height();
  // return elementBottom > viewportTop && elementTop < viewportBottom;
}

  product_img(data){
    if(data){
      if(data.indexOf('https') == -1){
        return this.baseUrl+data;
      } else if(data.indexOf('https') == 0){
        return data
      }
    }
  }

  img_style(data, type) {
    if (type == 'color') {
      return { 'background': data };
    }else if (type == 'img') {
      return { 'background': 'url(' + this.product_img(data) + ')center center / 100% auto no-repeat', 'background-size': 'contain' };
    }else if (type == 'colorcode') {
      return { 'color': data };
    }else if (type == 'bgcolor') {
      return { 'background': data, 'color': data };
    } else if (type == 'full-bg-img') {
      return { 'background': 'url(' + this.product_img(data) + ') no-repeat', 'background-size': 'contain !important' }
    } else if (type == 'bg-image') {
      return { 'background' : 'url('+ this.product_img(data) +') no-repeat'}
    } else if (type == 'full-bg-img__') {
      return { 'background' : 'url('+ this.product_img(data) +') no-repeat',"min-height": "260px","background-size": "cover","position":"relative"};
    } else if (type == 'color__') {
      return { 'background': data,"min-height": "260px","position":"relative"};
    } else if(type == 'width'){
      return {'width':data};
    }else if(type == 'margin'){
      return {'margin':data};
    }
  }


  check_footer(){
 
    let data;
    if(this.footer_info && this.footer_info.length != 0){
      this.footer_info.map((res,i)=>{
       
         if(res.section_name == 'Footer Social Links' && res.section_type == 'Static Section'){
              data.Footer_Social_Links = res;
              // this.footer_info.splice(i);
              // this.footer_info.splice(2);
         }else if(res.section_name == 'Footer Download App' && res.section_type == 'Static Section'){
            data.Footer_Download_App = res;
          // this.footer_info.splice(i);
          // this.footer_info.splice(2);
        }
         else{
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
    var data={
        application_type: this.ismobile?"mobile":"web",
        domain : this.domainurl,
        route : "home-page",
        business : ""
    }
    this.get_mobile_homepage(data).subscribe( res => {
        // this.viewcontent_serach = res.message;
        
        this.current_page_builder_data = data.application_type
        this.viewContent = res.message.page_content;
        this.sub_header_data = res.message.sub_header;
        this.check_header_footer(this.viewContent,res);
        // this.viewContent.map(res =>{
        //   if(res.btn != undefined || res.btn != null){
        //     res.btn ? res.btn_text = JSON.parse(res.btn):'';  
        //   }
        //   if(res.btn1 != undefined || res.btn1 != null){
        //     res.btn1 ? res.btn_text = JSON.parse(res.btn1):''; 
        //   }
         
        // })

        // this.footer_info = (this.website_settings && this.website_settings.footer_template) ? this.website_settings.footer_template : undefined;
        // if(this.footer_info){
        //   this.footer_info.layout_json =  JSON.parse(this.footer_info.layout_json);
        // }
        // this.check_footer_layout();

           
        // if(res.message.header_content){
        //  this.header_info = res.message.header_content;
        // }else{
        //   this.header_info = this.website_settings.header_content;
        // }

    },
     error => { 
      // console.log(JSON.stringify(errSor.json())); 
    })
  } 


  


  get_parent_category(){

    var data = { domain: this.domainurl,show_count : 1  }
    if(this.category.length == 0){
      this.get_parent_categories(data).subscribe(data => {
        this.category = data.message;  
      });
    }
  }


  check_header_footer(content_data,data){

    content_data.map(res =>{
        
      if(res.layout_json){
        res.layout_json = JSON.parse(res.layout_json);
      }

      if(res.btn != undefined || res.btn != null){
        res.btn ? res.btn_text = JSON.parse(res.btn):'';
      }

      if(res.btn1 != undefined || res.btn1 != null){
        res.btn1 ? res.btn_text1 = JSON.parse(res.btn1):''; 
      }
    })

    if(data.message && data.message.header_content){
      this.header_info = data.message.header_content;
      this.header_info.layout_json =  JSON.parse(this.header_info.layout_json);
      this.check_header_layout();
    }else{

      if(this.website_settings && this.website_settings.header_template){
        this.header_info = this.website_settings.header_template;
      }else{
        this.get_website_settings();
      }
    }

    // console.log(data)
    if(data.message && data.message.footer_content){
       this.footer_info =  data.message.footer_content;
       this.footer_info.layout_json =  JSON.parse(this.footer_info.layout_json);
       this.check_footer_layout();
       // console.log(this.footer_info)
    }else {
      if(this.website_settings && this.website_settings.footer_template){
        this.footer_info = this.website_settings.footer_template;
        this.footer_info.layout_json =  JSON.parse(this.footer_info.layout_json);
        this.check_footer_layout();
       
      }else{
        this.get_website_settings();
      }
    }
       
  }


  get_website_settings(){
    this.get_all_website_settings().subscribe(res =>{
      this.website_settings = res.message;
      this.favIcon.href = (this.website_settings.theme_settings && this.website_settings.theme_settings.favicon) ? this.product_img(this.website_settings.theme_settings.favicon) : '';
      this.category_list = this.website_settings.additional_menus;
      

      this.header_info = (this.website_settings && this.website_settings.header_template) ? this.website_settings.header_template : undefined;
      if(this.header_info){
        this.header_info.layout_json =  JSON.parse(this.header_info.layout_json);
      }
  
      this.footer_info = (this.website_settings && this.website_settings.footer_template) ? this.website_settings.footer_template : undefined;
      if(this.footer_info){
        this.footer_info.layout_json =  JSON.parse(this.footer_info.layout_json);
      }

      this.check_footer_layout();
      this.check_header_layout();
      // console.log(this.footer_info)
      // this.header_info_item = (this.website_settings.header_template && this.website_settings.header_template.items) ? this.website_settings.header_template.items : [];
      // this.header_info = this.website_settings.header_template;
      // this.header_layout = (this.website_settings.header_template && this.website_settings.header_template.layout_json) ? JSON.parse(this.website_settings.header_template.layout_json) : [];   
      // this.transparent_header = this.header_info.is_transparent_header;
      
      // console.log(this.header_info)

    
      // this.footer_info = (this.website_settings.footer_template && this.website_settings.footer_template.items) ? this.website_settings.footer_template.items : [];
      // this.footer_layout = (this.website_settings.footer_template && this.website_settings.footer_template.layout_json) ? JSON.parse(this.website_settings.footer_template.layout_json) : [];
      // this.footer_layout.footer_content = (this.website_settings.footer_template && this.website_settings.footer_template.enable_copyright == 1) ? this.website_settings.footer_template.footer_content : '';
      
  
      // this.check_footer(); 

      // bala
  })
    
  }

  check_footer_layout(){
    this.footer_info.layout_json.map(res =>{
      res.columns.map((rec,index) =>{
        let check = this.footer_info.items.find(res => res.column_index == index);     
          if(check)
            rec.layout_data = check.items;
        })
    }) 
  }

  check_header_layout(){

    this.header_info.layout_json.map(res =>{
      res.columns.map((rescol,index)=>{
            let data = this.header_info.items.find(res=>res.column_index == index) 
            if(data){
              if(this.header_info.call_to_action_button == 1 && (data.section_name == 'Header Button' && data.section_type == 'Static Section')){
                 rescol.layout_data = data;
                 let values = {button_link:this.header_info.button_link, button_text: this.header_info.button_text, link_target: this.header_info.link_target};
                 rescol.layout_data = {...rescol.layout_data,...values};
              }else{
                rescol.layout_data = data;
                if(data.section_name == 'Header Menu' && data.section_type == 'Menu'){
                  this.header_info.menu = data;
                }
              }
            }
      })
     })

      //  this.header_layout.map(res =>{
      //   res.columns.map((rescol,index)=>{
      //         let data = this.header_info_item.find(res=>res.column_index == index) 
      //         if(data){
      //           if(this.header_info.call_to_action_button == 1 && (data.section_name == 'Header Button' && data.section_type == 'Static Section')){
      //              rescol.layout_data = data;
      //              let values = {button_link:this.header_info.button_link, button_text: this.header_info.button_text, link_target: this.header_info.link_target};
      //              rescol.layout_data = {...rescol.layout_data,...values};
      //           }else{
      //             rescol.layout_data = data;
      //           }
      //         }
      //   })
      //  })
  }


  back(){
    if (this.modal) {
      this.modal = false;
      this.modalCtrl.dismiss();
    } else {
      this.navCtrl.back();
    }
}

  get_business_info(){
    let data = { "name" : this.businessId ? this.businessId : 'BS-00001'  }
    this.get_business_detail(data).subscribe(res=>{
        this.business_info = res.message[0]   
    })
  }

  get(endpoint: string) {
    if (localStorage.api_key != undefined) {
      this.httpHeaders = new HttpHeaders({ 'mode':'no-cors','Authorization': 'token ' + localStorage.api_key + ":" + localStorage.api_secret });
    }
    return this.http.get(endpoint, this.httpOptions);
  }

  postmethod(endpoint: string,data) {
      if(localStorage.api_key != undefined){
        this.httpHeaders = new HttpHeaders({ 'Authorization': 'token '+localStorage.api_key+":"+localStorage.api_secret });
      }
      if(localStorage.customerRefId && localStorage.api_key) {
        this.httpOptions = ({ headers: this.httpHeaders });
      } else {
        this.httpOptions = {};
      }
    return this.http.post(endpoint, data, this.httpOptions);
  }

  async open_site(url){
    const modal = await this.modalCtrl.create({
      component: ReferenceSiteComponent,
      cssClass:'reference-site',
      componentProps: {   url : url  }
    })
    await modal.present();      
    let data = await modal.onWillDismiss();
    if(data){
      if(data.data == 'success'){
        // if it is close
      }
    }
  }
  
  get_mobile_homepage(data):Observable<any>{
    // console.log(data);
    let endpoint = "go1_cms.go1_cms.api.get_page_content"
    // let endpoint= 'ecommerce_business_store.ecommerce_business_store.mobileapi.get_mobile_home_page';
    // let endpoint= 'ecommerce_business_store.ecommerce_business_store.mobileapi.get_page_content';
    // return this.postmethod(this.baseMethod+endpoint,data)
    return this.http.post(this.baseMethod+endpoint,data)
  }

  get_blog_details(data):Observable<any>{
    let endpoint = 'ecommerce_business_store.ecommerce_business_store.api.get_blog_details';
    return this.http.post(this.baseMethod + endpoint,data);
  }

  get_all_blog_list(data):Observable<any>{
    let endpoint = 'ecommerce_business_store.ecommerce_business_store.api.get_blog_list';
    return this.http.post(this.baseMethod + endpoint,data);
  }

  get_parent_categories(data):Observable<any> {
    let endpoint = 'ecommerce_business_store.ecommerce_business_store.api.get_parent_categories';
    return this.postmethod(this.baseMethod + endpoint, data);
  }

  get_all_website_settings():Observable<any>{
    // let endpoint = 'ecommerce_business_store.ecommerce_business_store.api.get_all_website_settings';
    let endpoint = 'go1_cms.go1_cms.api.get_all_website_settings';
    return this.get(this.baseMethod + endpoint);
  }

  gallery_list(): Observable<any> {
    let doc_type = 'Gallery';
    let endpoint = doc_type + `?fields=["title","name","cover_image"]`;
    return this.http.get(this.baseResource + endpoint);
  }

  gallery_detail(data):Observable<any> {
    let doc_type = 'Gallery';
    let endpoint = doc_type + '/'+ data +`?fields=["title","cover_image","gallery"]`;
    return this.http.get(this.baseResource + endpoint);
  }
  
  // get_authorlist():Observable<any>{
  //   let doc_type = "Author";
  //    let endpoint = doc_type + `?filters=[["published","=","1"]]&fields=["name","author_name","avatar"]+&limit_start=${this.limit_start}&limit_page_length=60&order_by="+name"`;
  //    return this.get(this.baseResource + endpoint);
  //  }

  get_doctype_datas(data): Observable<any> {
    let endpoint = data
    return this.get(this.baseMethod + endpoint);
  }

  get_doctype_data(data): Observable<any> {
    let endpoint = data
    return this.get(this.baseResource + endpoint);
  }

  get_business_detail(data):Observable<any>{
    let endpoint = 'ecommerce_business_store.ecommerce_business_store.mobileapi.get_business_detail';
    return this.postmethod(this.baseMethod + endpoint,data);
  }

  get_all_route(data):Observable<any>{
    let endpoint = 'ecommerce_business_store.ecommerce_business_store.mobileapi.get_all_route';
    return this.postmethod(this.baseMethod + endpoint,data);
  }

  insert_admission(data,doctype): Observable<any> {
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


  // // Upload image 
  upload_image(data: any): Observable<any> {
      // let endpoint = "nunmaan_custom_app.nunmaan_custom_app.api.uploadfile";
      let endpoint = "File";
      return this.postmethod(this.baseResource + endpoint, data);
  }
  
web_form_dynamic(data): Observable<any> {
    let endpoint = "Web Form/" + data ;
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
  get_link_field_options_parent(refdoc):Observable<any>{
    if(refdoc =="Classified Category"){
       this.filter= '?limit_page_length=100&filters=[["is_parent","=","1"]]&fields=["category_name","name"]&order_by=name%20asc'
    }
    else if(refdoc =="Job Category"){
      this.filter= '?limit_page_length=100&filters=[["is_parent","=","1"]]&fields=["category_name","name"]&order_by=category_name%20asc'
    }
    let endpoint = this.ref_doc_type + this.filter;
    return this.getmethod(this.baseResource + endpoint);
  }

  get_link_field_options_child(refdoc):Observable<any>{
    if(refdoc =="Classified Category"){
    this.filter= `?limit_page_length=100&fields=["category_name","name","parent_category"]&order_by=name%20asc`
  }
  else if(refdoc =="Job Category"){
    this.filter= `?limit_page_length=100&fields=["category_name","name","parent_category"]&order_by=category_name%20asc`
  }
    let endpoint = this.ref_doc_type + this.filter;
    return this.getmethod(this.baseResource + endpoint);
  }


  get_link_field_options_wArg(doc_name): Observable<any> {
    let endpoint = doc_name + this.page_length + '&order_by=name%20asc';
    return this.getmethod(this.baseResource + endpoint);
  }

  update_form_data(data , id): Observable<any> {
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
      this.httpHeaders = new HttpHeaders({  Authorization: "token " + localStorage.api_key + ":" + localStorage.api_secret, });
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
    // setTimeout(() => {this.alertCtrl.dismiss(); }, 700)
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
          if(data.indexOf('/assets')==-1)
          {
            return this.baseUrl + data;
          }
          else{
            return data
          }
        
      } else if (data.indexOf('http') == 0) {
        return data
      }
    } else {
      // if (this.menu_options.module == 'Yellow  Page') {
        return '/assets/img/default-yellow.jpg'
      // } 
    }
  }

  check_img_2(data) {
  
    if (data) {
      if (data.indexOf('http') == -1) {
          if(data.indexOf('/assets')==-1)
          {
            return this.baseUrl + data;
          }
          else{
            return data
          }
        
      } else if (data.indexOf('http') == 0) {
        return data
      }
    } else {
      // if (this.menu_options.module == 'Yellow  Page') {
        return null
      // } 
    }
  }

   // Close Modal
   close_modal() {
    this.modalCtrl.dismiss();
  }

  check_device_type(){
    if (this.platform.is('android')){
        return 'Android Mobile App'}
    else if(this.platform.is('ios')){
        return 'IOS Mobile App'}
    else{
      return 'Website'}
   }

 
  preventBackButton() {
    // console.log('function calling....')
    if(this.ismobile){
      try{
        history.pushState(null, null, location.href);
        this.locationStrategy.onPopState(() => {
          history.pushState(null, null, location.href);
        })
        // console.log(location.pathname ,'-------', this.location_array[this.location_array.length-1],'----------------------------------------------');

        if(location.pathname != this.location_array[this.location_array.length-1] || this.location_array.length == 0){
          this.location_array.push(location.pathname);
        }
      }
      catch(e){
        // console.log(e);
      }
    }
  }


  
tabs_items =[ 
  {
      title:'Home',
      route: '/tabs/home',
      icon : '/assets/icon/home.svg',
      tab: 'home',
      enable: 1,
  },
  {
    title:'Category',
    route: '/tabs/category',
    icon : '/assets/icon/category.svg',
    tab: 'category',
    enable: 1
  },
  {
    title:'Wishlist',
    route: '/tabs/wishlist',
    icon : '/assets/icon/heart.svg',
    tab: 'wishlist',
    enable: 1
  },
  // {
  //   title:'Wallet',
  //   route: '/tabs/wallet',
  //   icon : '/assets/icon/wallet.svg',
  //   tab: 'wallet',
  //   enable: 1
  // },
  {
    title:'Account',
    route: '/tabs/my-profile',
    icon : '/assets/icon/user-sidemenu.svg',
    tab: 'my-profile',
    enable: 1
  },
]

menu = [
  {
    title: 'Home',
    route: '/tabs/home',
    icon: '/assets/icon/home.svg',
    enable: 1,
    // ico1:this.website_settings.
  },
  {
    title: 'Categories',
    route: '/tabs/category',
    icon: '/assets/icon/category.svg',
    enable: 1
  },
  {
    title: 'Wishlist',
    route: '/tabs/wishlist',
    icon: '/assets/icon/heart.svg',
    enable: 1
  },
  {
    title: 'MyCart',
    route: '/yourcart',
    icon: '/assets/icon/mycart.svg',
    enable: 1
  },
  {
    title: 'Orders',
    route: '/my-orders',
    icon: '/assets/icon/cart.svg',
    enable: 1
  },
  {
    title: 'Profile',
    route: '/tabs/my-profile',
    icon: '/assets/icon/user-sidemenu.svg',
    enable: 1
  },
  // {
  //   title: 'Vendor Registeration',
  //   route: '/vendor-registration',
  //   icon: '/assets/icon/vendor-registeration.svg',
  //   enable: 1
  // },
  {
    title: 'Wallet',
    route: '/tabs/wallet',
    icon: '/assets/icon/wallet.svg',
    enable: 0
    // (this.db.website_settings && this.db.website_settings.enable_wallet == 1) ? 1 : 0
  },
  {
    title: 'Reward Points',
    route: '/reward-points',
    icon: '/assets/icon/Reward.svg',
    enable: 0
    // (this.db.website_settings && this.db.website_settings.enable_loyalty == 1) ? 1 : 0
  },
  {
    title: 'Blogs',
    route: '/blog-list',
    icon: '/assets/icon/blog.svg',
    enable: 1
    // (this.db.website_settings && this.db.website_settings.enable_loyalty == 1) ? 1 : 0
  },
  {
    title: 'Become A Seller',
    route: '/whysellwithus',
    icon: '/assets/icon/vendor-registeration.svg',
    enable: 1
  },
  {
    title: 'Affiliate program',
    route:'/affiliate-program',
    icon: '/assets/icon/affiliate-program.svg',
    enable: 1
  },
  {
    title: 'Contact Us',
    route: '/contact-us',
    icon: '/assets/icon/contact-us.svg',
    enable: 1
  },
  {
    title: 'Policies',
    route:'/terms-condition',
    icon: '/assets/icon/terms.svg',
    enable: 1
  },

]

testdata=[
  {
    section_type:'counter-section3',
    section_name:'table counter',
    title:'Duis autem vel eum iriure dolor in hendrerit',
    Sub_title:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever sin",
    Data: [
      {'count_value':'10','count_title':'Office Location'},
      {'count_value':'180','count_title':'Partners Worldwide'},
      {'count_value':'400','count_title':'Clients Worldwide'},
      {'count_value':'30','count_title':'Team Member'},
      {'count_value':'20','count_title':'Team Revenue'},
      {'count_value':'16','count_title':'Year of Experience'},

  ]}
]

header_templates = [
  {
    top_menu:1,
    is_menu_full_width: 0,
    layout_json:[
      {'width':'30%'},
      {'width':'40%'},
      {'width':'30%'}
  ]

  }
]
}
