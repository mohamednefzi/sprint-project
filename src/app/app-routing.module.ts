import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProfileComponent} from './profile/profile.component';
import {HomeMainComponent} from './home-main/home-main.component';
import {CircularProgressBarComponent} from './new-sprint/circular-progress-bar/circular-progress-bar.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'newSprintStart', component: CircularProgressBarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [ HomeMainComponent, ProfileComponent, CircularProgressBarComponent ];
}

