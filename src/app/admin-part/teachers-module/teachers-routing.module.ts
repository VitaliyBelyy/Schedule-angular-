import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeachersWrapperComponent } from "./teachers-wrapper/teachers-wrapper.component";
import { TeachersListComponent } from "./teachers-list/teachers-list.component";
import { TeachersFormComponent } from "./teachers-form/teachers-form.component";

const routes: Routes = [
  {
    path: '',
    component: TeachersWrapperComponent,
    children: [
      { path: '', component: TeachersListComponent },
      { path: 'form', component: TeachersFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
