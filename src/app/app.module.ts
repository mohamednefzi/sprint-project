import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ROUTES } from './app.routes';

import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { HeaderComponent } from './header/header.component';
import { HomeMainComponent } from './home-main/home-main.component';
import { ModalTermsAndConditionsComponent } from './modal-terms-and-conditions/modal-terms-and-conditions.component';
import { ProfileComponent } from './profile/profile.component';
import { TabsModule } from 'ngx-tabset';
import { PastSprintComponent } from './tables/past-sprint/past-sprint.component';
import { PaginationModule } from 'ngx-bootstrap';
import { NewSprintComponent } from './new-sprint/new-sprint.component';
import { CircularProgressBarComponent } from './new-sprint/circular-progress-bar/circular-progress-bar.component';

import { PushNotificationsModule } from 'ng-push';
import { AppRoutingModule } from './app-routing.module';
import {DataService} from './core/data.service';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    HeaderComponent,
    HomeMainComponent,
    ModalTermsAndConditionsComponent,
    ProfileComponent,
    PastSprintComponent,
    NewSprintComponent,
    CircularProgressBarComponent,



  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    PushNotificationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

  ],
  providers: [AuthService,  CircularProgressBarComponent, DataService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
