import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import './rxjs-extensions';

import { AppComponent } from './app.component';
import { AppRoutingModule, routableComponents } from './app-routing.module';
import { AuthGuard } from './blocks/guard/auth.gard';
 
import { PageNotFoundComponent } from './page-not-found.component';
import { PeopleListComponent } from './people/people-list.component';
import { MissionActiveComponent } from './missions/mission-active.component';
import { ProfileComponent } from './profile/profile.component';
import { MapComponent } from './map/map.component';
import { AlarmComponent } from './alarms/alarm.component';
import { ExpenseListComponent } from './expenses/expense-list.component';
import { TrackingComponent } from './tracking/tracking.component';
import { LoginComponent } from './login/login.component';

import { ToastComponent, ToastService, ModalService, ModalComponent, SpinnerComponent, SpinnerService } from './blocks/blocks';
import { FilterTextComponent } from './blocks/filter-text/filter-text.component';
import { SortMissionsPipe } from './missions/sort-missions.pipe';

import { SARService } from './services/sar.service';
import { MapService } from './services/map.service';
import { UserService } from './services/user.service';
import { ExceptionService } from './services/exception.service';

import { FLATPICKR_TOKEN } from './services/flatpickr.service';

declare let flatpickr : any;

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],

  declarations: [AppComponent,
    routableComponents,
    FilterTextComponent,
    ToastComponent,
    LoginComponent,
    PeopleListComponent,
    ProfileComponent,
    MapComponent,
    MissionActiveComponent,
    AlarmComponent,
    ExpenseListComponent,
    TrackingComponent,
    ModalComponent,
    SortMissionsPipe,
    SpinnerComponent
  ],
  //globale providers
  providers: [
    SARService,
    MapService,
    ToastService,
    AuthGuard,
    UserService,
    ExceptionService,
    ModalService,
    SpinnerService,
    { provide: FLATPICKR_TOKEN, useValue: flatpickr }
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
