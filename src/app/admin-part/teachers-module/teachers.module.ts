import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { SharedModule } from "../../shared/shared.module";
import { TeachersWrapperComponent } from './teachers-wrapper/teachers-wrapper.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { TeachersFormComponent } from './teachers-form/teachers-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TeachersRoutingModule
  ],
  declarations: [
    TeachersWrapperComponent,
    TeachersListComponent,
    TeachersFormComponent
  ]
})
export class TeachersModule { }
