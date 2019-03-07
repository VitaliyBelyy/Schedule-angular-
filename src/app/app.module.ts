import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { Page404Component } from './page404/page404.component';
import { BellsScheduleComponent } from './bells-schedule/bells-schedule.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { DepartmentsService } from "./admin-part/departments-module/departments.service";
import { CathedrasService } from "./admin-part/cathedras-module/cathedras.service";
import { GroupsService } from "./admin-part/groups-module/groups.service";
import { AuditoriesService } from "./admin-part/auditories-module/auditories.service";
import { SubjectsService } from "./admin-part/subjects-module/subjects.service";
import { TeachersService } from "./admin-part/teachers-module/teachers.service";
import { TimetableService } from "./admin-part/timetable-module/timetable.service";
import { FilterComponent } from './filter/filter.component';
import { ScheduleTableComponent } from './schedule-table/schedule-table.component';
import { TeachersScheduleComponent } from './teachers-schedule/teachers-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ScheduleComponent,
    Page404Component,
    BellsScheduleComponent,
    HomePageComponent,
    FilterComponent,
    ScheduleTableComponent,
    TeachersScheduleComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    DepartmentsService,
    CathedrasService,
    GroupsService,
    AuditoriesService,
    SubjectsService,
    TeachersService,
    TimetableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
