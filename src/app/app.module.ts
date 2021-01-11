import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import {AgGridModule} from 'ag-grid-angular';
import { AlertComponent } from './shared/alert/alert.component';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthComponent} from './auth/auth.component';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DropdownDirective } from './shared/dropdown.directive';
import {EmployeeDetailsComponent} from './components/employee-details/employee-details.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner/loading-spinner.component';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import {TutorialService} from './services/tutorial.service';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';

// import 'ag-grid-enterprise';



@NgModule({
  declarations: [
    AppComponent,
    AddTutorialComponent,
    TutorialDetailsComponent,
    TutorialsListComponent,
    HeaderComponent,
    EmployeeDetailsComponent,
    EmployeeListComponent,
    DropdownDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [TutorialService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
  export class AppModule { }
