import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import './rxjs-extensions';


import { AppComponent } from './app.component';
import { AuthGuard } from './blocks/guard/auth.gard';
import { SARService } from './services/sar.service';
import { AppRoutingModule, routableComponents } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { ToastComponent, ToastService, ModalService, ModalComponent, SpinnerComponent, SpinnerService } from './blocks/blocks';
import { PeopleListComponent } from './people/people-list.component';
import { MissionActiveComponent } from './missions/mission-active.component';
import { MapComponent } from './map/map.component';

import { FilterTextComponent } from './blocks/filter-text/filter-text.component';
import { LoginComponent } from './login/login.component';
import { MapService } from './services/map.service';
import { UserService } from './services/user.service';
import { ExceptionService } from './services/exception.service';
import { SortMissionsPipe} from './missions/sort-missions.pipe';

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
    MapComponent,
    MissionActiveComponent,
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
  SpinnerService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
