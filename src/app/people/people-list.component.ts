import { ViewChild, Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { SARUser } from '../models/models';
import { FilterService, FilterTextComponent } from '../blocks/blocks';
import { SARService } from '../services/sar.service';
/**
 * 
 * Component for handling list of people
 * 
 */


@Component({
	moduleId: module.id,
	selector: 'people',
	templateUrl: 'people-list.component.html',
	providers: [FilterService],
})
export class PeopleListComponent implements OnInit {
	name: string;
	errorMsg: string;
	isLoading: boolean;
	people: SARUser[];
	filteredPeople = this.people;
	@ViewChild(FilterTextComponent) filterComponent: FilterTextComponent;


	constructor(private SARService: SARService,
		private filterService: FilterService) {
		this.people = [];
		this.filteredPeople = this.people;
		//this.isLoading = true;

	}


	filterChanged(searchText: string) {
		console.log("filter hangd");
		
		this.filteredPeople = this.filterService.filter(searchText, ["Name", "Email"], this.people)

		console.log(this.filteredPeople);
		
	}

	/**
	 *
	 */
	getPeople() {

		this.isLoading = true;


		this.SARService.getPeople()
			.subscribe(
			(people) => {
				this.people = this.filteredPeople = people;
				console.log(this.people);

				this.filterComponent.clear();
			},
			() => this.stopRefreshing(),
			() => this.stopRefreshing());


	}


	private stopRefreshing() {
		this.isLoading = false;
	}
	ngOnInit() {


		this.getPeople();

	}
}