import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimetableFormComponent } from "./timetable-form/timetable-form.component";
import { TimetableListComponent } from "./timetable-list/timetable-list.component";
import { TimetableWrapperComponent } from "./timetable-wrapper/timetable-wrapper.component";

const routes: Routes = [
  {
    path: '',
    component: TimetableWrapperComponent,
    children: [
      { path: '', component: TimetableListComponent },
      { path: 'form', component: TimetableFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimetableRoutingModule { }
