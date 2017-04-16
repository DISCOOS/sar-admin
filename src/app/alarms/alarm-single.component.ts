
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alarm } from './alarm';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ToastComponent, ToastService } from '../blocks/blocks';

/**
 * Component for handling a single alarm
 * 
 */
@Component({
  moduleId: module.id,
  selector: 'alarm-single',
  templateUrl: 'alarm-single.component.html'
})
export class AlarmSingleComponent implements OnInit {

  @Input() alarm: Alarm;

  editAlarm: Alarm = <Alarm>{};

  private id: any;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService

  ) { }


  /**
   * Checks params to see if we're in "add" or "edit"-mode
   */
  isAddMode() {

    let id = +this.route.snapshot.paramMap.get('id');
    return isNaN(id);
  }

  ngOnInit() {
    // Recreate component if we're allready in alarm-single
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getAlarm();
    });
  }

  /**
   * 
   */
  private getAlarm() {
    if (this.isAddMode()) {
      this.alarm = this._createEmptyAlarm();
      return;
    }
    // Edit mode, fetch alarm from service
    this.id = +this.route.snapshot.paramMap.get('id');
    this.setEditAlarm(new Alarm(1, "Navnet på en alarm"))
   // this.alarmService.getAlarm(this.id)
    //    .subscribe(alarm => this.setEditAlarm(alarm));
  }


  /**
   * Routes back to alarm-list
   */
  private gotoAlarms() {
    let route = ['/alarms'];
    this.router.navigate(route);
  }


  /**
   * Set this alarm, else go to list-screen
   * @param alarm 
   */
  private setEditAlarm(alarm: Alarm) {
    if (alarm) {
      this.alarm = alarm;

    } else {
      this.gotoAlarms();
    }
  }

  /**
   * Event-bind from DOM-button
   * Cancels changes and sends back to alarm-list
   */
  cancel() {
     
    this.toastService.activate('Ingen endringer ble lagret', false);
    this.gotoAlarms();
  }


  /**
   * Event-bind from DOM-button
   * Save new or update exisiting alarm
   */
  save() {
    let alarm = this.alarm


    // Add new alarm
    if (alarm.ID == null) {
     /* this.alarmService.addAlarm(alarm)
        .subscribe(con => {
          this.setEditAlarm(con);
          // Route back to alarm-list.
          this.gotoAlarms();
        });

      return;
      */
    }

    // .. Or update exisiting
   /* this.alarmService.updateAlarm(alarm)
      .subscribe(() => {
        console.log("updated")
        // Route back to alarm-list.
        this.gotoAlarms();
      });
*/
      this.toastService.activate(`Opprettet aksjon: "${this.alarm.name}"`, true);
      this.gotoAlarms();

  }

  /**
   * Event-bind from DOM-button
   * Deletes an alarm.
   */
  delete() {
    /*
    this.modal.close();
    this.alarmService.deleteAlarm(this.alarm.ID)
      .subscribe(() => {
        this.gotoAlarms();
      });
*/
      this.gotoAlarms();
  }


  private _createEmptyAlarm() {
      return new Alarm(null,'')
  }

}