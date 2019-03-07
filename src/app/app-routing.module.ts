import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from "./home-page/home-page.component";
import { ScheduleComponent } from "./schedule/schedule.component";
import { BellsScheduleComponent } from "./bells-schedule/bells-schedule.component";
import { Page404Component } from "./page404/page404.component";
import {TeachersScheduleComponent} from "./teachers-schedule/teachers-schedule.component";

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: './admin-part/admin.module#AdminModule'
  },
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: '', component: ScheduleComponent },
      { path: 'teachers-schedule', component: TeachersScheduleComponent },
      { path: 'bells-schedule', component: BellsScheduleComponent },
      { path: '**', component: Page404Component }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
