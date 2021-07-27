import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { NbDialogService } from '@nebular/theme';
import { DashboardService } from '../../../@core/services/dashboard.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrComponent } from '../../../@theme/components';
import * as moment from 'moment';

@Component({
  selector: 'ngx-calander',
  templateUrl: './calander.component.html',
  styleUrls: ['./calander.component.scss']
})
export class CalanderComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];

  calendarEvents: EventInput[] = [];
  is_calender = false
  is_calender_events = false
  is_loading = false

  cheque_details = []
  formatted_data = []
  userMessage
  selected_cheque: any
  eventFormUpdate: FormGroup;
  addEventForm: FormGroup;
  deleteEventForm: FormGroup;
  addEvent_modle
  eventDelete_model
  eventView_modle
  updateEvent_model
  chequeView_model

  selected_event_data: any
  selected_event_id:any

  constructor(
    private dialogService: NbDialogService,
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrComponent

  ) {
    this.addEventForm = this.fb.group({
      event_name: [''],
      description: [''],
      start_date: [''],
      end_date: ['', Validators.required],
      color: [''],

    });

    this.eventFormUpdate = this.fb.group({
      id: [''],
      event_name: [''],
      description: [''],
      start_date: [''],
      end_date: ['', Validators.required]

    });
    this.deleteEventForm = this.fb.group({
      id: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.getChequeDetail();
    this.getEventDetail()
  }
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }
  // date click and cheque details view
  // handleDateClick(dialogDateView: TemplateRef<any>, event) {
  //   let clicked_date = event['dateStr']
  //   let is_details_available = this.cheque_details.some(cheque => cheque['matured_date'] === clicked_date)
  //   if (is_details_available) {
  //     this.selected_cheque = this.cheque_details.filter(cheque => cheque['matured_date'] === clicked_date)[0]
  //     this.dialogService.open(dialogDateView);
  //   }
  // }

  //matuared cheque view/////////////////////////////////////////////////////////////////////////////
  getChequeDetail() {
    this.dashboardService.calenderMaturedChequeDetails().then(res => {
      this.is_loading = true
      console.log('cheque details', res['data'])
      if (res['success']) {
        this.is_loading = false

        for (let a = 0; a < res['data'].length; a++) {
          let formatted_data = res['data'][a]
          formatted_data['matured_date'] = (res['data'][a]['matured_date']).split("T")[0]
          this.cheque_details.push(formatted_data)

          this.calendarEvents.push({
            title: 'Matuared Cheque',
            start: formatted_data['matured_date'],
            allDay: true,
            editable: false,
            backgroundColor: 'red',
            borderColor: 'red',
            cursor: 'pointer',
            isCheque: true,
            ...formatted_data
          })
        }
        this.is_calender = true
        console.log('ddd', this.calendarEvents)
        this.is_loading = false
      }
      else {
        this.is_calender = true
        this.userMessage = res['description']
        this.is_loading = false
      }
    })
  }

  // Matuared cheque and event view
  eventClickedMCheque(event, dialogDateView, dialogEventView) {
    let is_cheque = event.event.extendedProps['isCheque'] ? event.event.extendedProps['isCheque'] : false

    if (is_cheque) {
      this.selected_cheque = event.event.extendedProps
      console.log(this.selected_cheque)
      this.chequeView_model = this.dialogService.open(dialogDateView);
    } else {
      // add non cheque model open command here
      // console.log('yyy77747748',event.event.id)
      let extended_data = event.event.extendedProps
      this.selected_event_data = extended_data
      this.selected_event_id = event.event.id
      this.eventView_modle = this.dialogService.open(dialogEventView);

    }
  }
  //get event//////////////////////////////////////////////////////////////////////////////////////////
  getEventDetail() {
    this.dashboardService.getEventData().then(res => {
      
      this.is_loading = true
      if (res['success']) {
        this.is_loading = false

        for (let a = 0; a < res['data'].length; a++) {
          let formatted_data = res['data'][a]

          formatted_data['start_date'] = (res['data'][a]['start_date']).split("T")[0]
          formatted_data['actual_end_date'] = (res['data'][a]['end_date']).split("T")[0] 
          formatted_data['end_date'] =  moment(formatted_data['actual_end_date'] , "YYYY-MM-DD").add('days', 1).format('YYYY-MM-DD')
                 
          console.log(formatted_data)

          this.cheque_details.push(formatted_data)

          this.calendarEvents.push({
            title: 'Event - ' + formatted_data['event_name'],
            start: formatted_data['start_date'],
            end: formatted_data['end_date'],
            allDay: true,
            editable: false,
            backgroundColor: 'gray',
            borderColor: 'gray',
            cursor: 'pointer',
            isCheque: false,
            ...formatted_data
            
          })
        }
        this.is_calender_events = true
        console.log('ddd', this.calendarEvents)
        this.is_loading = false
      }
      else {
        this.is_calender_events = true
        this.userMessage = res['description']
        this.is_loading = false
      }
    })
  }

  //event add popup ////////////////////////////////////////////////////////////////////////////////////////////
  openAddEvent(dialogEvent: TemplateRef<any>) {
    this.addEvent_modle = this.dialogService.open(dialogEvent,{closeOnBackdropClick:false });
  }
  //add event
  addEventAdd() {
    let formatted_data = this.addEventForm.value
    formatted_data.start_date = this.formatDate(formatted_data.start_date)
    formatted_data.end_date = this.formatDate(formatted_data.end_date)
    console.log(formatted_data)
    this.dashboardService.addEventData(formatted_data).then(res => {
      console.log('color',this.addEventForm.value)
      this.is_loading = true
      if (res['success']) {
        this.getEventDetail()
        this.is_loading = false
        this.addEvent_modle.close()
        this.addEventForm.reset()
        this.toastr.showToast('success', 'success','Event Add Success')

      } else {
        this.is_loading = false
        console.log('error')
        this.toastr.showToast('danger', 'error', 'error')
      }
    }, 
    error => {
      console.log(error)
      this.is_loading = false
      this.toastr.showToast('danger', 'error', 'error')
    })
  }
//update event///////////////////////////////////////////////////////////////////////////////////////
  openEditEvent(dialogEventEdit: TemplateRef<any>, selected_event_data,selected_event_id) {

    setTimeout(() => {
      this.eventFormUpdate.setValue({
        id: selected_event_id,
        description: selected_event_data.description,
        event_name: selected_event_data.event_name,
        end_date: selected_event_data.end_date,
        start_date: selected_event_data.start_date,
      });
    }, 0);

    this.updateEvent_model = this.dialogService.open(dialogEventEdit,{closeOnBackdropClick:false });
  }
  updateEvent() {
    let formatted_data = this.eventFormUpdate.value
    formatted_data.start_date = this.formatDate(formatted_data.start_date)
    formatted_data.end_date = this.formatDate(formatted_data.end_date)
    // console.log('id event ffff',this.selected_event_id)

    this.dashboardService.updateEventData(formatted_data,formatted_data.id).then(res => {
      this.is_loading = true
      if (res['success']) {
        this.is_loading = false
        this.updateEvent_model.close()
        this.eventFormUpdate.reset()
        this.toastr.showToast('success', 'success','Event Updated Success')
      } else {
        this.is_loading = false
        console.log('error')
        this.toastr.showToast('danger', 'error', 'error')
      }
    }, error => {
      this.is_loading = false
      console.log(error)
      this.toastr.showToast('danger', 'error', 'error')
    })
  }


  //delete event///////////////////////////////////////////////////////////////////////////
  openDeleteEvent(dialogDeleteEvent: TemplateRef<any>) {
    this.eventDelete_model = this.dialogService.open(dialogDeleteEvent,{closeOnBackdropClick:false });
  }
  deleteEventData() {
    this.dashboardService.deleteEventData(this.selected_event_id).then(res => {
      this.is_loading = true
      console.log(res)
      if (res['success']) {
        this.is_loading = false
        this.toastr.showToast('success', 'success','Event Delete Success')
        this.eventDelete_model.close()
        this.getEventDetail()
        // this.eventView_modle.close()
        // this.chequeView_model.close()
      } else {
        this.is_loading = false
        console.log('error')
        this.toastr.showToast('danger', 'error', 'Error')
      }
    }, error => {
      this.is_loading = false
      console.log(error)
      this.toastr.showToast('danger', 'error', 'Error')
    })
  }

}
