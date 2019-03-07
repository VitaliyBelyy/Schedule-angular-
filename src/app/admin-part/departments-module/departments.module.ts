import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { SharedModule } from "../../shared/shared.module";
import { DepartmentsListComponent } from './departments-list/departments-list.component';
import { DepartmentsWrapperComponent } from "./departments-wrapper/departments-wrapper.component";
import { DepartmentsFormComponent } from './departments-form/departments-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DepartmentsRoutingModule
  ],
  declarations: [
      DepartmentsListComponent,
      DepartmentsWrapperComponent,
      DepartmentsFormComponent
  ]
})
export class DepartmentsModule { }
