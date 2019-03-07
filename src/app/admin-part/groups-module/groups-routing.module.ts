import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsWrapperComponent } from "./groups-wrapper/groups-wrapper.component";
import { GroupsListComponent } from "./groups-list/groups-list.component";
import { GroupsFormComponent } from "./groups-form/groups-form.component";

const routes: Routes = [
  {
    path: '',
    component: GroupsWrapperComponent,
    children: [
      { path: '', component: GroupsListComponent },
      { path: 'form', component: GroupsFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
