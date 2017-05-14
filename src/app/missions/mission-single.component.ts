
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mission, Alarm } from '../models/models';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ToastComponent, ToastService } from '../blocks/blocks';
import { SARService } from '../services/sar.service';
import { PeopleListComponent } from '../people/people-list.component';
import { MapComponent } from '../map/map.component';
import { SARUser } from '../models/models';

/**
 * Component for handling a single mission
 * 
 */
@Component({
  moduleId: module.id,
  selector: 'mission-single',
  templateUrl: 'mission-single.component.html'
})
export class MissionSingleComponent implements OnInit {

  @Input() mission: Mission = <Mission>{};
  @Input() alarm: Alarm = <Alarm>{};
  @ViewChild(PeopleListComponent) peopleList: PeopleListComponent;
  @ViewChild(MapComponent) mapPicker: MapComponent;


  private id: any;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private SARService: SARService
  ) { }

  ngOnInit() {
    // Recreate component if we're allready in mission-single
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];


    });

    this.mission = this._createEmptyMission();
    this.alarm = this._createEmptyAlarm();
  }






  /**
   * Routes back to mission-list
   */
  private gotoMissions() {
    let route = ['/missions'];
    this.router.navigate(route);
  }


  /**
   * Event-bind from DOM-button
   * Cancels changes and sends back to mission-list
   */
  cancel() {

    this.toastService.activate('Ingen endringer ble lagret', false, true);
    this.gotoMissions();
  }


  /**
   * Event-bind from DOM-button
   * Save new or update exisiting mission
   */
  save() {
    let mission = this.mission
    mission.isActive = true;



    // Add new mission

    console.log("-----------mission-----------")

    // first add mission
    this.SARService.addMission(mission)
      .subscribe(miss => {
        this.mission = miss;
        mission = miss;

        // Route back to mission-list.
        this.toastService.activate(`Opprettet aksjon: "${mission.title}"`, true, true);
        //this.gotoMissions();
      });


    // This should be a promise; add new alarm when mission is added (200)
    setTimeout(() => {

      this.SARService.addAlarm(this.alarm, mission.id)
        .subscribe(al => {
          this.alarm = al;
          this.toastService.activate(`Opprettet ny varsling for aksjonen`, true, true);
          //this.gotoMissions();
        });
    }, 3000);


    setTimeout(() => {



      // POST an array of selected people to alarm.
      this.SARService.addAlarmUsers(this.alarm.id, this.peopleList.selectedPeople)
        .subscribe(al => {
          //this.alarm = al;
          this.toastService.activate(`Sendte ut varsling`, true, true);
          this.gotoMissions();
        });

    }, 4000);



  }

  private _createEmptyAlarm() {
    //       let alarms = [];
    let alarm = new Alarm(
      null, //id
      new Date(), // date
      '', // message
      this.mission, // mission
      null//persons
    )
    return alarm
  }

  private _createEmptyMission() {
    console.log("create empty mission");

    let user = JSON.parse(localStorage.getItem('currentUser'))


    let miss = new Mission(
      null, // id
      true,  // isActive 
      null, // isEmergency
      '', // title
      '', // desc 
      new Date(), // datestart
      new Date(), // dateEnd
      null, // Alarms[]
      '', // meetingPoint
      '', // meetingPointNicename
      user.id, // creator
      null, // Expence[],
      null
    );



    return miss

  }

}