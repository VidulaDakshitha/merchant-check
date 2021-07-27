import { Component, OnInit ,TemplateRef, ChangeDetectorRef, ViewChild, ElementRef} from '@angular/core';
import { PackageItemService } from '../../../@core/services/package-item.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogService, NbDialogRef ,NbDateService } from '@nebular/theme';
import { ToastrComponent } from '../../../@theme/components';
import { environment} from '../../../../environments/environment'
import Swal from 'sweetalert2';
import { EncriptionService } from '../../../@core/services/encription.service';
import { PackageService } from '../../../@core/services/package.service';

@Component({
  selector: 'ngx-package-item',
  templateUrl: './package-item.component.html',
  styleUrls: ['./package-item.component.scss']
})
export class PackageItemComponent implements OnInit {

  
  image_base_path = environment.aws;

  add_item_model; 
update_item_model; 
delete_item_model; 

  update_package_model; 

  itemAddForm:FormGroup;
  itemUpdateForm:FormGroup;
  itemDeleteForm:FormGroup;


  add_assign_model; 
update_assign_model; 
delete_assign_model;

  itemAssignForm:FormGroup;
  itemAssignUpdateForm:FormGroup;
  assignDeleteForm:FormGroup;


tabs:any[];


//For pagination
      p: number = 1;
      pageSize: number = 10;
      total: number = 0;


      pHistory: number = 1;  
      pageSizeHistory: number = 10;
      totalHistory: number = 0;

//for lists
    package_list: any[]
    package_itemlist: any[]
    package_assignitemlist: any[]
    package_item: any[]

    itemUpdateValue;

     //For model views
      add_coupon_model; 
      update_coupon_model; 
      is_loading = false;
      userMessage;
      flipped=false;


        imageBase64: any
         image: any;
         imageUpdate:any;

  constructor(private packageService: PackageItemService,private packageServ: PackageService, private toastr: ToastrComponent,private dialogService: NbDialogService,private fb:FormBuilder,private cd: ChangeDetectorRef, private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.getAllPackageData();
    this.getAllItemData();

      let page_no = 1
       let url_page = this.route.snapshot.params.page;
         if (url_page) {
      page_no = url_page
  }


      this.itemAddForm=this.fb.group({
      item_name:['',Validators.compose([Validators.required,Validators.maxLength(60)])],
      item_key:['',Validators.compose([Validators.required])],
      item_status:[false,Validators.compose([Validators.required])],
      parameter_available:[false,Validators.compose([Validators.required])],
      admin_customizable:[false,Validators.compose([Validators.required])]
    })

          this.itemUpdateForm=this.fb.group({
      item_id:['',Validators.compose([Validators.required])],
      item_name:['',Validators.compose([Validators.required,Validators.maxLength(60)])],
      item_key:['',Validators.compose([Validators.required])],
      item_status:[false,Validators.compose([Validators.required])],
      parameter_available:[false,Validators.compose([Validators.required])],
      admin_customizable:[false,Validators.compose([Validators.required])]
    })

              this.itemDeleteForm=this.fb.group({
      id:['',Validators.compose([Validators.required])],

    })

    this.itemAssignForm=this.fb.group({
      package_id:['',Validators.compose([Validators.required])],
      visualize_name:['',Validators.compose([Validators.required,Validators.maxLength(60)])],
      status:[false,Validators.compose([Validators.required])],
      item_id:['',Validators.compose([Validators.required])],
      parameter_value:['',Validators.compose([Validators.required])]
    })

       this.itemAssignUpdateForm=this.fb.group({
      assign_id:['',Validators.compose([Validators.required])],
      package_id:['',Validators.compose([Validators.required])],
      visualize_name:['',Validators.compose([Validators.required,Validators.maxLength(60)])],
      status:[false,Validators.compose([Validators.required])],
      item_id:['',Validators.compose([Validators.required])],
      parameter_value:['',Validators.compose([Validators.required])]
    })

           this.assignDeleteForm=this.fb.group({
      id:['',Validators.compose([Validators.required])],
    })

   this.pageChanged(page_no);
this.pageChangedAssign(page_no);
  }


      pageChanged(newPage: any) {


    if(this.route.snapshot.url[0].path.toString()=="assign")
    {
     
        this.p = 1
        // this.router.navigate(['/pages/package/budget', { page: this.p}])
       
        this.getPackageItemData(this.p, this.pageSize);

    }else if(this.route.snapshot.url[0].path.toString()=="item"){
      this.tabs=[true,false]
      console.log("its data")
       this.p = newPage
      this.router.navigate(['/pages/package/item', { page: this.p}])
       
        this.getPackageItemData(this.p, this.pageSize);

    }



      //  this.p = newPage
      //  this.router.navigate(['/pages/package-item', { page: this.p}])
       
      //   this.getPackageItemData(this.p, this.pageSize);

        
  }









  




  
  //for getting coupon data
  getPackageItemData(p, pageSize) {
      this.is_loading = true
      //this.coupon_list = [] = []
   
      this.packageService.getPackageItemByPage(p, pageSize).then(
        res => {
          // console.log(res)
          this.is_loading = false
          if (res['message']=="success") {
              this.package_itemlist = res['data']['data']
            
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



    addPackageItemData(){
      this.is_loading = true

    
      let request={
        name:this.itemAddForm.value['item_name'],
        key:this.itemAddForm.value['item_key'],
        status:this.itemAddForm.value['item_status'],
        is_parameter_available:this.itemAddForm.value['parameter_available'],
        is_admin_customizable:this.itemAddForm.value['admin_customizable']

      }
      console.log(request)

      this.packageService.postPackageItemData(request).then(res => {

        console.log(res)
 if (res['message']=="success") {
    this.pageChanged(1);
this.closeAddItems()
   this.toastr.showToast('success', 'success', 'Package items successfully inserted');
 }else{
 this.toastr.showToast('danger', 'error', res['message']);

 }


      }, error => {
        this.is_loading = false
        console.log(error)

        this.toastr.showToast('danger', 'error', 'Internal Server Error');
      })

}



    updatePackageItemData(){
      this.is_loading = true

    
      let request={
        name:this.itemUpdateForm.value['item_name'],
        key:this.itemUpdateForm.value['item_key'],
        status:this.itemUpdateForm.value['item_status'],
        is_parameter_available:this.itemUpdateForm.value['parameter_available']?1:0,
        is_admin_customizable:this.itemUpdateForm.value['admin_customizable']?1:0,
      }


      if(this.itemUpdateValue.name==this.itemUpdateForm.value['item_name'])
      {
        delete request.name
      }

      if(this.itemUpdateValue.key==this.itemUpdateForm.value['item_key'])
      {
        delete request.key
      }
      console.log(request)

      this.packageService.updatePackageItemData(request,this.itemUpdateForm.value['item_id']).then(res => {

        console.log(res)
 if (res['message']=="success") {
    this.pageChanged(1);
this.closeUpdateItems()
   this.toastr.showToast('success', 'success', 'Package items successfully inserted');
 }else{
 this.toastr.showToast('danger', 'error', res['message']);

 }


      }, error => {
        this.is_loading = false
        console.log(error)

        this.toastr.showToast('danger', 'error', 'Internal Server Error');
      })

}

    deleteItemData() {
    this.is_loading = true
    this.packageService.deleteItemPackage(this.itemDeleteForm.value.id).then(res => {
      console.log(res)
      if (res['message']=="success") {
        this.is_loading = false
          this.pageChanged(1);
          this.closeDeleteItem()
        this.toastr.showToast('success', 'success', 'Package item Deleted Successfully')

      } else {
        this.is_loading = false
        console.log('error')
        this.userMessage = res['message']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }
    }, error => {
      this.is_loading = false
      console.log(error)
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    })
  }





    openAddItems(dialogAddItem: TemplateRef<any>) {

      this.add_item_model = this.dialogService.open(dialogAddItem,{closeOnBackdropClick:false ,hasScroll :true});

  }




  closeAddItems(){
    this.add_item_model.close()
    this.itemAddForm.reset()
          this.itemAddForm.get('item_status').patchValue(false)
      this.itemAddForm.get('parameter_available').patchValue(false)
       this.itemAddForm.get('admin_customizable').patchValue(false)
  }

  
    openUpdateItems(dialogUpdateItem: TemplateRef<any>,item) {

      this.itemUpdateValue=item

          setTimeout(() => {
      this.itemUpdateForm.setValue({
        item_id:item.id,
        item_name:item.name,
        item_key: item.key,
        item_status: item.status==1?true:false,
        parameter_available: item.is_parameter_available==1?true:false,
        admin_customizable: item.is_admin_customizable==1?true:false,
      })
    }, 0);



      this.update_item_model = this.dialogService.open(dialogUpdateItem,{closeOnBackdropClick:false ,hasScroll :true});

  }


  closeUpdateItems(){
    this.update_item_model.close();
    this.itemUpdateForm.reset();
  }



    openItemDelete(dialogDeleteItem: TemplateRef<any>,budgetValue) {

          this.itemDeleteForm.setValue({
      id: budgetValue.id,

    });
  
    this.delete_item_model = this.dialogService.open(dialogDeleteItem,{closeOnBackdropClick:false });
  }

     closeDeleteItem() {
    this.delete_item_model.close()
  }




  /********************************************Item data*********************************************************************/


onChangeTab(event:any){
console.log(event)
if(event.tabTitle=="Package Items")
{
  this.router.navigate(['/pages/package/item', { page: this.p}])
}else if(event.tabTitle=="Assign Items to Package"){
  this.router.navigate(['/pages/package/assign', { page: this.pHistory}])
}
}


pageChangedAssign(newPage: any){

    if(this.route.snapshot.url[0].path.toString()=="assign")
    {
       this.pHistory = newPage
       this.tabs=[false,true]
         this.router.navigate(['/pages/package/assign', { page: this.pHistory}])
     
        
        // this.router.navigate(['/pages/package/budget', { page: this.p}])
       
        this.getPackageAssignItemData(this.pHistory, this.pageSizeHistory);

    }else if(this.route.snapshot.url[0].path.toString()=="item"){
     
       this.pHistory = 1
   
       
        this.getPackageAssignItemData(this.pHistory, this.pageSizeHistory);

    }



//this.getPackageAssignItemData(this.p, this.pageSize);
}



  getAllPackageData(){


 
      this.packageServ.getAllPackageData().then(
        res => {
          console.log(res)
          this.is_loading = false
          if (res['message']=="success") {
              this.package_list = res['data']
            
             this.total = res['data']['limit'];
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




    getAllItemData(){


 
      this.packageService.getAllPackageItem().then(
        res => {
      
          this.is_loading = false
          if (res['message']=="success") {
            console.log(res['data'])
              this.package_item = res['data']
            
         
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


  
    getPackageAssignItemData(p, pageSize) {
      this.is_loading = true
      //this.coupon_list = [] = []
   
      this.packageService.getPackageAssignItemByPage(p, pageSize).then(
        res => {
          // console.log(res)
          this.is_loading = false
          if (res['message']=="success") {
              this.package_assignitemlist = res['data']['data']
            console.log(res)
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


      openAddAssign(dialogAssignItem: TemplateRef<any>) {

      this.add_assign_model = this.dialogService.open(dialogAssignItem,{closeOnBackdropClick:false ,hasScroll :true});

  }




  closeAddAssign(){
    this.add_assign_model.close()
           
    this.itemAssignForm.reset()
    this.itemAssignForm.get('status').patchValue(false)
  }


     addPackageAssignData(){
      this.is_loading = true


    
      let request={
        package_id:this.itemAssignForm.value['package_id'],
        visualize_name:this.itemAssignForm.value['visualize_name'],
        status:this.itemAssignForm.value['status'],
        item_id:this.itemAssignForm.value['item_id'],
        parameter_value:this.itemAssignForm.value['parameter_value']

      }
      console.log(request)

      this.packageService.postPackageAssignItemData(request).then(res => {

        console.log(res)
 if (res['message']=="success") {
    this.pageChangedAssign(1);
this.closeAddAssign()
   this.toastr.showToast('success', 'success', 'Assigned items successfully inserted');
 }else{
 this.toastr.showToast('danger', 'error',res['message']);

 }


      }, error => {
        this.is_loading = false
        console.log(error)

        this.toastr.showToast('danger', 'error', 'Internal Server Error');
      })

}
  


updatePackageAssignData(){
      this.is_loading = true


    
      let request={
        package_id:this.itemAssignUpdateForm.value['package_id'],
        visualize_name:this.itemAssignUpdateForm.value['visualize_name'],
        status:this.itemAssignUpdateForm.value['status'],
        item_id:this.itemAssignUpdateForm.value['item_id'],
        parameter_value:this.itemAssignUpdateForm.value['parameter_value']

      }
      console.log(request)

      this.packageService.updatePackageAssignItemData(request,this.itemAssignUpdateForm.value['assign_id']).then(res => {

        console.log(res)
 if (res['message']=="success") {
    this.pageChangedAssign(1);
this.closeUpdateAssign()
   this.toastr.showToast('success', 'success', 'Assigned item successfully updated');
 }else{
 this.toastr.showToast('danger', 'error', res['message']);

 }


      }, error => {
        this.is_loading = false
        console.log(error)

        this.toastr.showToast('danger', 'error', 'Internal Server Error');
      })

}



   deleteAssignData() {
    this.is_loading = true
    this.packageService.deleteAssignItemPackage(this.assignDeleteForm.value.id).then(res => {
      console.log(res)
      if (res['message']=="success") {
        this.is_loading = false
          this.pageChangedAssign(1);
          this.closeDeleteAssign()
        this.toastr.showToast('success', 'success', 'assigned item Deleted Successfully')

      } else {
        this.is_loading = false
        console.log('error')
        this.userMessage = res['message']
        this.toastr.showToast('danger', 'error', this.userMessage)
      }
    }, error => {
      this.is_loading = false
      console.log(error)
      this.toastr.showToast('danger', 'error', 'Internal Server Error')
    })
  }




    openUpdateAssign(dialogUpdateAssignItem: TemplateRef<any>,item) {


          setTimeout(() => {
      this.itemAssignUpdateForm.setValue({
        assign_id:item.id,
        package_id:item.package_id.toString(),
        visualize_name: item.visualize_name,
        status: item.status==1?true:false,
        item_id: item.item_id.toString(),
        parameter_value: item.parameter_value,
      })
    }, 0);



      this.update_assign_model = this.dialogService.open(dialogUpdateAssignItem,{closeOnBackdropClick:false ,hasScroll :true});

  }


    closeUpdateAssign(){
    this.update_assign_model.close()
    this.itemAssignUpdateForm.reset()
  }



      openAssignDelete(dialogDeleteAssign: TemplateRef<any>,assignValue) {

          this.assignDeleteForm.setValue({
      id: assignValue.id,

    });
  
    this.delete_assign_model = this.dialogService.open(dialogDeleteAssign,{closeOnBackdropClick:false });
  }

     closeDeleteAssign() {
    this.delete_assign_model.close()
  }






}
