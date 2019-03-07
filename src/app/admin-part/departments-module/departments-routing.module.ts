import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentsWrapperComponent } from "./departments-wrapper/departments-wrapper.component";
import { DepartmentsListComponent } from "./departments-list/departments-list.component";
import { DepartmentsFormComponent } from "./departments-form/departments-form.component";

const routes: Routes = [
  {
    path: '',
    component: DepartmentsWrapperComponent,
    children: [
      { path: '', component: DepartmentsListComponent },
      { path: 'form', component: DepartmentsFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
