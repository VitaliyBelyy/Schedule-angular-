import { Component, Output, EventEmitter } from '@angular/core';

import { IUser } from "../../interfaces/user";
import { UserService } from "../user.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  @Output() login: EventEmitter<any> = new EventEmitter();

  user: IUser;

  loginField: string;

  passwordField: string;

  errorMessage: string;

  constructor( private userService: UserService ) { }

  submitForm() {
    this.errorMessage = '';

    this.userService.findUser(this.loginField)
        .subscribe(
            (userData: IUser) => {
              if(userData) {

                this.user = userData;
                this.checkAuthorization();

              } else {

                this.errorMessage = 'Пользователь с таким логином не найден.';
                this.loginField = null;
                this.passwordField = null;

              }
            },
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); },
        );
  }

  private checkAuthorization() {

    if(this.user.password == this.passwordField ) {

      this.userService.authorization(this.user);
      this.login.emit();

    } else this.errorMessage = 'Неверное имя пользователя или пароль.';

    this.loginField = null;
    this.passwordField = null;

  }

}
