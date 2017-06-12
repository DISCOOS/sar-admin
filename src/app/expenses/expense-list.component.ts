import { ViewChild, Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Mission, Expence } from '../models/models';
import { SARService } from '../services/sar.service';



@Component({
    moduleId: module.id,
    selector: 'expenses',
    templateUrl: 'expense-list.component.html'
})
export class ExpenseListComponent implements OnInit {

    //@Input() mission: Mission;
    
    @Input() expenses: Expence[];

    constructor(
        private SARService: SARService
    ) { }

    ngOnInit() {
    }
}
