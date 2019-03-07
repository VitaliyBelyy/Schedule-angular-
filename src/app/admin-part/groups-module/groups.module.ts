import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { SharedModule } from "../../shared/shared.module";
import { GroupsWrapperComponent } from './groups-wrapper/groups-wrapper.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupsFormComponent } from './groups-form/groups-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GroupsRoutingModule
  ],
  declarations: [
    GroupsWrapperComponent,
    GroupsListComponent,
    GroupsFormComponent
  ]
})
export class GroupsModule { }
