import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from "../../shared/shared.module";
import { AuditoriesRoutingModule } from './auditories-routing.module';
import { AuditoriesWrapperComponent } from "./auditories-wrapper/auditories-wrapper.component";
import { AuditoriesListComponent } from "./auditories-list/auditories-list.component";
import { AuditoriesFormComponent } from "./auditories-form/auditories-form.component";

@NgModule({
  imports: [
      CommonModule,
      SharedModule,
      AuditoriesRoutingModule
  ],
  declarations: [
      AuditoriesWrapperComponent,
      AuditoriesListComponent,
      AuditoriesFormComponent
  ]
})
export class AuditoriesModule { }
