import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlarmListComponent} from './alarms/alarm-list.component';
import { AlarmSingleComponent } from './alarms/alarm-single.component';
import { PageNotFoundComponent} from './page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './blocks/guard/auth.gard';

const routes: Routes = [
    { path: '', component: AlarmListComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'alarms', component: AlarmListComponent, canActivate: [AuthGuard]},
    { path: 'alarms/:id', component: AlarmSingleComponent, canActivate: [AuthGuard]},
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