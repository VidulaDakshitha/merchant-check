import { Component, OnInit ,TemplateRef, ChangeDetectorRef, ViewChild, ElementRef} from '@angular/core';
import { PackageService } from '../../../@core/services/package.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogService, NbDialogRef ,NbDateService } from '@nebular/theme';
import { ToastrComponent } from '../../../@theme/components';
import { environment} from '../../../../environments/environment'
import Swal from 'sweetalert2';
import { EncriptionService } from '../../../@core/services/encription.service';

@Component({
  selector: 'ngx-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
    @ViewChild('imageInput', { static: false }) fileUploader: ElementRef;

  image_base_path = environment.aws;

//For package models
  add_package_model; 
  update_package_model; 
  delete_package_model;
    view_package_model;

//For budget models
  add_budget_model;
  update_budget_model;
  delete_budget_model;
   view_budget_model;

//For add package
  PackageAddForm:FormGroup;
  PackageUpdateForm:FormGroup;
  deletePackageForm:FormGroup;

//for add budget
  BudgetAddForm:FormGroup;
  BudgetUpdateForm:FormGroup;
  deleteBudgetForm:FormGroup;

//For pagination package
      p: number = 1;
      pageSize: number = 10;
      total: number = 0;

//for pagination budget
      pHistory: number = 1;  
      pageSizeHistory: number = 10;
      totalHistory: number = 0;

//for lists
 All_package_list: any[]
    package_list: any[]
     budget_list: any[]
     view_package:any[]
     view_budget:any[]

     //For model views
      is_loading = false;
      userMessage;
      flipped=false;


        imageBase64: any
         image: any;
         imageUpdate:any;
         tabs:any[];

packageUpdateValue;
   


  constructor(private packageService: PackageService, private toastr: ToastrComponent,private dialogService: NbDialogService,private fb:FormBuilder,private cd: ChangeDetectorRef, private route: ActivatedRoute,private router: Router,private encrypt:EncriptionService) {
    this.PackageAddForm= this.fb.group({})

   }

  ngOnInit() {
let page_no = 1

 
    
       let url_page = this.route.snapshot.params.page;
         if (url_page) {
      page_no = url_page
    }


    //For adding package data

    this.PackageAddForm=this.fb.group({
      package_name:['',Validators.compose([Validators.required,Validators.maxLength(32)])],
      package_key:['', Validators.required],
      package_description:['', Validators.required],
      package_status:[false, Validators.required],
      package_image:['', Validators.required],
      package_image_caption:['', Validators.required]
    })


    //For Updating package data

        this.PackageUpdateForm=this.fb.group({
      package_id_update:['',Validators.compose([Validators.required])],
      package_name_update:['',Validators.compose([Validators.required,Validators.maxLength(32)])],
      package_key_update:['',Validators.compose([Validators.required])],
      package_description_update:['',Validators.compose([Validators.required])],
      package_status_update:[true,Validators.compose([Validators.required])],
      package_image_update:['',Validators.compose([Validators.required])],
      package_image_caption_update:['',Validators.compose([Validators.required])]
    })

//delete package
        this.deletePackageForm = this.fb.group({
      id: ['', Validators.required],
    });


//For adding budget

        this.BudgetAddForm=this.fb.group({
      package_id:['',Validators.compose([Validators.required])],
      gross_amount:['',Validators.compose([Validators.required])],
      period:['',Validators.compose([Validators.required])],
      handing_fee:['0',Validators.compose([Validators.required])],
      status:[false,Validators.compose([Validators.required])],
      discount:['0',Validators.compose([Validators.required])]
    })


//For updating budget

            this.BudgetUpdateForm=this.fb.group({
      budget_id:['',Validators.compose([Validators.required])],
      package_id:['',Validators.compose([Validators.required])],
      gross_amount:['',Validators.compose([Validators.required])],
      period:['',Validators.compose([Validators.required])],
      handing_fee:['',Validators.compose([Validators.required])],
      status:[false,Validators.compose([Validators.required])],
      discount:['0',Validators.compose([Validators.required])]
    })

//delete budget
        this.deleteBudgetForm = this.fb.group({
      id: ['', Validators.required],
    });

this.getAllBudgetData();
 this.pageChanged(page_no);
 this.pageChangedBudget(page_no);
  }




    pageChanged(newPage: any) {

console.log(this.route.snapshot.url[0].path)

    if(this.route.snapshot.url[0].path.toString()=="budget")
    {
      console.log("its budget")
        this.p = 1
        // this.router.navigate(['/pages/package/budget', { page: this.p}])
       
        this.getPackageData(this.p, this.pageSize);

    }else if(this.route.snapshot.url[0].path.toString()=="data"){
      this.tabs=[true,false]
      console.log("its data")
       this.p = newPage
      this.router.navigate(['/pages/package/data', { page: this.p}])
       
        this.getPackageData(this.p, this.pageSize);

    }
       
  }




  //for getting package data
  getPackageData(p, pageSize) {
      this.is_loading = true
     
   
      this.packageService.getPackageByPage(p, pageSize).then(
        res => {
          console.log(res)
          this.is_loading = false
          if (res['message']=="success") {
              this.package_list = res['data']['data']
            
             this.total = res['data']['limit'];
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



//for opeing package model
  openAddPackage(dialogAddPackage: TemplateRef<any>) {

      this.add_package_model = this.dialogService.open(dialogAddPackage,{closeOnBackdropClick:false ,hasScroll :true});

  }


//for closing package model
    closeAddPackage() {
    this.PackageAddForm.reset()
    this.add_package_model.close()
    this.PackageAddForm.get('package_status').patchValue(false)
this.resetImage();
  }


//For opening package update model
  openUpdatePackage(dialog3: TemplateRef<any>,packagedetails){
this.packageUpdateValue=packagedetails
console.log(packagedetails)
    setTimeout(() => {
      this.PackageUpdateForm.setValue({
        package_id_update:packagedetails.id,
        package_key_update: packagedetails.key,
        package_name_update: packagedetails.name,
        package_description_update: packagedetails.description,
        package_status_update: packagedetails.status==1?true:false,
        package_image_update:"",
         package_image_caption_update: packagedetails.on_image_caption,
      })
    }, 0);
    this.image = this.image_base_path + packagedetails.image
     this.update_package_model = this.dialogService.open(dialog3,{closeOnBackdropClick:false ,hasScroll :true});

  }


//for closing package update model
  
    closeUpdatePackage() {
      this.resetImage();
    this.PackageUpdateForm.reset()
    this.update_package_model.close()
  }


    openPackageDelete(dialogDeletePackage: TemplateRef<any>,packageValue) {

          this.deletePackageForm.setValue({
      id: packageValue.id,

    });
  
    this.delete_package_model = this.dialogService.open(dialogDeletePackage,{closeOnBackdropClick:false });
  }



    openPackageView(dialogViewPackage: TemplateRef<any>,packageValue) {


            this.packageService.getViewPackage(packageValue.id).then(res => {

        console.log(res)
    if (res['message']=="success") {

      this.view_package=res['data']
      console.log(res)
 this.view_package_model = this.dialogService.open(dialogViewPackage,{closeOnBackdropClick:false });
 }else{
 this.toastr.showToast('danger', 'error', 'error');

 }

      }, error => {
        this.is_loading = false
        console.log(error)

        this.toastr.showToast('danger', 'error', 'Internal Server Error');
      })



    // this.view_package_model = this.dialogService.open(dialogViewPackage,{closeOnBackdropClick:false });
  }



     closeDeletePackage() {
    this.delete_package_model.close()
  }



  


    // image upload function
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

//image reset funtion
  resetImage() {
    this.image = ""
    this.imageBase64 = ""
    console.log(this.fileUploader.nativeElement,'rest')
    this.fileUploader.nativeElement.value = "";
  }



// For adding package data

  addPackageData(){
      this.is_loading = true

      let request={
      name:this.PackageAddForm.value['package_name'],
      key:this.PackageAddForm.value['package_key'],
      status:this.PackageAddForm.value['package_status']?1:0,
      description:this.PackageAddForm.value['package_status'],
      image:this.imageBase64,
      on_image_caption:this.PackageAddForm.value['package_image_caption'],
      }


      this.packageService.postPackageData(request).then(res => {

        console.log(res)
    if (res['message']=="success") {
    this.pageChanged(1);
this.resetImage();
this.closeAddPackage();
   this.toastr.showToast('success', 'success', 'Package data successfully inserted');
 }else{
 this.toastr.showToast('danger', 'error', 'error');

 }

      }, error => {
        this.is_loading = false
        console.log(error)

        this.toastr.showToast('danger', 'error', 'Internal Server Error');
      })

}



//For updating package data
  updatePackageData(){
      this.is_loading = true

      let data=this.PackageUpdateForm.value

      let request;
          if (this.imageBase64) {
      data['package_image_update'] = this.imageBase64
             request={
        name:this.PackageUpdateForm.value['package_name_update'],
        key:this.PackageUpdateForm.value['package_key_update'],
        status:this.PackageUpdateForm.value['package_status_update'],
        description:this.PackageUpdateForm.value['package_description_update'],
         image:this.imageBase64,
        on_image_caption:this.PackageUpdateForm.value['package_image_caption_update']

      }
    }
    else {
      data['package_image_update'] = ''
             request={
        name:this.PackageUpdateForm.value['package_name_update'],
        key:this.PackageUpdateForm.value['package_key_update'],
        status:this.PackageUpdateForm.value['package_status_update']?1:0,
        description:this.PackageUpdateForm.value['package_description_update'],
        // image:this.PackageUpdateForm.value['package_image_update'],
        on_image_caption:this.PackageUpdateForm.value['package_image_caption_update']

      }
    }

    if(this.PackageUpdateForm.value['package_name_update']==this.packageUpdateValue.name)
    {
      delete request.name
    }

       if(this.PackageUpdateForm.value['package_key_update']==this.packageUpdateValue.key)
    {
      delete request.key
    }

      console.log(request)

      this.packageService.updatePackageData(request,this.PackageUpdateForm.value['package_id_update']).then(res => {

        console.log(res)
 if (res['message']=="success") {
    this.pageChanged(1);
    this.resetImage();
    this.closeUpdatePackage();
   this.toastr.showToast('success', 'success', 'Package data successfully updated');
 }else{
 this.toastr.showToast('danger', 'error',  res['message']);

 }


      }, error => {
        this.is_loading = false
        console.log(error)

        this.toastr.showToast('danger', 'error', 'Internal Server Error');
      })



}


  deletePackageData() {
    this.is_loading = true
    this.packageService.deletePackage(this.deletePackageForm.value.id).then(res => {
      console.log(res)
      if (res['message']=="success") {
        this.is_loading = false
          this.pageChanged(1);
          this.closeDeletePackage()
        this.toastr.showToast('success', 'success', 'Package Deleted Successfully')

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








/**************************************************budget**************************************************************** */

onChangeTab(event:any){
console.log(event)
if(event.tabTitle=="Assign Budget to Package")
{
  this.router.navigate(['/pages/package/budget', { page: this.pHistory}])
}else if(event.tabTitle=="Package Items"){
  this.router.navigate(['/pages/package/data', { page: this.p}])
}
}
getAllBudgetData(){
        this.is_loading = true
   
      this.packageService.getAllPackageData().then(
        res => {
          console.log(res)
          this.is_loading = false
          if (res['message']=="success") {
            console.log("hi",res['data'])
              this.All_package_list = res['data']
            
          }
          else {
              this.userMessage = res['message']
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

//page change pagination
  pageChangedBudget(newPage: any)
  {
       if(this.route.snapshot.url[0].path.toString()=="budget")
    {
      this.tabs=[false,true]
        this.pHistory = newPage
         this.router.navigate(['/pages/package/budget', { page: this.pHistory}])
    this.getPackageBudgetData(this.pHistory, this.pageSizeHistory)

    }else if(this.route.snapshot.url[0].path.toString()=="data"){
        this.pHistory = 1
    this.getPackageBudgetData(this.pHistory, this.pageSizeHistory)

    }
  
  }


  //For getting package budget data
    getPackageBudgetData(p, pageSize) {
      this.is_loading = true
   
      this.packageService.getPackageBudgetByPage(p, pageSize).then(
        res => {
          console.log(res)
          this.is_loading = false
          if (res['message']=="success") {
              this.budget_list = res['data']['data']
            
             this.totalHistory = res['data']['limit'];
          }
          else {
              this.userMessage = res['message']
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







//for adding package budegt data
    addPackageBudgetData(){
      this.is_loading = true

  let request={
        package_id:parseInt(this.BudgetAddForm.value['package_id']),
        gross_amount:parseInt(this.BudgetAddForm.value['gross_amount']).toFixed(2),
        period:this.BudgetAddForm.value['period'],
        handing_fee:parseInt(this.BudgetAddForm.value['handing_fee']).toFixed(2),
        status:this.BudgetAddForm.value['status'],
        discount:this.BudgetAddForm.value['discount']?parseInt(this.BudgetAddForm.value['discount']).toFixed(2):0.00

      }
      
      console.log(request)

      this.packageService.postPackageBudgetData(request).then(res => {

        console.log(res)
 if (res['message']=="success") {
    this.pageChangedBudget(1);
this.closeAddBudget();
   this.toastr.showToast('success', 'success', 'Package budget data successfully inserted');
 }else{
 this.toastr.showToast('danger', 'error', res['message']);

 }


      }, error => {
        this.is_loading = false
        console.log(error)

        this.toastr.showToast('danger', 'error', 'Internal Server Error');
      })

}




//for adding package budegt data
    updatePackageBudgetData(){
      this.is_loading = true

  let request={
        package_id:parseInt(this.BudgetUpdateForm.value['package_id']),
        gross_amount:parseInt(this.BudgetUpdateForm.value['gross_amount']).toFixed(2),
        period:this.BudgetUpdateForm.value['period'],
        handing_fee:parseInt(this.BudgetUpdateForm.value['handing_fee']).toFixed(2),
        status:this.BudgetUpdateForm.value['status'],
        discount:this.BudgetUpdateForm.value['discount']?parseInt(this.BudgetUpdateForm.value['discount']).toFixed(2):0.00

      }
      
      console.log(request)

      this.packageService.updatePackageBudgetData(request,this.BudgetUpdateForm.value['budget_id']).then(res => {

        console.log(res)
 if (res['message']=="success") {
    this.pageChangedBudget(1);
this.closeUpdateBudget();
   this.toastr.showToast('success', 'success', 'Package budget data successfully updated');
 }else{
 this.toastr.showToast('danger', 'error', res['message']);

 }


      }, error => {
        this.is_loading = false
        console.log(error)

        this.toastr.showToast('danger', 'error', 'Internal Server Error');
      })

}



//for opening budegt model
  openAddBudget(dialogAddBudget: TemplateRef<any>) {
this.add_budget_model=this.dialogService.open(dialogAddBudget,{closeOnBackdropClick:false ,hasScroll :true});
  }

//for closing budegt model
  closeAddBudget(){
    this.BudgetAddForm.reset()
      this.BudgetAddForm.get('discount').patchValue('0')
      this.BudgetAddForm.get('handing_fee').patchValue('0')
       this.BudgetAddForm.get('status').patchValue(false)
    this.add_budget_model.close()
  }


  //for opening budegt update model
  openUpdateBudget(dialogUpdateBudget: TemplateRef<any>,budgetDetails) {


        setTimeout(() => {
      this.BudgetUpdateForm.setValue({
        budget_id:budgetDetails.id,
        package_id:budgetDetails.package_id.toString(),
        gross_amount: budgetDetails.gross_amount,
        period: budgetDetails.period,
        handing_fee: budgetDetails.handing_fee,
        status: budgetDetails.status==1?true:false,
        discount:budgetDetails.discount?budgetDetails.discount:0,
      })
    }, 0);

this.update_budget_model=this.dialogService.open(dialogUpdateBudget,{closeOnBackdropClick:false ,hasScroll :true});
  }



    deleteBudgetData() {
    this.is_loading = true
    this.packageService.deletePackageBudget(this.deleteBudgetForm.value.id).then(res => {
      console.log(res)
      if (res['message']=="success") {
        this.is_loading = false
          this.pageChangedBudget(1);
          this.closeDeleteBudget()
        this.toastr.showToast('success', 'success', 'Package budget Deleted Successfully')

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




//for closing budegt update model
  closeUpdateBudget(){
    this.BudgetUpdateForm.reset()
    this.update_budget_model.close()
  }


      openBudgetDelete(dialogDeleteBudget: TemplateRef<any>,budgetValue) {

          this.deleteBudgetForm.setValue({
      id: budgetValue.id,

    });
  
    this.delete_budget_model = this.dialogService.open(dialogDeleteBudget,{closeOnBackdropClick:false });
  }

     closeDeleteBudget() {
    this.delete_budget_model.close()
  }


  openViewBudget(dialogDeleteBudget: TemplateRef<any>,budgetValue){
    this.view_budget=budgetValue
this.view_budget_model = this.dialogService.open(dialogDeleteBudget,{closeOnBackdropClick:false });
  }


}
