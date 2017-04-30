import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MissionListComponent} from './missions/mission-list.component';
import { MissionSingleComponent } from './missions/mission-single.component';
import { PageNotFoundComponent} from './page-not-found.component';
import { LoginComponent } from './login/login.component';
import  {PeopleListComponent}  from './people/people-list.component';
import { AuthGuard } from './blocks/guard/auth.gard';

const routes: Routes = [
    { path: '', component: MissionListComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'people', component: PeopleListComponent},
    { path: 'missions', component: MissionListComponent, canActivate: [AuthGuard]},
    { path: 'missions/:id', component: MissionSingleComponent, canActivate: [AuthGuard]},
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
    MissionListComponent,
    MissionSingleComponent,
    PageNotFoundComponent,
    PeopleListComponent
];