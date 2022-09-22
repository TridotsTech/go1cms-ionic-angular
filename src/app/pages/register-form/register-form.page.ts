import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { DbService } from 'src/app/services/db.service';

import {
  AlertController,
  LoadingController,
  ModalController,
  Platform,
} from '@ionic/angular';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.page.html',
  styleUrls: ['./register-form.page.scss'],
})
export class RegisterFormPage implements OnInit {

 
  order_form;
  submitted = false;
  item:any={};
  current_value = 'order_info'
  forms:any = {};
  forms_data1 = [];
  // PhoneUSValidator;
  form_type:any
  titles:any

  constructor(public route:ActivatedRoute, public alertCtrl: AlertController,public formBuilder:FormBuilder,public loadingController: LoadingController, private platform: Platform, public modalCtrl: ModalController, public db:DbService,public router : Router) { }
  
  ngOnInit() {
    this.db.submitted_data = false;
    this.forms.form1 = true;

    this.route.params.subscribe((res)=>{
      this.form_type = res.type ? res.type : 'student'
      if( res.type == 'student'){
        this.titles = 'Student'
      }
      else if( res.type == 'teacher'){
        this.titles = 'Staff Volunteer'
      }
      else if(res.type =='student-volunteer'){
        this.titles = 'Student Volunteer'
      }
      else{
        this.titles = 'Student'
      }
      this.get_data();
      console.log(res.type);
    })

    
  }
  
  
  insert_data(){
    this.submitted = true;
    if(this.order_form.value.how_know != null){
      if(this.order_form.status == 'VALID'){
        let data = {
          "student_first_name":this.order_form.value.first_name,
          "student_name_in_tamil":this.order_form.value.tamil_name,
          "student_middle_name":this.order_form.value.middle_name,
          "student_date_of_birth":this.order_form.value.date_of_birth,
          "previous_grade_in_tamil_curriculum":this.order_form.value.grade_1,
          "student_last_name":this.order_form.value.last_name,
          "gender":this.order_form.value.gender,
          "class_type":this.order_form.value.class_type,
          "parent_name":this.order_form.value.parent_1,
          "parent_name_2":this.order_form.value.parent_2,
          "parent_phone":this.order_form.value.phone_number_1,
          "parent_2_phone":this.order_form.value.phone_number_2,
          "parent_email_address":this.order_form.value.email_id_1,
          "alternate_email_id":this.order_form.value.email_id_2,
          "address":this.order_form.value.address_1,
          "address_line_2":this.order_form.value.address_2,
          "state":this.order_form.value.state, 
          "city":this.order_form.value.city, 
          "doctor_name":this.order_form.value.doc_name, 
          "doctor_phone":this.order_form.value.doc_phone,
          "emergency_contact_name":this.order_form.value.contact_name, 
          "emergency_contact_phone":this.order_form.value.contact_phone,  
          "zip_code":this.order_form.value.zip_code,
          "hear_about_us":this.order_form.value.how_know,
          // "profile_image":this.db.driver_proofs
        }
        this.db.insert_admission(data,'Student Registration').subscribe(res=>{
            if(res.data){
              this.db.driver_proofs = '';
              this.db.submitted_data = true;
            }
        })
      }
    }
    else{
      this.db.alert("Please choose the How did you know about us");
    }
  }

  save_form(){
    console.log(this.order_form,'form calling...')
    switch(this.form_type){
      case 'student':
        this.insert_data();
        break;
      case 'teacher':
        this.insert_data1('teacher');
        break;
      case 'student-volunteer':
        this.insert_data1('volunteer');
        break;
    }
  }

  insert_data1(type){
    this.submitted = true;
    if(this.order_form.value.status_in_usa != null){
      if(this.order_form.status == 'VALID'){
        // this.order_form.value, type == 'teacher' ? this.order_form.value.profile_image = this.db.driver_proofs : null
        this.order_form.value.profile_image = this.db.driver_proofs
        console.log('status',this.order_form.value);
        this.db.insert_admission(this.order_form.value, type == 'teacher' ? 'Staff Registration' : 'Student Volunteer Registration').subscribe(res=>{
            if(res.data){
              this.db.driver_proofs = ''
              this.db.submitted_data = true;
            }
        })

      }
    }
    else{
      this.db.alert("Please choose the Status In USA")
    }

  }

 




  get_data(){

    switch(this.form_type){

      case 'student':

        this.forms_data1 =  [
          {
            mapped_by:'order_info',
            group_fileds :[
                  {
                    label :'Student First Name',
                    input_type: 'input',
                    type : 'text',
                    name :'first_name',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: 'Please make sure it is your legal name, as all certifications will be provided using this name'
                  },
                  { 
                    label :'Student Middle Name',
                    input_type: 'input',
                    type : 'text',
                    name :'middle_name',
                    placeholder : '',
                    required : false,
                    hidden: false,
                    value : '',
                    tooltip: 'Please make sure it is your legal name, as all certifications will be provided using this name'
                  },
                  { 
                    label :'Student Last Name',
                    input_type: 'input',
                    type : 'text',
                    name :'last_name',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: 'Please make sure it is your legal name, as all certifications will be provided using this name'
                  },
                  { 
                    label :'Student Name in Tamil',
                    input_type: 'input',
                    type : 'text',
                    name :'tamil_name',
                    placeholder : '',
                    required : false,
                    hidden: false,
                    value : '',
                    tooltip: ''
                  },
                  { 
                    label :'Student Date of Birth',
                    input_type: 'input',
                    type : 'Date',
                    name :'date_of_birth',
                    placeholder : 'birth',
                    required : true,
                    hidden: false,
                    is_today: true,
                    value : '',
                    tooltip: ''
                  },
                  {
                    label : "Gender",
                    input_type: 'dropdown',
                    type : 'text',
                    name :'gender',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    options:[{'name':'Male'},{'name':'Female'},{'name':'Other'}],
                    tooltip: ''
                  },
                  {
                    label :"Class Type",
                    input_type: 'dropdown',
                    type : 'text',
                    name :'class_type',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    options:[{'name':'In Person'},{'name':'Online'}],
                    tooltip: ''
                  },
                  {
                    label :'Previous grade in Tamil Curriculum',
                    input_type: 'input',
                    type : 'text',
                    name :'grade_1',
                    placeholder : '',
                    required : false,
                    hidden: false,
                    value : '',
                    tooltip: ''
                  },
                  {
                    label :'Parent Name / Guardian',
                    input_type: 'input',
                    type : 'text',
                    name :'parent_1',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value :'',
                    tooltip: ''
                  },
                  {
                    label :'Parent 2 Name',
                    input_type: 'input',
                    type : 'text',
                    name :'parent_2',
                    placeholder : '',
                    required : false,
                    hidden: false,
                    value :'',
                    tooltip: ''
                  },
                  {
                    label :'Parent Phone',
                    input_type: 'input',
                    type : 'pattern',
                    name :'phone_number_1',
                    placeholder : 'Phone number must be of 10 digits',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: '',
                    // pattern: true
                  },
                  {
                    label :'Alternate Phone',
                    input_type: 'input',
                    type : 'text',
                    name :'phone_number_2',
                    placeholder : 'Phone number must be of 10 digits',
                    required : false,
                    hidden: false,
                    value : '',
                    tooltip: '',
                    // pattern: true
                  },
                  {
                    label :'Parent Email Address',
                    input_type: 'input',
                    type : 'email',
                    name :'email_id_1',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: ''
                  },
                  {
                    label :'Alternate Email ID',
                    input_type: 'input',
                    type : 'text',
                    name :'email_id_2',
                    placeholder : '',
                    required : false,
                    hidden: false,
                    value : '',
                    tooltip: ''
                  },
                  {
                    label :'Address line 1',
                    input_type: 'input',
                    type : 'text',
                    name :'address_1',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: '',
                    long_text : true
                  },
                  {
                    label :'Address line 2',
                    input_type: 'input',
                    type : 'text',
                    name :'address_2',
                    placeholder : '',
                    required : false,
                    hidden: false,
                    value : '',
                    tooltip: '',
                  },
                  {
                    label :'City',
                    input_type: 'input',
                    type : 'text',
                    name :'city',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: '',
                    
                  },
                  {
                    label :'State',
                    input_type: 'input',
                    type : 'text',
                    name :'state',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: '',
                    
                  },
                  {
                    label :'Zip code',
                    input_type: 'input',
                    type : 'zipcode',
                    name :'zip_code',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: 'You must enter minimum 5 characters',
                    zip: true,
                  },
                  {
                    label :'Emergency Contact Name ',
                    input_type: 'input',
                    type : 'text',
                    name :'contact_name',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value :'',
                    tooltip: ''
                  },
                  {
                    label :'Emergency Contact Phone',
                    input_type: 'input',
                    type : 'pattern',
                    name :'contact_phone',
                    placeholder : 'Phone number must be of 10 digits',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: '',
                    // pattern: true
                  },
                  {
                    label : "How Did You Know About Us",
                    input_type: 'dropdown',
                    type : 'text',
                    name :'how_know',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    options:[{'name':null},{'name':'Friends & Family'},{'name':'Search Engine'},{'name':'Flier'},{'name':'Other'}],
                    tooltip: ''
                  },
              ]
            }
        ]
        break;

      case 'teacher':

        this.forms_data1 =  [
          {
            mapped_by:'order_info',

            group_fileds :[
                  {
                    label :'First Name',
                    input_type: 'input',
                    type : 'text',
                    name :'first_name',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: 'Please make sure it is your legal name, as all certifications will be provided using this name'
                  },
                  { 
                    label :'Middle Name',
                    input_type: 'input',
                    type : 'text',
                    name :'middle_name',
                    placeholder : '',
                    required : false,
                    hidden: false,
                    value : '',
                    tooltip: 'Please make sure it is your legal name, as all certifications will be provided using this name'
                  },
                  { 
                    label :'Last Name',
                    input_type: 'input',
                    type : 'text',
                    name :'last_name',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: 'Please make sure it is your legal name, as all certifications will be provided using this name'
                  },

                  { 
                    label :'Date of Birth',
                    input_type: 'input',
                    type : 'Date',
                    name :'dob',
                    placeholder : 'birth',
                    required : true,
                    hidden: false,
                    is_today: true,
                    value : '',
                    tooltip: ''
                  },
                  {
                    label : 'Profile Image',
                    input_type: 'input',
                    type : 'file',
                    name :'profile_image',
                    placeholder : '',
                    required : false,
                    hidden: false,
                  },
                  {
                    label : "Status In USA",
                    input_type: 'dropdown',
                    type : 'text',
                    name :'status_in_usa',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    options:[{'name':null},{'name':'Visa'},{'name':'Green Card'},{'name':'Citizen'}],
                    tooltip: ''
                  },
                  {
                    label :'Phone number',
                    input_type: 'input',
                    type : 'pattern',
                    name :'phone',
                    placeholder : 'Phone number must be of 10 digits',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: '',
                    // pattern: true
                  },
                  {
                    label :'Email',
                    input_type: 'input',
                    type : 'email',
                    name :'email',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: ''
                  },
                  {
                    label :'Address line 1',
                    input_type: 'input',
                    type : 'text',
                    name :'address_line_1',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: '',
                    long_text : true
                  },
                  {
                    label :'Address line 2',
                    input_type: 'input',
                    type : 'text',
                    name :'address_line_2',
                    placeholder : '',
                    required : false,
                    hidden: false,
                    value : '',
                    tooltip: '',
                  },
                  {
                    label :'City',
                    input_type: 'input',
                    type : 'text',
                    name :'city',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: '',
                    
                  },
                  {
                    label :'State',
                    input_type: 'input',
                    type : 'text',
                    name :'state',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: '',
                    
                  },
                  {
                    label :'Zip code',
                    input_type: 'input',
                    type : 'zip_code',
                    name :'zip_code',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: 'You must enter minimum 5 characters',
                    zip: true,
                  },
                  {
                    label :'Do you have WhatsApp',
                    input_type: 'checkbox',
                    type : 'text',
                    name :'is_whatsapp',
                    placeholder : '',
                    required : false,
                    hidden: false,
                    value : 0,
                   
                  },
                  {
                    label :'Emergency Contact Name ',
                    input_type: 'input',
                    type : 'text',
                    name :'emg_contact_name',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value :'',
                    tooltip: ''
                  },
                  {
                    label :'Emergency Contact Phone',
                    input_type: 'input',
                    type : 'pattern',
                    name :'emg_contact_phone',
                    placeholder : 'Phone number must be of 10 digits',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: '',
                    // pattern: true
                  },
                  // {
                  //   label :'Is the WhatsApp in same number',
                  //   input_type: 'checkbox',
                  //   type : 'text',
                  //   name :'whats_same',
                  //   placeholder : '',
                  //   required : false,
                  //   hidden: true,
                  //   value : 0,
                    
                  // },
                  // {
                  //   label :'Whatsapp number',
                  //   input_type: 'input',
                  //   type : 'pattern',
                  //   name :'whats_number',
                  //   placeholder : '',
                  //   required : true,
                  //   hidden: false,
                  //   value : '',
                  //   tooltip: '',
                  //   // pattern: true
                  // },
                  {
                    label :'About Yourself',
                    input_type: 'textarea',
                    type : 'text',
                    name :'about_yourself',
                    placeholder : '',
                    required : false,
                    hidden: false,
                    value : '',
                    
                  },
                  {
                    label :'Why do you want to Volunteer with Nunmaan.org ?',
                    input_type: 'textarea',
                    type : 'text',
                    name :'why_volunteer',
                    placeholder : '',
                    required : false,
                    hidden: false,
                    value : '',
                    
                  },
              ]
            }
        ]
        break;
      
      case 'student-volunteer':

        this.forms_data1 =  [
          {
            mapped_by:'order_info',
            group_fileds :[
                  {
                    label :'Student First Name',
                    input_type: 'input',
                    type : 'text',
                    name :'first_name',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: 'Please make sure it is your legal name, as all certifications will be provided using this name'
                  },
                  { 
                    label :'Student Middle Name',
                    input_type: 'input',
                    type : 'text',
                    name :'middle_name',
                    placeholder : '',
                    required : false,
                    hidden: false,
                    value : '',
                    tooltip: 'Please make sure it is your legal name, as all certifications will be provided using this name'
                  },
                  { 
                    label :'Student Last Name',
                    input_type: 'input',
                    type : 'text',
                    name :'last_name',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: 'Please make sure it is your legal name, as all certifications will be provided using this name'
                  },
                  { 
                    label :'Date of Birth',
                    input_type: 'input',
                    type : 'Date',
                    name :'dob',
                    placeholder : 'birth',
                    required : true,
                    hidden: false,
                    is_today: true,
                    value : '',
                    tooltip: ''
                  },
                  {
                    label : 'Profile Image',
                    input_type: 'input',
                    type : 'file',
                    name :'profile_image',
                    placeholder : '',
                    required : false,
                    hidden: false,
                },
                  {
                    label : "Status In USA",
                    input_type: 'dropdown',
                    type : 'text',
                    name :'status_in_usa',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    options:[{'name':null},{'name':'Visa'},{'name':'Green Card'},{'name':'Citizen'}],
                    tooltip: ''
                  },
                  {
                    label :'Phone number',
                    input_type: 'input',
                    type : 'pattern',
                    name :'phone',
                    placeholder : 'Phone number must be of 10 digits',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: '',
                    // pattern: true
                  },
                  {
                    label :'Email',
                    input_type: 'input',
                    type : 'email',
                    name :'email',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: ''
                  },
                  {
                    label :'Address line 1',
                    input_type: 'input',
                    type : 'text',
                    name :'address_line_1',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: '',
                    long_text : true
                  },
                  {
                    label :'Address line 2',
                    input_type: 'input',
                    type : 'text',
                    name :'address_line_2',
                    placeholder : '',
                    required : false,
                    hidden: false,
                    value : '',
                    tooltip: '',
                  },
                  {
                    label :'City',
                    input_type: 'input',
                    type : 'text',
                    name :'city',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: '',
                    
                  },
                  {
                    label :'State',
                    input_type: 'input',
                    type : 'text',
                    name :'state',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: '',
                    
                  },
                  {
                    label :'Zip code',
                    input_type: 'input',
                    type : 'zipcode',
                    name :'zip_code',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: 'You must enter minimum 5 characters',
                    zip: true,
                  },
                  {
                    label :'Do you have WhatsApp',
                    input_type: 'checkbox',
                    type : 'text',
                    name :'is_whatsapp',
                    placeholder : '',
                    required : false,
                    hidden: false,
                    value : 0,
                   
                  },
                  {
                    label :'Emergency Contact Name ',
                    input_type: 'input',
                    type : 'text',
                    name :'emg_contact_name',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value :'',
                    tooltip: ''
                  },
                  {
                    label :'Emergency Contact Phone',
                    input_type: 'input',
                    type : 'pattern',
                    name :'emg_contact_phone',
                    placeholder : 'Phone number must be of 10 digits',
                    required : true,
                    hidden: false,
                    value : '',
                    tooltip: '',
                    // pattern: true
                  },

                 

                  // {
                  //   label :'Is the WhatsApp in same number',
                  //   input_type: 'checkbox',
                  //   type : 'text',
                  //   name :'whats_same',
                  //   placeholder : '',
                  //   hidden: true,
                  //   value : 0,
                    
                  // },
                  // {
                  //   label :'Whatsapp number',
                  //   input_type: 'input',
                  //   type : 'pattern',
                  //   name :'whats_number',
                  //   placeholder : '',
                  //   required : true,
                  //   hidden: false,
                  //   value : '',
                  //   tooltip: '',
                  //   // pattern: true
                  // },
                  {
                    label :'About Yourself',
                    input_type: 'textarea',
                    type : 'text',
                    name :'about_yourself',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    
                    
                  },
                  {
                    label :'Why do you want to Volunteer with Nunmaan.org ?',
                    input_type: 'textarea',
                    type : 'text',
                    name :'why_volunteer',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    
                  },
                  {
                    label :'Hobbies',
                    input_type: 'textarea',
                    type : 'text',
                    name :'hobbies',
                    placeholder : '',
                    required : true,
                    hidden: false,
                    value : '',
                    
                  },
              ]
            }
        ]
        break;
    }
    
    
    let v = {}
    this.forms_data1.map(res =>{
      res.group_fileds.map(op =>{
        if(op.type == 'pattern'){
          v[op.name] = new FormControl(op.value, [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
        }
        else if(op.type == 'email'){
          v[op.name] = new FormControl(op.value, [Validators.required,Validators.email])
        }else if(op.type == 'zipcode'){
          v[op.name] = new FormControl(op.value, [Validators.required,Validators.minLength(5),Validators.maxLength(6)])
          // Validators.pattern("^((\\+91-?)|0)?[a-zA-Z0-9]{6}$")
        }else{
          v[op.name] = new FormControl( op.value ,[])
        }
      })
    })
    
    this.order_form =  this.formBuilder.group(v)

    Object.keys(this.order_form.controls).forEach(key => {this.order_form.get(key).setValue(this.item[key])});
    
    this.get_values(this.forms_data1);

  }


  get_values(datas){
    
    console.log('entered');

    datas.map(res=>{
      res.group_fileds.map(r=>{
        if(r.input_type == 'Radio_Button' || r.input_type ==  'dropdown'){
          let data = r.value ? r.value : r.options[0].name;
          this.order_form.get(r.name).setValue(data);
        }
        if(r.input_type == 'checkbox'){
          if(this.db.category_id.length != 0){
            this.db.category_id.map(res=>{
              r.options.map(r=>{
                if(r.name == res.category){
                  r.check = true
                }
              })
            })
           }
           else{
              //  <----- ---->
           }
        }
        
      })
  
    })
  }


}


// this.db.alert("Submitted Successfully")
// setTimeout(() => {
//   this.router.navigateByUrl('/home')
// }, 1000);
// this.order_form.reset();
// this.submitted = false; 


// this.order_form.value.is_active.setValue(this.db.category_id.length == 0 ? 0 : 1)
// console.log("------------",this.order_form)

 // this.PhoneUSValidator = Validators.pattern(/^(\d{3}\)\d{3}\-\d{4}$/);

// submit(){
//   this.submitted = true;
//   // console.log(this.order_form)
//   if(this.order_form.status == 'VALID'){
//     let data =  {
//       "first_name": this.order_form.value.first_name,
//       "last_name": this.order_form.value.last_name,
//       "user_email": this.order_form.value.user_email,
//       "phone_number": this.order_form.value.phone_number,
//       "password": this.order_form.value.password,
//       "ismobile":0,
//       "business_address":this.order_form.value.business_address,
//       "country":"Canada"
//      }
//      this.db.register_business(data).subscribe(res=>{
//       //  console.log(res)
//        if(res.message && res.message.status == 'failed'){
//          this.db.alert(res.message.message);
//        }else{
//         if(res.message.full_name){
//           this.insert_business(res.message);
//          // this.router.navigateByUrl('/complete-partner-registration')
//        }
//        }
//      })
//     }
//   }


// redirect(){
  //   this.router.navigateByUrl('/home');
  //   this.order_form.reset();
  //   this.db.submitted_data = false;
  //   this.submitted = false; 
  // }


 // const PhoneUSValidator = Validators.pattern(/^(d{3})d{3}-d{4}$/);


// if(op.pattern && op.required){
        //   v[op.name] = new FormControl(op.value, [Validators.required]);
        // }else
        // this.order_form = this.formBuilder.group({
        //   v: [null, [PhoneUSValidator]]
        // })
        // '/^\(\d{3}\) \d{3}-\d{4}$/',