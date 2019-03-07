import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CathedrasWrapperComponent } from "./cathedras-wrapper/cathedras-wrapper.component";
import { CathedrasListComponent } from "./cathedras-list/cathedras-list.component";
import { CathedrasFormComponent } from "./cathedras-form/cathedras-form.component";

const routes: Routes = [
  {
    path: '',
    component: CathedrasWrapperComponent,
    children: [
      { path: '', component: CathedrasListComponent },
      { path: 'form', component: CathedrasFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CathedrasRoutingModule { }
