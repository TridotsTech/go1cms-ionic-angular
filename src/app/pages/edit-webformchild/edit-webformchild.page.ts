import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
// import { SignaturePad } from 'angular2-signaturepad';
import { DbService } from 'src/app/services/db.service';


@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-edit-webformchild',
  templateUrl: './edit-webformchild.page.html',
  styleUrls: ['./edit-webformchild.page.scss'],
})
export class EditWebformchildPage implements OnInit {

  @Input() all_data;
  @Input() child_table_field_name;
  @Input() all_values;
  @Input() index_value;


  submitted = false;

  // signature pad

  signatureImg: string;
  // @ViewChild(SignaturePad) signaturePad: SignaturePad;

  signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 700,
    'canvasHeight': 300
  };

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

  info: any = [];
  form_data: FormGroup;
  form_ctrl_data: any = {};
  // section_break_data;
  json_data;
  doctype;
  form_tile;
  link_flelds_name = [];
  image_field_check = "no uploads";
  values;

  constructor(public ref: ChangeDetectorRef, public db: DbService, private formBuilder: FormBuilder, public alertController: AlertController, public modalctrl: ModalController) {
    // this.ref.detectChanges();
    // this.db.preventBackButton();
  }

  ngOnInit() {
    this.db.preventBackButton();
    // console.log("pop up data", this.all_data)
    // console.log("all values", this.all_values[this.index_value])

    let field_data = this.all_data.docs[0].fields;
    this.doctype = this.all_data.docs[0].name;
    this.json_data = field_data

    // Store doctype for api resource method to db

    // this.db.doc_type = this.doctype;
    // this.db.ad_name = this.titleCase(this.form_tile);

    // setTimeout(() => {
    //   this.store_info()
    //   this.filter_section_break();
    //   this.assign_final_data()
    // }, 50);

    this.store_info()
    this.filter_section_break();
    this.assign_final_data();

    // this.ref.detectChanges();

    this.form_data = this.formBuilder.group(
      this.form_ctrl_data
    );

    // this.get_data();

  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }


  // ngAfterContentInit() {

  //   this.store_info()
  //   this.filter_section_break();
  //   this.assign_final_data()

  // }

  // async get_data() {

  //   await this.get_assign_data();

  //   this.form_data = this.formBuilder.group(
  //     this.form_ctrl_data
  //   );

  // }

  // get_assign_data() {

  //   this.store_info()
  //   this.filter_section_break();
  //   this.assign_final_data()

  // }

  // Title case the title 

  // titleCase(str) {
  //   return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  // }

  // store form control details

  store_info() {

    // For Storing filtered data

    this.json_data.map(res => {

      if (res.fieldtype != "Barcode" && res.fieldtype != "Button" && res.fieldtype != "Color" && res.fieldtype != "Duration" && res.fieldtype != "Dynamic Link" && res.fieldtype != "Fold" && res.fieldtype != "Geolocation" && res.fieldtype != "Heading" && res.fieldtype != "Image" && res.fieldtype != "Markdown Editor" && res.fieldtype != "Percent" && res.fieldtype != "Read Only" && res.fieldtype != "Rating" && res.fieldtype != "Table" && res.fieldtype != "Table MultiSelect") {
        // if (res.fieldtype != "Barcode" && res.fieldtype != "Button" && res.fieldtype != "Color" && res.fieldtype != "Duration" && res.fieldtype != "Dynamic Link" && res.fieldtype != "Fold" && res.fieldtype != "Geolocation" && res.fieldtype != "Heading" && res.fieldtype != "Image" && res.fieldtype != "Markdown Editor" && res.fieldtype != "Percent" && res.fieldtype != "Read Only" && res.fieldtype != "Rating" && res.fieldtype != "Table MultiSelect") {

        this.info.push(res);

        // getting link field options

        if (res.fieldtype == "Link") {

          // this.current_gen_links(res.options);

          this.link_flelds_name.push(res.options);
        }
      }

    })

    // Assign value to form input

    let edit_field_array;

    edit_field_array = Object.keys(this.all_values[this.index_value]);

    this.info.map(fil => {

      edit_field_array.map(arr => {

        if (arr == fil.fieldname) {

          // console.log(arr, '=', fil.fieldname)

          fil.editValue = this.all_values[this.index_value][arr];

          // console.log("VVVVVV", this.all_values[this.index_value][arr]);

          // console.log("fil", fil)
        }

      })
    });

    // console.log("filtered data", this.info)

    this.assign_form_control();

  }

  // Get link field options


  ref_doc = [];

  all_link_opts = {};

  current_gen_links(link_field_array) {

    // console.log("Doc name", refdoc);

    // each.editValue = 0;

    // if (!this.ref_doc.includes(refdoc)) {

    link_field_array.map(refdoc => {

      this.ref_doc.push(refdoc);

      this.db.ref_doc_type = refdoc;

      // console.log("ref doc type", refdoc)
      // console.log("Doctype", this.db.doc_type)

      // console.log(this.link_opts.length);
      // console.log(this.link_opts);

      this.db.get_link_field_options().subscribe(res => {

        // console.log("link field ", res.data)

        let res_data = res.data

        let link_opts = [];

        res_data.map(res => {

          link_opts.push(res.name)

        })

        // console.log("link options", refdoc, "=====", link_opts)

        this.all_link_opts[refdoc] = link_opts;
      })

    })
    // console.log("each array link options", this.all_link_opts)
    // }

    // console.log("array link options", this.all_link_opts)

    // return this.all_link_opts[refdoc]

  }

  // End



  // For web form controls

  assign_form_control() {

    // console.log("filtered data", this.info)

    // this.info.data.web_form_fields.map(res => {

    this.info.map(res => {

      if (res.label && res.fieldtype != "Section Break" && res.fieldtype != "Column Break" && res.fieldtype != "Barcode" && res.fieldtype != "Button" && res.fieldtype != "Color" && res.fieldtype != "Duration" && res.fieldtype != "Dynamic Link" && res.fieldtype != "Fold" && res.fieldtype != "Geolocation" && res.fieldtype != "Heading" && res.fieldtype != "Image" && res.fieldtype != "Markdown Editor" && res.fieldtype != "Percent" && res.fieldtype != "Read Only" && res.fieldtype != "Rating" && res.fieldtype != "Table" && res.fieldtype != "Table MultiSelect") {
        // if (res.label && res.fieldtype != "Section Break" && res.fieldtype != "Column Break" && res.fieldtype != "Barcode" && res.fieldtype != "Button" && res.fieldtype != "Color" && res.fieldtype != "Duration" && res.fieldtype != "Dynamic Link" && res.fieldtype != "Fold" && res.fieldtype != "Geolocation" && res.fieldtype != "Heading" && res.fieldtype != "Image" && res.fieldtype != "Markdown Editor" && res.fieldtype != "Percent" && res.fieldtype != "Read Only" && res.fieldtype != "Rating" && res.fieldtype != "Table MultiSelect") {

        if (res.reqd == 1 && res.options != 'Email') {

          this.form_ctrl_data[res.fieldname] = new FormControl((res.editValue), Validators.required)
        }

        else if (res.reqd == 1 && res.options == 'Email') {
          this.form_ctrl_data[res.fieldname] = new FormControl((res.editValue), [Validators.required, Validators.email])
        }

        else if (res.options == 'Email') {
          this.form_ctrl_data[res.fieldname] = new FormControl((res.editValue), Validators.email)
        }


        else if (res.fieldtype == 'Check') {

          let check;

          if (res.editValue == 1) {

            check = true;
          }

          else if (res.editValue == 0) {

            check = false;
          }

          this.form_ctrl_data[res.fieldname] = new FormControl(check)
        }

        // else if (res.fieldtype == 'Link') {
        //   this.form_ctrl_data[res.fieldname] = new FormControl('')
        // }

        else {
          // this.ref.detectChanges();
          this.form_ctrl_data[res.fieldname] = new FormControl(res.editValue)

          // if (res.editValue != 0) {
          //   this.form_ctrl_data[res.fieldname] = new FormControl(res.editValue)
          // }
          // else if (res.editValue == 0) {
          //   this.form_ctrl_data[res.fieldname] = new FormControl('')
          // }
        }
      }

    })
    // console.log('loop form group data', this.form_ctrl_data)
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
            }

            else if (this.info[k].fieldtype == "Section Break") {

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
    // console.log("type", this.store_field_type)
    if (!this.store_field_type.includes("Section Break")) {
      this.info.map(res => {
        // console.log("wsec", res);
        // console.log(this.section_break_name);
        if (res.fieldtype != "Column Break") {
          this.no_sec_col.push(res);
        }

      })
    }
  }

  // End

  // Check and assign a section brake fields into another section break if section comes without label

  label_name;
  section_break_data_2 = undefined;
  count = 0;
  check_assign_sec_break() {

    // console.log(this.section_break_name);

    return new Promise<void>((resolve, reject) => {

      this.test_section_break_name.map((res, index) => {

        //   // console.log(this.section_break_data[res].label);

        // console.log('sec name', this.section_break_data[res]);
        // console.log('name', res);


        if (this.section_break_data[res] && this.section_break_data[res].label) {

          this.label_name = res;

        }

        //   // console.log("________")
        // console.log("label name", this.label_name)

        else if (this.section_break_data[res] && !this.section_break_data[res].label) {
          // console.log("error", res)
          // // console.log("each field", this.section_break_data[res])

          this.section_break_data[res].map(name => {

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

    // console.log('sec data', this.section_break_data);

    await this.check_assign_sec_break();

    this.section_break_name = this.test_section_break_data
    this.section_break_data_2 = this.section_break_data;

    // console.log("section name", this.section_break_name)
    // console.log("All section data-2", this.section_break_data)

  }


  // Save submitted data

  save_details() {
    // console.log('value', this.form_data.value)
    // console.log(this.form_data.controls['title'].errors.required)
    // console.log("check data", this.field_name)

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
          }
          else if (!this.form_data.value[res.fieldname]) {
            this.form_data.value[res.fieldname] = 0
          }
        }

      });

      //To store the base 64 converted image in the current form data

      this.field_name.map((res, index) => {

        // console.log("field///name", this.file_name[index], this.file_name )

        // this.form_data.value[res] = this.base64_url[index]

        // this.form_data.value[res] = {
        //   filename: this.file_name[index],
        //   filedata: this.base64_url[index]
        // }

        this.form_data.value[res] = this.file_name[index]

      })

      this.signature_fieldname.map((res, index) => {
        this.form_data.value[res] = this.signature_base64_url[index]
      })

      // End

      // console.log('value', this.form_data.value)
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

      if (this.form_data.status == "VALID") {
        // alert("Valid")
        let data = {};
        this.info.map(res => {

          // console.log(this.form_data.value)

          if (res.fieldtype != "Column Break" && res.fieldtype != "Section Break") {


            data[res.fieldname] = this.form_data.value[res.fieldname]

          }

        })

        // console.log("final sent data", data)

        let input_data = {
          responsedata: data
        }

        this.modalctrl.dismiss({
          form_data: data,
          child_table_field_name: this.child_table_field_name
        });

        this.submitted = false;
        this.image_field_check == "true"
        // this.loop = false;

        // this.form_data.reset();

        // this.form_data['controls']['itemname'].reset();

      }
    }

    else if (this.image_field_check == "false") {

      this.db.imageAlert();

    }
    // }, 1500);

  }


  //Image attach and Path finder 
  image_count = [];

  changeListener($event, fieldname, i_value): void {

    this.image_count.push(fieldname);
    this.image_field_check = "false";

    // console.log('form value', this.form_data.value)
    // console.log('last value', this.form_data.get(fieldname))
    // let data = this.form_data.get(fieldname)
    // console.log('last value', data.value)
    // console.log(fieldname) 

    this.readThis($event.target, fieldname, i_value);
  }

  readThis(inputValue: any, fieldname, i_value): void {
    // console.log(inputValue)
    // console.log(fieldname)
    var file: File = inputValue.files[0];
    var file_size = inputValue.files[0].size;
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
          }
        })
      }

      else if (!this.field_name.includes(fieldname)) {
        this.field_name.push(fieldname);
        this.base64_url.push(this.categoryimagedata);
      }
      // console.log('three', this.field_name, this.base64_url, this.file_name)
      // this.image = myReader.result;


      // Push file name

      let img_data = {
        // file: this.base64_binary(this.categoryimagedata),
        file_name: this.categoryfile,
        content: this.categoryimagedata,
        decode: "True",
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
              this.all_values[this.index_value][fieldname] = file_url

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

        this.db.filSizeAlert();
        // this.image_field_check = "true";
        if (this.image_count.length == 0) {
          this.image_field_check = "true";
        }
        this.form_data.controls[fieldname].reset();

      }

    }
    myReader.readAsDataURL(file);
    // console.log('form value', this.form_data.value);
  }

  // onclick Get Link Field Options

  // ref_doc = [];

  // res_data = [];

  // link_opts = [];

  // all_link_opts = {};

  // // loop;

  // gen_links(each, refdoc, event) {

  //   // this.loop = true

  //   // console.log("event", event)

  //   // console.log(this.all_link_opts);

  //   // each.editValue = 0;

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

  // Link Field on Change Function

  change_value(each, event) {

    // console.log("on change", each);
    // console.log("on change", event.detail.value)

    // setTimeout(() => {
    //   each.editValue = undefined;
    //   each.editValue = event.detail.value
    // }, 50);

    // each.editValue = 0;

    // each.editValue = event.detail.value;



    // this.ref.detectChanges();
    // console.log("change", each.editValue)
  }

  // set_value(each_value) {

  //   console.log("a////////////////////////////////////////////////////////////////////////////////");

  //   setTimeout(() => {
  //     return each_value;
  //   }, 50);


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

  // Clear image data from list

  clear_image_data(image_data, fieldname) {

    let image_url = image_data
    if (this.file_name.includes(image_url)) {
      let file_index_value = this.file_name.indexOf(image_url);
      this.file_name.splice(file_index_value, 1, "");
    }
    this.all_values[this.index_value][fieldname] = "";
    this.form_data.controls[fieldname].reset();
  }
}
