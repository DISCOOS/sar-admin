
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


  /**
   * Checks params to see if we're in "add" or "edit"-mode
   */
  isAddMode() {

    let id = +this.route.snapshot.paramMap.get('id');
    return isNaN(id);
  }

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
    if (this.isAddMode()) {
     
      
      this.mission = this._createEmptyMission();
      
      
      return;
    }
    // Edit mode, fetch mission from service
    this.id = +this.route.snapshot.paramMap.get('id');
    //this.setEditMission(new Mission(1, "Navnet på en aksjon"))

    this.setEditMission(this._createEmptyMission())
    // this.missionService.getMission(this.id)
    //    .subscribe(mission => this.setEditMission(mission));
  }


  /**
   * Routes back to mission-list
   */
  private gotoMissions() {
    let route = ['/missions'];
    this.router.navigate(route);
  }


  /**
   * Set this mission, else go to list-screen
   * @param mission 
   */
  private setEditMission(mission: Mission) {
    if (mission) {
      this.mission = mission;

    } else {
      this.gotoMissions();
    }
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
          this.setEditMission(miss);
          // Route back to mission-list.
          this.toastService.activate(`Opprettet aksjon: "${this.mission.title}"`, true, true);
          this.gotoMissions();
        });

      return;

      

    }



    // .. Or update exisiting
     this.missionService.updateMission(mission)
       .subscribe(() => {
         console.log("updated")
         // Route back to mission-list.
         this.gotoMissions();
       });
 

    this.gotoMissions();

  }

  /**
   * Event-bind from DOM-button
   * Deletes an mission.
   */
  delete() {
    /*
    this.modal.close();
    this.missionService.deleteMission(this.mission.ID)
      .subscribe(() => {
        this.gotoMissions();
      });
*/
    this.gotoMissions();
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