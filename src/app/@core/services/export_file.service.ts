import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ToastrComponent } from '../../@theme/components';
import * as $ from 'jquery';
import * as jsPDF from 'jspdf';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class FileExportService {

  constructor(private toastr: ToastrComponent) { }

  public exportAsExcelFile(allData: any[], headers: any[], excelFileName: string): void {
    let json = this.changeHeaders(allData, headers)

    if(!json.length) {
      this.toastr.showToast('danger', 'error', 'Oh Snap! - Table Headers missed match for export the excel file');
      return;
    }

    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported'+ EXCEL_EXTENSION);
  }

  changeHeaders(data, allHeaders){
    let allData = $.extend(true, [], data)
    try {
      for(let a=0;a<allHeaders.length;a++) {
        allData.forEach(function (item) {
          item[allHeaders[a]['head']] = item[allHeaders[a]['key']]
          delete item[allHeaders[a]['key']]
        });
      }

      console.log(allData)

      return allData
    } catch (error) {
      return []
    }
  }

  public createPdf(data, headers, file_title, description) {
    require('jspdf-autotable');
    const doc = new jsPDF('l', 'mm', 'a1');
    var img = new Image();
    img.src = '../../../../assets/onepay_logo.png'
    
    doc.setFontSize(18);
    doc.setFontSize(11);
  
    let formatted_data = this.formtPdfData(data, headers) 
    var report_name = file_title;
    var description = description;

    (doc as any).autoTable({
      head: formatted_data['heads'],
      body: formatted_data['data'],
      theme: 'striped',
      didDrawCell: data => {},
      didParseCell: function (table) {
        if (table.section === 'head') {
          table.cell.styles.textColor = '#FFFFFF';
          table.cell.styles.fillColor = '#7bc8a1';
        } 
        if (table.row.raw[9] == "Failed"){
          table.cell.styles.fillColor = '#ffcccb';
        }
        console.log(table)
     },
      didDrawPage: function (data) {
        if (img) {
          doc.addImage(img, 'png', data.settings.margin.left, 7, 45, 20);
        }
        doc.text(" * Report :" + report_name, 400, 15);
        doc.text(" * Description :" + description , 400, 25);
      },
      margin: {top: 32}
    }) 
    // doc.output('dataurlnewwindow')
    doc.save('onepay_report.pdf');
  }

  formtPdfData(data, headers) {
    let heads = []
    let formatted_data = []

    headers.forEach(element => {
      heads.push(element.head)
    });

    data.forEach(item => {
      let row_data = []
      
      headers.forEach(header => {
        row_data.push(item[header.key])
      });

      formatted_data.push(row_data)
    });

    console.log({heads: heads, data: formatted_data})
    return {heads: [heads], data: formatted_data}


  }


}