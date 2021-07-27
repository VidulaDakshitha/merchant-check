import { Component, OnInit, Input, ViewChild } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../@theme/components';
import { FileExportService } from '../../@core/services/export_file.service';

@Component({
  selector: 'ngx-op-data-table',
  templateUrl: './op-data-table.component.html',
  styleUrls: ['./op-data-table.component.scss']
})
export class OpDataTableComponent implements OnInit {

  @Input()  data: any
  @Input()  headers: any
  @Input()  isLoading = false
  @Input()  title = 'Exported Document by Onepay'
  @Input()  description = 'Exported Document by Onepay'

  allHeaders=[]
  
  p: number = 1;
  pageSize: number = 10
  total: number = 0;
  viewModel: any;

  constructor(private toastr: ToastrComponent, private FileExportService: FileExportService, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    if(this.headers.length) {
      this.allHeaders = this.headers
    }
  }

  headCellRender(){
    if(this.headers.length) {
      let selected_headers = this.allHeaders.filter(header => header['fixed'] || header['selected']);
      return selected_headers
    } else {
      return []
    }
  }

  getSelectionCheckStatus(row) {
    return row['fixed'] || row['selected']
  }

  changeSelectionStatus(header, event) {
      console.log(header.key,'cheack table')
    if(event.target.checked) {
      header.selected = true
      this.allHeaders[this.allHeaders.findIndex(el => el.key === header.key)] = header;
    } else {
      header.selected = false
      this.allHeaders[this.allHeaders.findIndex(el => el.key === header.key)] = header;
    }
  }

  openColumnSelection(selectionModel) {
    this.viewModel = this.dialogService.open(selectionModel, {
      closeOnBackdropClick: false,
    });
  }

  cancel() {
    this.viewModel.close()
  }

  renderCells(item, head){
    return item[head.key] ? item[head.key] : 'N/A'
  }

  exportToExcel(){
    if(!this.data.length) {
      this.toastr.showToast('danger', 'error', 'Oh Snap! - There are not available data to export');
      return;
    }

    this.FileExportService.exportAsExcelFile(this.data, this.allHeaders, 'onepay_report')
  }

  exportPDF() {
    if(!this.data.length) {
      this.toastr.showToast('danger', 'error', 'Oh Snap! - There are not available data to export');
      return;
    }

    this.FileExportService.createPdf(this.data, this.allHeaders, this.title, this.description)
  }
}