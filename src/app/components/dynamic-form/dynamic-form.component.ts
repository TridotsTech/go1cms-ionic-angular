import { formatDate } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Validators } from '@angular/forms';

import { Location } from '@angular/common'

import { DbService } from 'src/app/services/db.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() form_data;
  @Input() myform;
  @Input() submitted;
  @Input() current_value;

  // @Output() checkbox_value_change = new EventEmitter();
  // @Output() select_value_change = new EventEmitter();
  // @Output() get_dropdown = new EventEmitter();

  @Input() form_values;
  today_date;
  category;


  phone_number: any;
  number = false;
  min_length;
  max_length;
  
  constructor(public db:DbService,public chf:ChangeDetectorRef,public location:Location,public router:Router) { }

  ngOnInit() {
    // [min]="item.zip?'minLength='5'':'maxLength='6''"
    this.min_length = "minLength='5'";
    this.max_length = "maxLength='6'" 
    const d = new Date("2017-08-31");
    // d.setDate(d.getDate() + 1);
    d.setDate(d.getDate() + 0);
    this.today_date = formatDate(d, 'yyyy-MM-dd', 'en-US');
    // Object.keys(this.myform.controls).forEach(key => {
    //   this.myform.get(key).setValue(this.form_values[key])
    //   console.log(this.myform.controls)
    // });

  }


  select_value_change(event,data){
    // console.log(data);
      if(data.name == 'inventory_method' || data.name == 'percentage_or_amount'){
          this.form_data.map(res => {
          res.group_fileds.map(value =>{

            if( data.name == 'inventory_method' && value.name == 'maximum_order_qty' || value.name == 'stock'){
              event.detail.value == 'Dont Track Inventory' ?  value.hidden = true : value.hidden = false
            } 

            if(data.name == 'percentage_or_amount' && (value.name == 'preorder_amount' || value.name == 'preorder_percent') ){
              this.myform.get(value.name).setValue(this.form_values[value.name])
              if( value.name == 'preorder_percent' ){
                // 
                event.detail.value != 'Preorder Percentage' ?  (value.required = false,value.hidden = true) : (value.hidden = false,value.required = true )  
                // console.log(value)
              } 
              if( value.name == 'preorder_amount') {
                // value.hidden = true,
                event.detail.value != 'Preorder Amount' ? (value.required = false,value.hidden = true) : (value.hidden = false,value.required = true )  
                // console.log(value)
              }
              
            } 

          })
        })

      }

      this.chf.detectChanges();
      
   }

  //  phone_format(event, item) {
  //    console.log('new',event,item)
  //   let newVal = event.detail.value.replace(/\D/g, '');
  //   if (item && newVal.length <= 6) {
  //     newVal = newVal.substring(0, newVal.length - 1);
  //   }
  //   if (newVal.length === 0) {
  //     newVal = '';
  //   } else if (newVal.length <= 3) {
  //     newVal = newVal.replace(/^(\d{0,3})/, '($1)');
  //   } else if (newVal.length <= 6) {
  //     newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
  //   } else if (newVal.length <= 9) {
  //     newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
  //   } else {
  //     newVal = newVal.substring(0, 10);
  //     newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
  //   }
  //   console.log("New number",newVal)
    
  //   // this.myform.get(item.name).setValue(String(newVal));
  //   // this.myform.name = newVal;
  //   // this.myform.get(item.name).writeValue(newVal);
  //   // this.myform.get(item.name).setValue(newVal);
  // }

  //  phone_format(ev,item) {
  //   let phone_num = '';
  //   if(ev.detail.value && ev.detail.value.length > 0) {
  //     let phone = ev.detail.value.replace(/-/g, '');
  //     var x = phone;
  //      if(ev.detail.value.length < 11){
  //       // this.number = true;
  //       x = x.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  //       this.phone_number = x
  //       this.myform.get(item.name).setValue(x);
  //     }
  //     else{
  //       // this.submitted = true;
  //       this.myform.get(item.name).setValue(this.phone_number);
  //     }
  //     }   
  //   // ev.detail.get(item.name).setValue(new_string)
  // }


   checkbox_value_change(event,data,options){
  
    console.log("Changing...",event.detail.value);
    console.log("Changing...",event,data,options)

    if(options.group_title == 'SHIPPING INFO' || options.group_title == 'PREORDER' ){

      if(data.name == 'enable_shipping'){
        this.form_data.map(res =>{
          res.group_fileds.map(value =>{
            
              if(value.name == 'free_shipping' || value.name == 'additional_shipping_cost'){
                  event.detail.value ?  value.hidden = true : value.hidden = false
                  if(value.name == 'additional_shipping_cost'){
                    value.value == false
                  }
              } 

              
          })
        })
      }

      if(data.name == 'free_shipping'){
        this.form_data.map(res =>{
          res.group_fileds.map(value =>{
              if (value.name == 'additional_shipping_cost'){
                if( !event.detail.value){
                  value.hidden = true
                  this.myform.get(value.name).setValue(0)
                } else { 
                  value.hidden = false
                  this.myform.get(value.name).setValue(this.form_values[value.name])
                }
       
              } 
          })
        })
      }

      if(data.name == 'enable_preorder_product'){
        this.form_data.map(res =>{
          res.group_fileds.map(value =>{
              if (value.name == 'percentage_or_amount' || value.name == 'preorder_percent' || value.name == 'preorder_amount'){

                  if(event.detail.value){
                    value.hidden = true
                    
                  } else {
                    // value.required = true
                    value.name != 'preorder_amount' ?  value.hidden = false : null
                  }

                  if( event.detail.value && value.name == 'percentage_or_amount'){
                      value.value = 'Preorder Percentage'
                      value.name == 'preorder_amount' ? (value.hidden = true,value.required = false) : null;
                      value.name == 'preorder_percent' ? value.required = true : null
                  }
              } 
          })
        })
      }
  

    }

    
 }


  get_dropdown(data){
    // console.log(data)
      // let v = []
      // console.log(v)
      if(!data.options){
        this.db.get_doctype_datas(data.dropdown_api).subscribe(res =>{
          data.options = res.data
          
          // return res.data
        })
      }

      // switch(data){
      //   case 'get_category_list':
      //     v =  this.categorylist
      //     break;
      // }
      
      // data.options = v
      // console.log("get doctype data",data)
      // return data.options = v
  }



  onSelectFile(event,item) {
    // console.log(event);
   if (event.target.files && event.target.files[0]) {
     var filesAmount = event.target.files.length;
     var file: File = event.target.files[0];
     for (let i = 0; i < filesAmount; i++) {
       var reader = new FileReader();
       reader.onload = (event: any) => {
        
         let prescription_file = file.name;
         let imagedata = event.target.result;
         
         let doctype = this.router.url == '/register-form/student' ? 'Student Registration' : 'Staff Registration';
 
        let data = {
          // "doctype":doctype,
          // "docname":"",
          // "filename":prescription_file,
          // "fieldname":item.name,
          // "is_private":0,
          // "content":imagedata,
          "filedata":imagedata,
          "file_name":prescription_file

        }

        this.db.upload_image(data).subscribe(res => {
          res.message.file_url ? this.db.driver_proofs =  res.message.file_url : this.db.alert('Image Not support')
        })

        // this.db.driver_proofs = data;
        // console.log(this.db.driver_proofs);

       }
 
       reader.readAsDataURL(event.target.files[i]);
     }
   }
 }
  

 checkbox_value(item){
   if(this.db.category_id.length == 0){
     this.db.category_id.push(item);
    }
    else{
      let d = this.db.category_id.find(res=> item == res)
      if(d == item){
        this.db.category_id.splice(this.db.category_id.findIndex(a => a === d) , 1);
      } 
      else{
        this.db.category_id.push(item);
      }
    }
    setTimeout(()=>{this.validate_options(item)});
  }

  validate_options(item){
    let d = this.db.category_id.find(res=> item == res)
    if(d == item){
      this.myform.controls[item].setValue(1);
    }
    else{
      this.myform.controls[item].setValue(0);
    }
  }

  // validate_options(item){
  //   let d = this.db.category_id.find(res=> item == res)
  //   if(d == item){
  //     this.myform.controls[item].setValue(1);
  //     this.form_data.map((res)=>{
  //       res.group_fileds.map(value =>{
  //         if(item == 'whats_same'){
  //           if(value.name == 'whats_number'){
  //             value.hidden = true
  //             value.required = false
  //             this.myform.controls[value.name].setValue('');
  //           }
  //         }
  //         if(item == 'is_whatsapp'){
  //           if(value.name == 'whats_same'){
  //             this.myform.controls[value.name].setValue(0);
  //             value.hidden = false
  //           }
  //         }
  //       })
  //     })
  //   }
  //   else{
  //     this.myform.controls[item].setValue(0);
  //     this.form_data.map((res)=>{
  //       res.group_fileds.map(value =>{
  //         if(item == 'whats_same'){
  //           if(value.name == 'whats_number'){
  //             value.hidden = false
  //             value.required = true
  //           }
  //         }
  //         if(item == 'is_whatsapp'){
  //           if(value.name == 'whats_same'){
  //             value.hidden = true
  //             this.myform.controls[value.name].setValue(0);
  //           }
  //           if(value.name == 'whats_number'){
  //             value.hidden = false
  //             value.required = true
  //             this.myform.controls[value.name].setValue('');
  //           }
  //         }
  //       })
  //     })
  //   }

  //   setTimeout(()=>{this.enable_whatsapp();});

  // }


  // enable_whatsapp(){
  //   let d = this.db.category_id.find(res=> 'whats_same' == res);
  //   console.log(d)

  //   if(d == 'whats_same'){
  //     this.form_data.map((res)=>{
  //       res.group_fileds.map(value =>{
  //         if(value.name == 'whats_number'){
  //           value.hidden = true
  //           value.required = false
  //           this.myform.controls[value.name].setValue('');
  //           this.myform.get(value.name).setValidators(null);
  //           this.myform.get(value.name).setErrors(null);
  //           this.myform.get(value.name).clearValidators([Validators.required]);
  //           this.myform.updateValueAndValidity();
  //         }
  //       })
  //     })
  //   }
  //   else{
  //     this.form_data.map((res)=>{
  //       res.group_fileds.map(value =>{
  //         if(value.name == 'whats_number'){
  //           value.hidden = false
  //           value.required = true
  //           this.myform.controls[value.name].setValue('');
  //           this.myform.get(value.name).setValidators([Validators.required]);
  //           this.myform.updateValueAndValidity();
  //         }
  //       })
  //     })
  //   }

  //   console.log(this.form_data,'-----------------')

  // }











 Options(eve,item){
   
   if(eve.detail.value){
     item.value = eve.detail.value;
     this.myform.get(item.name).setValue(eve.detail.value)
   }
 }

}


// if(value.name == 'whats_number'){
//   this.myform.controls[value.name].setValue('');
//   value.hidden = false;
//   value.req
// }


// if(item == 'whats_same'){
//   this.form_data.map((res)=>{
//     res.group_fileds.map(value =>{
//       if(value.name == 'whats_number'){
//         value.hidden = true
//         this.myform.controls[value.name].setValue('');
//       }
//     })
//   })
// }