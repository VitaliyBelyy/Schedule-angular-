import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from "./auth/auth.component";
import { RegistrationFormComponent } from "./registration-form/registration-form.component";
import { AccessKeyComponent } from "./access-key/access-key.component";
import { EditUserComponent } from "./edit-user/edit-user.component";

const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationFormComponent
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'departments' },
      { path: 'departments', loadChildren: './departments-module/departments.module#DepartmentsModule' },
      { path: 'cathedras', loadChildren: './cathedras-module/cathedras.module#CathedrasModule' },
      { path: 'teachers', loadChildren: './teachers-module/teachers.module#TeachersModule' },
      { path: 'subjects', loadChildren: './subjects-module/subjects.module#SubjectsModule' },
      { path: 'groups', loadChildren: './groups-module/groups.module#GroupsModule' },
      { path: 'auditories', loadChildren: './auditories-module/auditories.module#AuditoriesModule' },
      { path: 'timetable', loadChildren: './timetable-module/timetable.module#TimetableModule' },
      { path: 'key', component: AccessKeyComponent },
      { path: 'edit-user', component: EditUserComponent }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule { }
