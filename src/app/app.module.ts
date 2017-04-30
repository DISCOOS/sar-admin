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
import { ToastComponent, ToastService } from './blocks/blocks';
import { PeopleListComponent } from './people/people-list.component';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FilterTextComponent } from './blocks/filter-text/filter-text.component';
import { LoginComponent } from './login/login.component';

import * as spinner from 'ng2-spin-kit/dist/spinners'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2Bs3ModalModule
  ],

  declarations: [AppComponent,
    routableComponents,
    FilterTextComponent,
    spinner.ThreeBounceComponent,
    ToastComponent,
    LoginComponent,
    PeopleListComponent


  ],
  //globale providers
  providers: [
  SARService, 
  ToastService,
  AuthGuard
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
