import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf'
import * as htmltocanvas from 'html2canvas'
import 'jspdf-autotable'
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {

  constructor(public datepipe: DatePipe) { }

  generatePDF(logo, object) {
    let doc = new jsPDF('p', 'mm', 'a4');

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    let page = this.htmlTemplate(object, doc)

    doc.fromHTML(page, 15, 25, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.addPage()
    doc.addPage()

    const pageCount = doc.internal.getNumberOfPages()

    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i)

      this.loadHeaderBox(doc, i)

      this.loadCanvas(i, doc)

      doc.setFont('helvetica')
      // Header 
      doc.setFontSize(8)
      doc.addImage(logo, 'PNG', 35, 10, 64, 22);
      doc.text('Merchant Onboarding Application', doc.internal.pageSize.width - 20, 8, {
        align: 'right'
      })

      doc.setFontSize(12)
      doc.text('SPEMAI(PVT)', doc.internal.pageSize.width - 100, 20, {
        align: 'left'
      })
      doc.setFontSize(10)
      doc.text('Incorporation number : PV00206829', doc.internal.pageSize.width - 100, 25, {
        align: 'left'
      })
      doc.setFontSize(10)
      doc.text('1st Floor,NO 410/22,Galle Road,Colombo 3', doc.internal.pageSize.width - 100, 30, {
        align: 'left'
      })
      doc.setFontSize(10)
      doc.text('+94(11)702 1540', doc.internal.pageSize.width - 100, 35, {
        align: 'left'
      })
      doc.setLineWidth(0.5);
      doc.line(12, 40, 197, 40); // head-horizontal line

      // Footer 
      doc.setFontSize(8)
      doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width / 2, 287, {
        align: 'center'
      })

      // footer-horizontal line
      doc.setLineWidth(0.5);
      doc.line(12, 272, 197, 274); // footer-horizontal line
    }

    this.loadData(doc, object)

    doc.save('test.pdf');
  }

  //${object.business_name}

  private htmlTemplate(object, doc) {
    let page =
      `<html>
      <body>
      
        <h3 style="margin-left:360px;margin-bottom:40px;color:black ;margin-top:70px">Merchant Onboarding Application</h3>
        <hr/>

        
      <body>
    </html>`;

    return page.toString()
  }

  getImgFromUrl(logo_url, callback) {
    var img = new Image();
    img.src = logo_url;
    img.onload = function () {
      callback(img);
    };
  }

  exportToPdf(object) {
    var logo_url = "assets/images/onepay_logo.png";
    let self = this;
    this.getImgFromUrl(logo_url, function (logo) {
      self.generatePDF(logo, object);
    });

  }

  loadHeaderBox(doc, page) {
    //1st PDF page
    if (page == 1) {
      //details headers
      doc.setFontSize(8);
      doc.text(24, 74, '1.1 Name');
      doc.text(24, 91, '1.2 Address');
      doc.text(24, 108, '1.3 Registration No');
      doc.text(24, 118, '1.4 Contact Person');
      doc.text(30, 124, '1.4.1 Name');
      doc.text(119, 117, '1.4.2 Contact\rNumber');
      doc.text(28, 133, '1.4.2 Designation');
      doc.text(24, 158, '2.1 Business Type');
      doc.text(30, 164, '2.1.1 Subtype');
      doc.text(24, 173, '2.2 Business\r      Category');
      doc.text(24, 184, '2.3 Registered\r      Business Name');
      doc.text(24, 195, '2.4 Registration\r      Number');
      doc.text(24, 208, '2.5 Trading Name');
      doc.text(24, 217, '2.6 Principal place\r      of business');
      doc.text(24, 230, '2.7 Correspondence\r      Address');
      doc.text(24, 247, '2.8 Email');
      doc.text(24, 258, '2.9 Phone Number');

      //1st hedader box
      doc.setFillColor("#daf8e3");
      doc.rect(24, 55, 161, 8, 'FD'); //Fill and Border
      // 2ed header box
      doc.setFillColor("#daf8e3");
      doc.rect(24, 139, 161, 8, 'FD'); //Fill and Border

      //1st hedader box title1
      doc.setFontSize(9);
      doc.text(26, 60, '[01] Service Provider(Aggregator) Details');
      //2ed header box title2
      doc.setFontSize(9);
      doc.text(26, 144, '[02] Merchant Details');

      //body box1
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(52, 70, 133, 12, 'FD'); //Fill and Border
      //body box2
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(52, 87, 133, 12, 'FD'); //Fill and Border
      //body box3
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(52, 104, 65, 6, 'FD'); //Fill and Border
      //body box3
      //sub box3-1
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(52, 115, 65, 12, 'FD'); //Fill and Border
      //sub box3-2
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(137, 115, 48, 6, 'FD'); //Fill and Border
      //sub box3-3
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(52, 130, 65, 6, 'FD'); //Fill and Border
      //phone number(sub box3-2)   
      doc.setLineWidth(0.1);

      doc.line(141, 121, 141, 115); // vertical line
      doc.line(145, 121, 145, 115); // vertical line
      doc.line(149, 121, 149, 115); // vertical line
      doc.line(153, 121, 153, 115); // vertical line
      doc.line(157, 121, 157, 115); // vertical line
      doc.line(161, 121, 161, 115); // vertical line
      doc.line(165, 121, 165, 115); // vertical line
      doc.line(169, 121, 169, 115); // vertical line
      doc.line(173, 121, 173, 115); // vertical line
      doc.line(177, 121, 177, 115); // vertical line
      doc.line(181, 121, 181, 115); // vertical line

      //body box4 
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(52, 154, 133, 6, 'FD'); //Fill and Border

      //body box4.1 subtype
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(52, 160, 133, 6, 'FD'); //Fill and Border

      //body box5
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(52, 171, 65, 6, 'FD'); //Fill and Border

      //body box6 
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(52, 182, 133, 6, 'FD'); //Fill and Border

      //body box7 
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(52, 193, 65, 6, 'FD'); //Fill and Border

      //body box8 
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(52, 204, 133, 6, 'FD'); //Fill and Border

      //body box9 
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(52, 215, 133, 6, 'FD'); //Fill and Border

      //body box10
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(52, 226, 133, 12, 'FD'); //Fill and Border 

      //body box11 
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(52, 243, 133, 6, 'FD'); //Fill and Border

      //sub phone number
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(52, 254, 48, 6, 'FD'); //Fill and Border

      //sub phone box
      doc.line(56, 254, 56, 260); // vertical line
      doc.line(60, 254, 60, 260); // vertical line
      doc.line(64, 254, 64, 260); // vertical line
      doc.line(68, 254, 68, 260); // vertical line
      doc.line(72, 254, 72, 260); // vertical line
      doc.line(76, 254, 76, 260); // vertical line
      doc.line(80, 254, 80, 260); // vertical line
      doc.line(84, 254, 84, 260); // vertical line
      doc.line(88, 254, 88, 260); // vertical line
      doc.line(92, 254, 92, 260); // vertical line
      doc.line(96, 254, 96, 260); // vertical line
    }

    //2ed PDF page 
    if (page == 2) {
      //header box1
      // doc.setFillColor("#daf8e3");
      // doc.rect(24, 47, 161, 8, 'FD'); 

      //header title1
      doc.setFontSize(8);
      doc.text(24, 49, '2.10 Proprietor / Partner / Director Details');
      //table director Details
      doc.setFillColor("#dddddd");
      doc.rect(24, 54, 161, 8, 'FD'); //table header

      //header title2
      doc.setFontSize(8);
      doc.text(24, 152, '2.11 Ultimate Beneficial Ownership declaration');
      //table director Details
      doc.setFillColor("#dddddd");
      doc.rect(24, 157, 161, 8, 'FD'); //table header

      //director table start/////////////////////////////
      //table title
      doc.setFontSize(8);
      doc.text(25, 59, 'Name & NIC Number');//COL 1
      doc.text(110, 59, 'Address');//COL 2
      doc.text(178, 59, 'PEP');//COL 3

      //01st column start
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(24, 65, 80, 16, 'FD'); //Fill and Border
      doc.rect(24, 86, 80, 16, 'FD'); //Fill and Border
      doc.rect(24, 107, 80, 16, 'FD'); //Fill and Border
      doc.rect(24, 128, 80, 16, 'FD'); //Fill and Border
      // doc.rect(24, 149, 80, 16, 'FD'); //Fill and Border

      //01st column end

      //02ed column start
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(109, 65, 64, 16, 'FD'); //Fill and Border
      doc.rect(109, 86, 64, 16, 'FD'); //Fill and Border
      doc.rect(109, 107, 64, 16, 'FD'); //Fill and Border
      doc.rect(109, 128, 64, 16, 'FD'); //Fill and Border
      // doc.rect(109, 149, 64, 16, 'FD'); //Fill and Border
      //2ed column end

      //03ed column start
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(177, 65, 8, 6, 'FD'); //Fill and Border
      doc.rect(177, 86, 8, 6, 'FD'); //Fill and Border
      doc.rect(177, 107, 8, 6, 'FD'); //Fill and Border
      doc.rect(177, 128, 8, 6, 'FD'); //Fill and Border
      // doc.rect(177, 149, 8, 6, 'FD'); //Fill and Border
      //3ed column end

      doc.setLineWidth(0.1);
      doc.line(24, 75, 104, 75); // head-horizontal line
      doc.line(24, 96, 104, 96); // head-horizontal line
      doc.line(24, 117, 104, 117); // head-horizontal line
      doc.line(24, 138, 104, 138); // head-horizontal line
      // doc.line(24, 159, 104, 159); // head-horizontal line

      //director table end/////////////////////////////

      //sharehoder table start/////////////////////////
      //table title
      doc.setFontSize(8);
      doc.text(25, 162, 'Name of shareholder');//COL 1
      doc.text(102, 162, 'Address');//COL 2
      doc.text(166, 162, 'PoS');//COL 3
      doc.text(178, 162, 'PEP');//COL 4

      //01st column start
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(24, 168, 70, 14, 'FD'); //Fill and Border
      doc.rect(24, 188, 70, 14, 'FD'); //Fill and Border
      doc.rect(24, 207, 70, 14, 'FD'); //Fill and Border
      doc.rect(24, 226, 70, 14, 'FD'); //Fill and Border
      doc.rect(24, 245, 70, 14, 'FD'); //Fill and Border
      //01st column end

      //02ed column start
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(101, 168, 60, 14, 'FD'); //Fill and Border
      doc.rect(101, 188, 60, 14, 'FD'); //Fill and Border
      doc.rect(101, 207, 60, 14, 'FD'); //Fill and Border
      doc.rect(101, 226, 60, 14, 'FD'); //Fill and Border
      doc.rect(101, 245, 60, 14, 'FD'); //Fill and Border
      //2ed column end

      //03ed column start
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(165, 168, 8, 6, 'FD'); //Fill and Border
      doc.rect(165, 188, 8, 6, 'FD'); //Fill and Border
      doc.rect(165, 207, 8, 6, 'FD'); //Fill and Border
      doc.rect(165, 226, 8, 6, 'FD'); //Fill and Border
      doc.rect(165, 245, 8, 6, 'FD'); //Fill and Border
      //3ed column end
      //04th column start
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(177, 168, 8, 6, 'FD'); //Fill and Border
      doc.rect(177, 188, 8, 6, 'FD'); //Fill and Border
      doc.rect(177, 207, 8, 6, 'FD'); //Fill and Border
      doc.rect(177, 226, 8, 6, 'FD'); //Fill and Border
      doc.rect(177, 245, 8, 6, 'FD'); //Fill and Border
      //04th column end
      //sharehoder table end/////////////////////////////

      // introduction
      doc.setFontSize(7);
      doc.text(24, 270, 'PEP-Politically Exposed Persons');
      doc.text(65, 270, 'PoS-Percentage of shareholding');
    }


    //3th PDF page
    if (page == 3) {
      //title Merchant Signature		
      doc.setFontSize(9);
      doc.text(24, 174, '[03] Merchant Signature');
      //title Aggregator Signature
      doc.setFontSize(9);
      doc.text(24, 198, '[04] Aggregator Signature');


      //details headers
      doc.setFontSize(8);
      doc.text(24, 49, '2.12 Nature of\r       Business');
      doc.text(24, 65, '2.13 Income Tax\r       File No');
      doc.text(120, 67, '2.14 Date of Registration');
      doc.text(24, 76, '2.15 Settlement Account Details');
      doc.text(30, 83, '2.15.1 Account\rHolders Name');
      doc.text(120, 83, '2.15.2 Account\rNumber');
      doc.text(30, 103, '2.15.3 Bank');
      doc.text(30, 113, '2.15.4 Branch');
      doc.text(24, 124, '2.16 Payment Terms');
      doc.text(30, 131, '2.17.1 Commission Rate');
      doc.text(30, 137, '2.17.1.1 Visa/Master');
      doc.text(90, 137, '2.17.1.2 JustPay');
      doc.text(140, 137, '2.17.1.3 LankaQR');
      doc.text(24, 146, '2.18 Merchant\r       Agreement Date');


      //body box1
      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(52, 46, 133, 12, 'FD'); //Fill and Border
      doc.rect(52, 63, 60, 6, 'FD'); //Fill and Border
      doc.rect(153, 63, 32, 6, 'FD'); //Fill and Border
      //date
      doc.line(153, 63, 153, 69); // vertical line
      doc.line(157, 63, 157, 69); // vertical line
      doc.line(161, 63, 161, 69); // vertical line
      doc.line(165, 63, 165, 69); // vertical line
      doc.line(169, 63, 169, 69); // vertical line
      doc.line(173, 63, 173, 69); // vertical line
      doc.line(177, 63, 177, 69); // vertical line
      doc.line(181, 63, 181, 69); // vertical line

      //Settlement Account Details box
      doc.rect(52, 80, 60, 14, 'FD'); //account holder name
      doc.rect(141, 80, 44, 6, 'FD'); //income tax
      doc.rect(52, 99, 70, 6, 'FD'); //bank
      doc.rect(52, 110, 70, 6, 'FD'); //branch
      //Payment Terms box
      doc.rect(62, 133, 10, 6, 'FD'); //visa
      doc.rect(120, 133, 10, 6, 'FD'); //just pay
      doc.rect(176, 133, 10, 6, 'FD'); //lanka qr

      doc.rect(52, 144, 32, 6, 'FD'); //merchnat register date
      //date
      doc.line(56, 144, 56, 150); // vertical line
      doc.line(60, 144, 60, 150); // vertical line
      doc.line(64, 144, 64, 150); // vertical line
      doc.line(68, 144, 68, 150); // vertical line
      doc.line(72, 144, 72, 150); // vertical line
      doc.line(76, 144, 76, 150); // vertical line
      doc.line(80, 144, 80, 150); // vertical line
      doc.line(84, 144, 84, 150); // vertical line

      doc.setFontSize(9);
      doc.text(24, 162, 'By placing your signature below,you here by confirm that you agree to the terms and conditions as specified by the\rcompany');

      doc.setFillColor(0, 0, 0, 0.1);
      doc.rect(52, 177, 65, 12, 'FD'); //Merchant Signature		
      doc.rect(52, 201, 65, 12, 'FD'); //Aggregator Signature		

      // doc.text(28, 197, 'Merchant');
      // doc.text(28, 202, 'I agree to above terms and conditions');
      // doc.text(28, 212, 'Signature :');
      // doc.text(28, 218, 'Name :');
      // doc.text(28, 224, 'Date :');

      // doc.text(28, 232, 'Authorized Official');

      // doc.text(28, 242, 'Signature : ..............................');
      // doc.text(28, 248, 'Name : M.A. Amila Nuwan Fernando');
      // doc.text(28, 254, 'Designation : Director/CEO');
      // doc.text(28, 260, 'Date :');

      // doc.text(115, 242, 'Signature : .............................');
      // doc.text(115, 248, 'Name : W.S. Godfrey Vas');
      // doc.text(115, 254, 'Designation : CFO');
      // doc.text(115, 260, 'Date :');

    }
  }

  loadCanvas(page_no, doc) {
    if (page_no == 2) {

    }

    if (page_no == 3) {

    }

    if (page_no == 4) {

    }

  }

  loadSentence(doc, page, x, y, sentence, width) {
    if (sentence) {
      sentence = sentence.toString()
      let current_y = y
      let current_sentence = ""
      let splitted = sentence.split(/\s+/);

      doc.setPage(page)
      doc.setFillColor(0, 0, 0, 0.1);
      doc.setFontSize(7);
      doc.setFontType('normal');

      for (let a = 0; a < splitted.length; a++) {
        current_sentence = current_sentence + ' ' + splitted[a]

        if (doc.getTextDimensions(current_sentence).w > width) {
          doc.text(current_sentence, x, current_y)
          current_sentence = ""
          current_y = current_y + 4
        }
      }

      doc.text(current_sentence, x, current_y)
    }

  }

  loadBoxSentence(doc, page, x, y, sentence, line_space) {
    let current_x = x

    doc.setPage(page)
    doc.setFillColor(0, 0, 0, 0.1);
    doc.setFontSize(7);
    doc.setFontType('normal');

    for (let a = 0; a < sentence.length; a++) {
      doc.text(sentence.charAt(a), current_x, y)
      current_x += line_space;
    }
  }


  //first page data
  loadData(doc, object) {
    //PAGE 1
    this.loadSentence(doc, 1, 54, 75, object.service_provider_name.toUpperCase(), 100)
    this.loadSentence(doc, 1, 54, 92, object.service_provider_address.toUpperCase(), 100)
    this.loadSentence(doc, 1, 54, 108, object.service_provider_registration_no.toUpperCase(), 40)
    //Contact Person
    this.loadSentence(doc, 1, 54, 120, object.contact_person_name.toUpperCase(), 45)
    this.loadBoxSentence(doc, 1, 138, 119, object.contact_person_Number, 4)
    this.loadSentence(doc, 1, 54, 134, object.contact_person_designation.toUpperCase(), 45)

    //Merchant Details
    this.loadSentence(doc, 1, 54, 158, object.b_type_name.toUpperCase(), 100)



    console.log(object, 'set subrtytrur')
    // let subtype_y = 54
    // let subtype_t = ','
    // if (object && object.hasOwnProperty('sub_type_list') && object.sub_type_list.length) {
    //   for (let s = 0; s < object.sub_type_list.length; s++) {
    //     this.loadSentence(doc, 1, subtype_y, 164, object.sub_type_list[s].subtype_id__subtype.toUpperCase(), 100)
    //     if (object.sub_type_list[s].subtype_id__subtype.length) {
    //       subtype_y += object.sub_type_list[s].subtype_id__subtype.length + 8
    //       this.loadSentence(doc, 1, subtype_y - 1, 164, subtype_t, 150)
    //     }
    //   }
    // }
    let subtype_y = 54
    let subtype_t = ','
    for (let s = 0; s < object.sub_type_list.length; s++) {
      // subtype name 
      this.loadSentence(doc, 1, subtype_y, 164, object.sub_type_list[s].subtype_id__subtype.toUpperCase(), 100)
      subtype_y += object.sub_type_list[s].subtype_id__subtype.length +8
      this.loadSentence(doc, 1, subtype_y-1 , 164, subtype_t, 150)
    }
    this.loadSentence(doc, 1, 54, 175, object.b_cat_name.toUpperCase(), 45)
    this.loadSentence(doc, 1, 54, 186, object.registered_business_name.toUpperCase(), 100)
    this.loadSentence(doc, 1, 54, 197, object.register_number.toUpperCase(), 45)
    this.loadSentence(doc, 1, 54, 208, object.tranding_name.toUpperCase(), 100)
    this.loadSentence(doc, 1, 54, 219, object.principal_place.toUpperCase(), 100)
    this.loadSentence(doc, 1, 54, 231, object.correspondence_address.toUpperCase(), 100)
    this.loadSentence(doc, 1, 54, 247, object.email, 100)
    this.loadBoxSentence(doc, 1, 53, 258, object.phone_number, 4)


    //2ed page

    // director details
    let director_name_y = 69
    let director_nic_y = 79
    let director_address_y = 69
    let director_pep_y = 69
    for (let x = 0; x < object.director.length; x++) {
      // name
      this.loadSentence(doc, 2, 25, director_name_y, object.director[x].name.toUpperCase(), 55)
      // nic
      this.loadSentence(doc, 2, 25, director_nic_y, object.director[x].nic, 55)
      // // address
      this.loadSentence(doc, 2, 110, director_address_y, object.director[x].address.toUpperCase(), 50)
      // pep
      this.loadSentence(doc, 2, 178, director_address_y, object.director[x].director_pep ? 'YES' : 'NO', 20)

      director_name_y += 21
      director_nic_y += 21
      director_address_y += 21
      director_pep_y += 21
    }
    // shareholder details
    let shareholder_name_y = 172
    let shareholder_address_y = 172
    let shareholder_pos_y = 172
    let shareholder_pep_y = 172
    for (let p = 0; p < object.shareholder.length; p++) {
      // name
      this.loadSentence(doc, 2, 25, shareholder_name_y, object.shareholder[p].name_shareholder.toUpperCase(), 45)
      // nic
      this.loadSentence(doc, 2, 102, shareholder_address_y, object.shareholder[p].address_shareholder.toUpperCase(), 40)
      //presentage shareholder
      this.loadSentence(doc, 2, 167, shareholder_pos_y, object.shareholder[p].percentage_shareholder.toString() + "%", 20)
      // pep
      this.loadSentence(doc, 2, 177, shareholder_pep_y, object.shareholder[p].shareholder_pep ? 'YES' : 'NO', 20)

      shareholder_name_y += 20
      shareholder_address_y += 20
      shareholder_pos_y += 20
      shareholder_pep_y += 20
    }

    //3ed page

    this.loadSentence(doc, 3, 54, 51, object.nature_of_business.toUpperCase(), 100)
    this.loadSentence(doc, 3, 54, 67, object.income_tax, 100)
    // this.loadSentence(doc, 3, 54, 84, object.date_of_registration, 30)
    this.loadBoxSentence(doc, 3, 154, 67, this.datepipe.transform(object.date_of_registration, 'yyyyMMdd'), 4)
    this.loadSentence(doc, 3, 54, 84, object.account_holder_name.toUpperCase(), 100)
    this.loadSentence(doc, 3, 142, 84, object.account_number, 100)
    this.loadSentence(doc, 3, 54, 103, object.bank_name.toUpperCase(), 100)
    this.loadSentence(doc, 3, 54, 114, object.branch.toUpperCase(), 100)
    this.loadSentence(doc, 3, 64, 137, object.commission_rate_visa.toString() + "%", 30)
    this.loadSentence(doc, 3, 123, 137, object.commission_rate_just_pay.toString() + "%", 30)
    this.loadSentence(doc, 3, 178, 137, object.commission_rate_lanka_qr.toString() + "%", 30)
    this.loadBoxSentence(doc, 3, 53, 148, this.datepipe.transform(object.merchant_agreement_date, 'yyyyMMdd'), 4)



  }


}


