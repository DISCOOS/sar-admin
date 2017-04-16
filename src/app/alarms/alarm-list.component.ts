import { ViewChild, Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { Alarm } from './alarm';
import { FilterService, FilterTextComponent } from '../blocks/blocks';
import { SARService } from './sar.service';
/**
 * 
 * Component for handling list of alarms
 * 
 */


@Component({
	moduleId: module.id,
	selector: 'alarms',
	templateUrl: 'alarm-list.component.html',
	providers: [FilterService],
})
export class AlarmListComponent implements OnInit {
	name: string;
	errorMsg: string;
	isLoading: boolean;
	alarms: Alarm[];
	filteredAlarms = this.alarms;
	@ViewChild(FilterTextComponent) filterComponent: FilterTextComponent;
	//alarms : Array<Alarm>;

	constructor(private sarService: SARService,
		private filterService: FilterService) {
		this.alarms = [];
		this.alarms.push(new Alarm(1,"Lipsum"))
		this.alarms.push(new Alarm(2,"Dipsum"))
		this.alarms.push(new Alarm(2,"Alarmsum"))
		this.alarms.push(new Alarm(2,"Testerum"))

		this.filteredAlarms = this.alarms;
		//this.isLoading = true;

	}


	filterChanged(searchText: string) {
		this.filteredAlarms = this.filterService.filter(searchText, this.alarms)
	}

	/**
	 *
	 */
	getAlarms() {

		this.isLoading = true;
		
/*
		this.alarmService.getAlarms(limit)
			.subscribe(
			(alarms) => {
				this.alarms = this.filteredAlarms = alarms;
				this.filterComponent.clear();
			},
			() => this.stopRefreshing(),
			() => this.stopRefreshing());
*/

	}

	
	private stopRefreshing() {
		this.isLoading = false;
	}
	ngOnInit() {

		
		//this.getAlarms();

	}
}