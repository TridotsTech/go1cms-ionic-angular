import {
  Component,
  HostListener,
  OnInit,
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

import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { DbService } from 'src/app/services/db.service';

import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  contactus_form: FormGroup;
  submitted = false;
  // business_info =[];
  // business_addressres=[];
  focus : any ={}
  captcha = false;
  captcha_key;

  mobile_page
  vendor;
  constructor(public db:DbService,private alertCtrl:AlertController,private loadingCtrl:LoadingController,private formbuilder:FormBuilder,private modalCtrl:ModalController,private router:Router,private route:ActivatedRoute) {
    this.captcha_key = '6Ld-4BUgAAAAAJRFy0kvoRq7VOqgns-n_Fmh5h-i';
    this.db.ismobile ? this.mobile_page = false :  this.mobile_page = false;
  }

  ngOnInit() {
    this.route.params.subscribe(res =>{
      if(res.type == 'vendor'){
          this.vendor = true
      } else {
         this.vendor = false
      }
    })

    this.contactus_form = this.formbuilder.group({
      username: new FormControl('',[Validators.required,Validators.maxLength(20)]),
      mailid: new FormControl((''),[ Validators.required,Validators.email]),
      phonenumber: new FormControl((''), [Validators.required,Validators.pattern("^((\\+91-?) |0)?[0-9]{10}$")]),
      subject: new FormControl(( ''), [Validators.required,Validators.maxLength(150)]),
      message: new FormControl((''), Validators.required),
      // captcha: new FormControl(null, Validators.required)
    });

  }


  @HostListener('window:resize', ['$event'])
  private func(){
    this.db.ismobile  = this.db.checkmobile();
  }
  // this.business_info = res.message ;
  // this.business_addressres = this.business_info[0].business_address.split(',');


  get username() {
    return this.contactus_form.get('username');
  }

  get mailid() {
    return this.contactus_form.get('mailid');
  }

  get phonenumber() {
    return this.contactus_form.get('phonenumber');
  }

  get subject() {
    return this.contactus_form.get('subject');
  }


  async submit_form() {
    // console.log(this.contactus_form)
    this.submitted = true;
      if(this.contactus_form.status == 'VALID' && this.captcha){
        let loader = await this.loadingCtrl.create({
          spinner: 'bubbles',
          message: 'Loading Please Wait...'
        });
        await loader.present();
        let v = this.contactus_form.value
        this.vendor ? v['business'] = "BS-00010" : null
        this.db.insert_contact_form({data: JSON.stringify(v)}).subscribe(r=>{
          loader.dismiss();
          this.alert();
        }, error => { console.log(JSON.stringify(error.json()));
          loader.dismiss();
        })
      } else {
        // this.contactus_form.controls['username'].setErrors({ 'required': true });
        // this.contactus_form.controls['emailid'].setErrors({ 'required': true });
        // this.contactus_form.controls['phonenumber'].setErrors({ 'required': true });
        // this.contactus_form.controls['subject'].setErrors({ 'required': true });
      }
  }

  
 async alert() {
    const success_alert = await this.alertCtrl.create({
      subHeader: 'Contact Request sent successfully...!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigateByUrl('/')
            this.loadingCtrl.dismiss();
            // this.modalCtrl.dismiss();
          }
        }
      ]
    });
   await success_alert.present();
  }

  public resolved(captchaResponse: string): void {
    this.captcha = true;
    // console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    // console.log(`reCAPTCHA error encountered; details:`, errorDetails);
    this.captcha = false;
  }



  

}

