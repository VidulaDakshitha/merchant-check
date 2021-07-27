import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../@core/services/user.service';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../../@theme/components';

@Component({
  selector: 'ngx-active-merchant',
  templateUrl: './active-merchant.component.html',
  styleUrls: ['./active-merchant.component.scss']
})
export class ActiveMerchantComponent implements OnInit {

  p: number = 1;
  total: number = 0;
  pageSize: number = 10;
  userMessage
  merchant_details = [] = []
  is_loading = false

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private toastr: ToastrComponent,
  ) { }

  ngOnInit() {
    
  }
 

}
