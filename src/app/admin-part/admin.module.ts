import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from "../shared/shared.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { AdminMenuComponent } from "./admin-menu/admin-menu.component";
import { AuthComponent } from "./auth/auth.component";
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { AccessKeyComponent } from './access-key/access-key.component';
import { AccessKeyService } from "./access-key.service";
import { UserService } from "./user.service";
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    AdminMenuComponent,
    AuthComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    AccessKeyComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  providers: [
    UserService,
    AccessKeyService
  ]
})
export class AdminModule { }
