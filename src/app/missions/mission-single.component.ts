
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mission } from '../models/models';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ToastComponent, ToastService } from '../blocks/blocks';
import { SARService } from '../services/sar.service';
import {PeopleListComponent} from '../people/people-list.component';
import { MapComponent } from '../map/map.component';

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

  @Input() mission: Mission;
  @ViewChild(PeopleListComponent) peopleList: PeopleListComponent;
  @ViewChild(MapComponent) mapPicker: MapComponent;
  
  editMission: Mission = <Mission>{};

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
      this.getMission();
    });
  }

  /**
   * 
   */
  private getMission() {
      this.mission = this._createEmptyMission();
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
    if (mission.id == null) {
      this.SARService.addMission(mission)
        .subscribe(miss => {
          this.mission = miss;
          // Route back to mission-list.
          this.toastService.activate(`Opprettet aksjon: "${mission.title}"`, true, true);
          this.gotoMissions();
        });

      return;
    }
  }

  private _createEmptyMission() {
    console.log("create empty mission");
    
    return new Mission(
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
      null, // SarAdmin
      null // Expence[]
    );

  }

}