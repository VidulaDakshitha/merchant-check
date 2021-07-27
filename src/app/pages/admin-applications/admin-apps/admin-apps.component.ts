import {
  Component,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { AdminAppService } from "../../../@core/services/admin-app.service";
import {
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { ToastrComponent } from "../../../@theme/components";

@Component({
  selector: "ngx-admin-apps",
  templateUrl: "./admin-apps.component.html",
  styleUrls: ["./admin-apps.component.scss"],
})
export class AdminAppsComponent implements OnInit {
  app_list: any[];
  FilterForm: FormGroup;

  //For pagination
  p: number = 1;
  pageSize: number = 10;
  total: number = 0;

  is_loading = false;
  userMessage;

  constructor(
    private app_service: AdminAppService,
    private toastr: ToastrComponent,
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.FilterForm = this.fb.group({
      status: [""],
      email: [""],
    });

    this.p = 1;
    this.pageChanged(1);
  }

  pageChanged(newPage: any) {
    this.p = newPage;

    this.getDataWithFilters(
      newPage,
      this.pageSize,
      this.FilterForm.value["status"],
      this.FilterForm.value["email"]
    );
  }

  getDataWithFilters(pageNumber, limit, status, email) {
    let condition = "";

    if (status) {
      condition = condition + "&status=" + status;
    }

    if (email) {
      condition = condition + "&email=" + email;
    }

    this.app_service.getAllAppsByPage(pageNumber, limit, condition).then(
      (res) => {
        this.is_loading = false;
        console.log(res["data"]);
        if (res["message"] == "success") {
          this.app_list = res["data"];

          this.total = res["count"];
        } else {
          this.userMessage = res["message"];
          this.toastr.showToast("danger", "error", this.userMessage);
        }
      },
      (err) => {
        this.is_loading = false;
        console.log(err);
        this.toastr.showToast("danger", "error", "Internal Server Error");
      }
    );
  }

  navigateViews(id) {
    this.router.navigate(["/pages/view-app/" + id]);
  }

  transactionSubmit() {
    this.p = 1;

    this.getDataWithFilters(
      this.p,
      this.pageSize,
      this.FilterForm.value["status"],
      this.FilterForm.value["email"]
    );
  }

  resetFields() {
    this.FilterForm.reset();
    this.getDataWithFilters(
      1,
      this.pageSize,
      this.FilterForm.value["status"],
      this.FilterForm.value["email"]
    );
    //       setTimeout(() => {
    //   this.FilterForm.setValue({
    //     status:' ',
    //   })
    // }, 0);
    this.FilterForm.get("status").patchValue("");
  }

  updateStatus(id) {
    const data = {
      id: parseInt(id),
    };

    this.app_service.updateAppStatus(data).then(
      (res) => {
        this.is_loading = false;
        console.log(res);
        if (res["message"] == "success") {
          this.toastr.showToast("success", "success", this.userMessage);
          this.getDataWithFilters(
            this.p,
            this.pageSize,
            this.FilterForm.value["status"],
            this.FilterForm.value["email"]
          );
        } else {
          this.userMessage = res["message"];
          this.toastr.showToast("danger", "error", this.userMessage);
        }
      },
      (err) => {
        this.is_loading = false;
        console.log(err);
        this.toastr.showToast("danger", "error", "Internal Server Error");
      }
    );
  }
}
