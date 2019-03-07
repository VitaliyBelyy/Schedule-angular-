import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuditoriesWrapperComponent } from "./auditories-wrapper/auditories-wrapper.component";
import { AuditoriesListComponent } from "./auditories-list/auditories-list.component";
import { AuditoriesFormComponent } from "./auditories-form/auditories-form.component";

const routes: Routes = [
  {
    path: '',
    component: AuditoriesWrapperComponent,
    children: [
      { path: '', component: AuditoriesListComponent },
      { path: 'form', component: AuditoriesFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditoriesRoutingModule { }
