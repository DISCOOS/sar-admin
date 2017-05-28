import { Component, Input, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mission, Alarm } from '../models/models';
import { ToastComponent, ToastService } from '../blocks/blocks';
import { SARService } from '../services/sar.service';
import { PeopleListComponent } from '../people/people-list.component';
import { MapComponent } from '../map/map.component';
import { SARUser } from '../models/models';
import { CONFIG } from '../shared/config';

declare var flatpickr: any;
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
    //@Inject(FLATPICKR_TOKEN) private flatpickr
  ) {


  }

  ngOnInit() {
    // Recreate component if we're allready in mission-single
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.mission = this._createEmptyMission();
    this.alarm = this._createEmptyAlarm();

  }

  // Initialize flatpickr after DOM-content is loaded
  ngAfterViewInit() {
    new flatpickr('.flatpickr', CONFIG.flatpickr)
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

    // Add new mission. We pass in alarm and list of people as well
    this.SARService.addMission(mission, this.alarm, this.peopleList.selectedPeople)
      .subscribe(miss => {
        // Route back to mission-list.
        this.toastService.activate(`Alt OK! Opprettet aksjon: "${this.mission.title}"`, true, true);
      },
      () => { this.toastService.activate(`Det skjedde en feil under opprettelse av aksjonen`, false, false); },
      () => { this.toastService.activate(`Alt OK! Opprettet aksjon: "${this.mission.title}"`, true, true); this.gotoMissions(); }
      );

  }

  private _createEmptyAlarm() {
    //       let alarms = [];
    let alarm = new Alarm(
      null, //id
      new Date(), // date
      '', // message
      this.mission
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
      null, // dateEnd
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