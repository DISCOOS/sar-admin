import { ViewChild, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Mission } from '../models/models';
import { FilterService, FilterTextComponent } from '../blocks/blocks';
import { SARService } from '../services/sar.service';
import { UserService } from '../services/user.service';

/**
 * 
 * Component for handling list of missions
 * 
 */


@Component({
	moduleId: module.id,
	selector: 'missions',
	templateUrl: 'mission-list.component.html',
	providers: [FilterService],
})
export class MissionListComponent implements OnInit {
	name: string;
	errorMsg: string;


	missions: Mission[];
	//missions : Observable<Mission[]>;
	filteredMissions = this.missions;
	@ViewChild(FilterTextComponent) filterComponent: FilterTextComponent;

	@Input() filterWhichMissions: any;
	@Output() filterWhichMissionsChanged = new EventEmitter();

	constructor(
		private SARService: SARService,
		private filterService: FilterService,
		private userService: UserService
	) {
		this.filteredMissions = this.missions;
	}

	ngOnInit() {
		this.getMissions();
		this.filterWhichMissions = 'all';
	}

	changefilterWhichMissions(val) {
		this.filterWhichMissions = val;
		let status = (val == 'active') ? true : (val == 'ended') ? false : undefined;
		this.filteredMissions = this.filterService.filterMissionStatus(status, this.missions);
	}


	filterChanged(searchText: string) {
		this.filteredMissions = this.filterService.filter(searchText, ["title", "description", "meetingPointNicename"], this.missions)
	}


	getMissions() {
		this.SARService.getMissions()
			.subscribe(
			(missions) => {
				this.missions = this.filteredMissions = missions;
				this.filterComponent.clear();

			},
			(err) => { console.log("Failed getting missions" + err) },
			() => { console.log("Ok,Got missions" ) });


		//this.missions = this.SARService.getMissions();
	}

}