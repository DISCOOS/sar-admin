import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlarmListComponent} from './alarms/alarm-list.component';
import { AlarmSingleComponent } from './alarms/alarm-single.component';
import { PageNotFoundComponent} from './page-not-found.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'alarms'},
    { path: 'alarms', component: AlarmListComponent},
    { path: 'alarms/:id', component: AlarmSingleComponent},
    { path: '**', pathMatch: 'full', component: PageNotFoundComponent}
]

@NgModule({
    // import angular routing-features
    imports: [RouterModule.forRoot(routes)],
    
    // expose routing-features to app
    exports: [RouterModule]
})

export class AppRoutingModule {}

export const routableComponents = [
    AlarmListComponent,
    AlarmSingleComponent,
    PageNotFoundComponent
];