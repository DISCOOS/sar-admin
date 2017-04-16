import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import './rxjs-extensions';


import { AppComponent } from './app.component';

import { SARService } from './alarms/sar.service';
import { AppRoutingModule, routableComponents } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { ToastComponent, ToastService } from './blocks/blocks';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FilterTextComponent } from './blocks/filter-text/filter-text.component';

import * as spinner from 'ng2-spin-kit/dist/spinners'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2Bs3ModalModule,
  ],

  declarations: [AppComponent,
    routableComponents,
    FilterTextComponent,
    spinner.ThreeBounceComponent,
    ToastComponent

  ],
  //globale providers
  providers: [
  SARService, 
  ToastService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
