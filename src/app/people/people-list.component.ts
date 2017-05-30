import { ViewChild, Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { SARUser } from '../models/models';
import { FilterService, FilterTextComponent } from '../blocks/blocks';
import { SARService } from '../services/sar.service';
import { ToastService } from '../blocks/blocks';
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
	
	//@Input() 
	people: SARUser[];
	filteredPeople = this.people;
	//selectedPeople: SARUser[];
	@ViewChild(FilterTextComponent) filterComponent: FilterTextComponent;

	constructor(
		private SARService: SARService,
		private filterService: FilterService,
		private toastService: ToastService
	)
		{
		this.people = [];
		this.filteredPeople = this.people;
	}

		ngOnInit() {
		this.getPeople();

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
	
		this.SARService.getPeople()
			.subscribe(
			(people) => {
				this.people = this.filteredPeople = people;
				this.filterComponent.clear();
			},
			(err) => { this.toastService.activate(`Klarte ikke å hente liste med personer. Forsøk å logge inn på nytt`, false, false); },
			() => {  console.log('ok, got people..')});
	}

}