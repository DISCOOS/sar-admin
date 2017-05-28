import { ViewChild, Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
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
	//@Input() 
	people: SARUser[];
	filteredPeople = this.people;
	//selectedPeople: SARUser[];
	@ViewChild(FilterTextComponent) filterComponent: FilterTextComponent;


	constructor(private SARService: SARService,
		private filterService: FilterService) {
		this.people = [];
		this.filteredPeople = this.people;
		//this.isLoading = true;

	}

	get selectedPeople() {
		return this.people
			.filter(p => p.checked)
			.map(p => { return p})
	}


	filterChanged(searchText: string) {
		this.filteredPeople = this.filterService.filter(searchText, ["Name", "Email"], this.people)
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
				console.log(this.people)
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