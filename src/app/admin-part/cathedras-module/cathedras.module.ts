import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CathedrasRoutingModule } from './cathedras-routing.module';
import { CathedrasWrapperComponent } from "./cathedras-wrapper/cathedras-wrapper.component";
import { SharedModule } from "../../shared/shared.module";
import { CathedrasListComponent } from "./cathedras-list/cathedras-list.component";
import { CathedrasFormComponent } from "./cathedras-form/cathedras-form.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CathedrasRoutingModule
  ],
  declarations: [
    CathedrasWrapperComponent,
    CathedrasListComponent,
    CathedrasFormComponent
  ]
})
export class CathedrasModule { }
