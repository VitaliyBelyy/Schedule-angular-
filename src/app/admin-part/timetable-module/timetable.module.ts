import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimetableRoutingModule } from './timetable-routing.module';
import { SharedModule } from "../../shared/shared.module";
import { TimetableWrapperComponent } from './timetable-wrapper/timetable-wrapper.component';
import { TimetableListComponent } from './timetable-list/timetable-list.component';
import { TimetableFormComponent } from './timetable-form/timetable-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TimetableRoutingModule
  ],
  declarations: [TimetableWrapperComponent, TimetableListComponent, TimetableFormComponent]
})
export class TimetableModule { }
