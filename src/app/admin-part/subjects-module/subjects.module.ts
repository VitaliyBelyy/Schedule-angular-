import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectsRoutingModule } from './subjects-routing.module';
import { SharedModule } from "../../shared/shared.module";
import { SubjectsWrapperComponent } from './subjects-wrapper/subjects-wrapper.component';
import { SubjectsListComponent } from './subjects-list/subjects-list.component';
import { SubjectsFormComponent } from './subjects-form/subjects-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SubjectsRoutingModule
  ],
  declarations: [
    SubjectsWrapperComponent,
    SubjectsListComponent,
    SubjectsFormComponent
  ]
})
export class SubjectsModule { }
