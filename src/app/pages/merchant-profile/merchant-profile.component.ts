import { Component, OnInit, ViewChild, ElementRef, NgZone, Input, AfterViewInit,TemplateRef,ChangeDetectorRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../@theme/components'
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { UserService } from '../../@core/services/user.service'
import { environment } from '../../../environments/environment'
import { MapsAPILoader } from '@agm/core';
// import http.client
import { MerchantProfileService } from '../../@core/services/merchant-profile.service';

@Component({
  selector: 'ngx-merchant-profile',
  templateUrl: './merchant-profile.component.html',
  styleUrls: ['./merchant-profile.component.scss']
})
export class MerchantProfileComponent implements OnInit, AfterViewInit{
  
  @ViewChild('imageInput', { static: false }) fileUploader: ElementRef;
  @ViewChild('search_data', {static: false}) searchElementRef: ElementRef;
  @Input() fromParent;
   pdf_merchant
  locationupdate
  is_loading = false
  userMessage
  merchant_details
  image: any;
  image_base_path = environment.aws;
  imageBase64: any
  update_pro_pic_model
  update_address

  
  state1 = true
  state2 = false
  currentDifficulty = 'easy';
showLocation=false;


  user_update_model
  alternative_mobile_format = "+94"

  latitude: number;
  longitude: number;
  merchant_detail:any
  zoom: number;
  address: string;
  private geoCoder;

  x

  userUpdateForm: FormGroup
  banklocationForm: FormGroup
  proPicUpdateForm: FormGroup

  constructor(
    private toastr: ToastrComponent,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private userService: MerchantProfileService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private cd: ChangeDetectorRef,
  ) {
    this.userUpdateForm = this.fb.group({
      cust_transaction: [''],
      opening_hours: [''],
      close_day: [''],
      parking: [''],
      other: [''],
      service: [''],
      is_delivery: [''],
      delivery_range: [''],
      is_alert: [''],
      alternative_mobile: ['',],
      agreement: ['',],
      delivery_charge: ['',],

     
    });
    this.banklocationForm = this.fb.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    });
    this.proPicUpdateForm = this.fb.group({
      logo: ['']
    });

    // map
    // this.mapsAPILoader.load().then(() => {
    //   this.setCurrentLocation();
    //   this.geoCoder = new google.maps.Geocoder;})
   }

  ngAfterViewInit() {
    setTimeout(() => console.log(this.searchElementRef));


 
}

  ngOnInit() {

    //     this.zoom = 4;
    // this.latitude = 39.8282;
    // this.longitude = -98.5795;
    this.getMerchantDetails()
  
    //     this.mapsAPILoader.load().then(() => {
    //   this.setCurrentLocation();
    //   this.geoCoder = new google.maps.Geocoder;
 
    //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef["nativeElement"]);

    //   autocomplete.addListener("place_changed", () => {
    //     console.log(autocomplete)
    //     this.ngZone.run(() => {

    //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();

      
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }
 
        
    //       this.latitude = place.geometry.location.lat();
    //       this.longitude = place.geometry.location.lng();
    //       this.zoom = 12;
    //     });
    //   });
    // });


  }
 


 laterFunction(){
console.log("hello")
    this.mapsAPILoader.load().then(() => {
      //this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;})

   }
 

  

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      // this.userService.getMerchantProfileDetails().then(
      //   res => {
      //     this.is_loading = false
      //     if (res['success']) {
      //       this.merchant_detail = res['merchant'];
      //         this.latitude = parseFloat(this.merchant_detail.latitude);
      //         this.longitude = parseFloat(this.merchant_detail.longitude);
      //         console.log('test latitude merchant')
      //         this.zoom = 8;
      //         this.getAddress(this.latitude, this.longitude);
      //     }
      //     else {
      //       this.userMessage = res['description']
      //       this.toastr.showToast('danger', 'error', this.userMessage)
      //     }
      //   },
      //   err => {
      //     this.is_loading = false
      //     console.log(err);
      //     this.toastr.showToast('danger', 'error', 'Internal Server Error')
      //   }
      // );
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
 
 
  markerDragEnd($event: any) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }

  getMerchantDetails() {
    this.is_loading = true
    this.userService.getMerchant().then(
      res => {
        this.is_loading = false
        // console.log(res,'merchant details get')
        if (res['message']="success") {

          this.merchant_details = res['data'];
          console.log(this.merchant_details)
          //  console.log(this.merchant_details.business_cat,'Business catergory')
          //  console.log(this.merchant_details.business_type,'Business Type')
          //  console.log(this.merchant_details.business_name,'Business Name')
          //  console.log(this.merchant_details.register_no ,'Register Number')
          //  console.log(this.merchant_details.address_corr ,'Address')
          //  console.log(this.merchant_details.user_email ,'Email')
          //   console.log(this.merchant_details.logo,'Profile picture')
          // console.log(this.merchant_details['account_details'][0].bank_id__name,'Bank name')
          //   console.log(this.merchant_details['commission_details'][0].rate,'Commision rate')
          //    console.log(this.merchant_details['commission_details'][0].type,'Commision type')
console.log(this.merchant_details['commission_details'],'rate')

              
             
        }
        else {
          this.userMessage = res['description']
          this.toastr.showToast('danger', 'error', this.userMessage)
        }
      },
      err => {
        this.is_loading = false
        console.log(err);
        this.toastr.showToast('danger', 'error', 'Internal Server Error')
      }
    );
  }

  

  // update user compay details
  openUpdateUserCompanyDetail(dialogUpdateUserCompanyDetail: TemplateRef<any>, user_details) {

    // this.userUpdateForm.setValue({
    //   cust_transaction: user_details.cust_transaction,
    //   opening_hours: user_details.opening_hours,
    //   close_day: user_details.close_day,
    //   parking: user_details.parking,
    //   other: user_details.other,
    //   service: user_details.service,
    //   is_delivery: user_details.is_delivery,
    //   delivery_range: user_details.delivery_range,
    //   is_alert: user_details.is_alert,
    //   alternative_mobile: user_details.alternative_mobile,
    //   agreement: user_details.agreement,
    //   delivery_charge: user_details.delivery_charge,
      
    // });

    this.user_update_model = this.dialogService.open(dialogUpdateUserCompanyDetail, { closeOnBackdropClick: false });
  }

  updateUserData() {
    // this.userService.updateUserData(this.userUpdateForm.value).then(res => {
    //   if (res['success']) {
    //     this.is_loading = false
    //     this.user_update_model.close()
    //     this.userUpdateForm.reset()
    //     this.toastr.showToast('success', 'success', 'Payment Success')
    //     this.getMerchantDetails()
       
    //   } else {
    //     this.is_loading = false
    //     console.log('error')
    //     this.userMessage = res['description']
    //     this.toastr.showToast('danger', 'error', this.userMessage)
        
    //   }
    // }, error => {
    //   this.is_loading = false
    //   this.toastr.showToast('danger', 'error', 'Internal Server Error')
    //   console.log(error)
    // })
  }

  //update address
  openAddress(dialogAddress: TemplateRef<any>) {
 
    this.update_address = this.dialogService.open(dialogAddress, { closeOnBackdropClick: false });
     //this.showLocation=!this.showLocation


    //          this.zoom = 4;
    // this.latitude = 39.8282;
    // this.longitude = -98.5795;
    // this.getMerchantDetails()
   setTimeout(() => {
        this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
 
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef["nativeElement"]);

      autocomplete.addListener("place_changed", () => {
        console.log(autocomplete)
        this.ngZone.run(() => {

          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

      
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
 
        
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });


       }, 1000);
  }

  updatelocationData() {
    // let data =this.banklocationForm.value
    // data['longitude']= this.longitude
    // data['latitude']= this.latitude
    // console.log('new location',data)
    // this.userService.updateUserData(data).then(res => {
    //   if (res['success']) {
    //     this.is_loading = false
    //     this.userUpdateForm.reset()
    //     this.toastr.showToast('success', 'success', 'Location Change Success')
    //     this.getMerchantDetails()
    //     // this.updateLocation()
    //     this.update_address.close()
       
    //   } else {
    //     this.is_loading = false
    //     console.log('error')
    //     this.userMessage = res['description']
    //     this.toastr.showToast('danger', 'error', this.userMessage)
        
    //   }
    // }, error => {
    //   this.is_loading = false
    //   this.toastr.showToast('danger', 'error', 'Internal Server Error')
    //   console.log(error)
    // })
  }

  updateLocation() {
    this.x = document.getElementById("myDIV");
    if (this.x.style.display === "none") {
      this.x.style.display = "block";
    } else {
      this.x.style.display = "none";
    }
  }

//profile picture upload
openUpdateProPic(dialogProPicUpdate: TemplateRef<any>, user_details) {
  console.log('image',user_details.logo)

  setTimeout(() => {
    this.proPicUpdateForm.setValue({
      logo: user_details.logo,
    })
  }, 0);
  this.image = this.image_base_path + user_details.logo
  this.update_pro_pic_model = this.dialogService.open(dialogProPicUpdate, { closeOnBackdropClick: false });
}




close3() {
  this.proPicUpdateForm.reset()
  this.update_pro_pic_model.close()
}
updateMerchantProPicData() {
  this.is_loading = true
  let data = this.proPicUpdateForm.value
  
  if (this.imageBase64) {
    data.logo = this.imageBase64
  }
  else {
    data.logo = ''
  }

  // this.resetImage()
  this.is_loading = true
  console.log(this.proPicUpdateForm.value)
  this.userService.updateProfilePic(data).then(res => {

    console.log(res)
    if (res['message']=="success") {
      this.is_loading = false
      this.getMerchantDetails()
      this.update_pro_pic_model.close()
      this.proPicUpdateForm.reset()
      this.resetImage()
      this.toastr.showToast('success', 'success', 'Profile Photo Update Success')
    } else {
      this.is_loading = false
      console.log('error')
      this.userMessage = res['description']
      this.toastr.showToast('danger', 'error', this.userMessage)
    }
  }, error => {
    this.is_loading = false
    console.log(error)
    this.toastr.showToast('danger', 'error', 'Internal Server Error')
  })
}
// updateMerchantProPicData() {
//   this.is_loading = true
//   let data = this.proPicUpdateForm.value

//   if (this.imageBase64) {
//     data['logo'] = [this.imageBase64]
//   }
//   else {
//     data['logo'] = ''
//   }

//   this.is_loading = true
//   this.userService.updateUserData(data).then(res => {
//     console.log(res)
//     if (res['success']) {
//       this.is_loading = false
//       this.update_pro_pic_model.close()
//       this.proPicUpdateForm.reset()
//       this.resetImage()
//       this.toastr.showToast('success', 'success', 'Bank Update Success')
//     } else {
//       this.is_loading = false
//       console.log('error')
//       this.userMessage = res['description']
//       this.toastr.showToast('danger', 'error', this.userMessage)
//     }
//   }, error => {
//     this.is_loading = false
//     console.log(error)
//     this.toastr.showToast('danger', 'error', 'Internal Server Error')
//   })
// }


//image settings
onFileChange(event) {
  console.log(event)
  let reader = new FileReader();

  if (event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.imageBase64 = reader.result;
      this.image = reader.result;
      this.cd.markForCheck();
    };
  }
}
updateValues(event) {

}

resetImage() {
  this.image = ""
  this.imageBase64 = ""
  console.log(this.fileUploader.nativeElement)
  this.fileUploader.nativeElement.value = "";
}




  
  sec1_show() {
      this.state1 = true;
      this.state2 = false;
    
  };
  sec2_show() {
      this.state2 = true;
      this.state1 = false
  };


 


  
  
 
}
