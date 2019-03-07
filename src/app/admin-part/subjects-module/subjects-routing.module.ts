import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubjectsWrapperComponent } from "./subjects-wrapper/subjects-wrapper.component";
import { SubjectsListComponent } from "./subjects-list/subjects-list.component";
import { SubjectsFormComponent } from "./subjects-form/subjects-form.component";

const routes: Routes = [
  {
    path: '',
    component: SubjectsWrapperComponent,
    children: [
      { path: '', component: SubjectsListComponent },
      { path: 'form', component: SubjectsFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }
