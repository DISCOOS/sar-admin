import { ViewChild, Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { Mission } from '../models/models';
import { FilterService, FilterTextComponent } from '../blocks/blocks';
import { SARService } from '../services/sar.service';
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
	isLoading: boolean;
	missions: Mission[];
	filteredMissions = this.missions;
	@ViewChild(FilterTextComponent) filterComponent: FilterTextComponent;
	//missions : Array<Mission>;

	constructor(private SARService: SARService,
		private filterService: FilterService) {
		this.missions = [];
		// this.missions.push(new Mission(1,"Lipsum", true))
		// this.missions.push(new Mission(2,"Dipsum", false))
		// this.missions.push(new Mission(2,"Missionsum",false))
		// this.missions.push(new Mission(2,"Testerum", true))

		this.filteredMissions = this.missions;
		//this.isLoading = true;

	}


	filterChanged(searchText: string) {
		this.filteredMissions = this.filterService.filter(searchText, this.missions)
	}

	/**
	 *
	 */
	getMissions() {

		this.isLoading = true;
		

		this.SARService.getMissions()
			.subscribe(
			(missions) => {
				this.missions = this.filteredMissions = missions;
				this.filterComponent.clear();
			},
			() => this.stopRefreshing(),
			() => this.stopRefreshing());


	}

	
	private stopRefreshing() {
		this.isLoading = false;
	}
	ngOnInit() {

		
		this.getMissions();

	}
}