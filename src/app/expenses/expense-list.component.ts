import { ViewChild, Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { Mission, Expence } from '../models/models';
import { SARService } from '../services/sar.service';



@Component({
    moduleId: module.id,
    selector: 'expenses',
    templateUrl: 'expense-list.component.html'
})
export class ExpenseListComponent implements OnInit {

    @Input() mission: Mission;
    expenses: Expence[];

    constructor(
        private SARService: SARService
    ) { }

    ngOnInit() {
        setTimeout(() => {
           // this.getExpenses();
        }, 3000)


    }

    getExpenses() {
        this.SARService.getMissionExpences(this.mission)
            .subscribe(
            (expenses) => {
                this.expenses = expenses;
            },
            (err) => { console.log("Failed getting expenses for mission" + err) },
            () => { console.log("Ok,Got expenses"); console.log(this.expenses)});
    }
}