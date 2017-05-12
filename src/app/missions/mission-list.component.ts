import { ViewChild, Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { Mission } from '../models/models';
import { FilterService, FilterTextComponent } from '../blocks/blocks';
import { SARService } from '../services/sar.service';
import { UserService} from '../services/user.service';

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
	//missions : Observable<Mission[]>;
	filteredMissions = this.missions;
	@ViewChild(FilterTextComponent) filterComponent: FilterTextComponent;


	constructor(
		private SARService: SARService,
		private filterService: FilterService,
		private userService : UserService
		) {
		//
		this.filteredMissions = this.missions;
		//this.isLoading = true;
	}


	filterChanged(searchText: string) {
		this.filteredMissions = this.filterService.filter(searchText, ["title", "description", "meetingPointNicename"], this.missions)
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


		//this.missions = this.SARService.getMissions();



	}





	private stopRefreshing() {
		this.isLoading = false;
	}

	ngOnInit() {
		this.getMissions();
	}
}