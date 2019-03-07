import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../user.service";
import { IUser } from "../../interfaces/user";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: IUser;

  loginField: string;

  passwordField: string;

  newPasswordField: string;

  errorMessage: string;

  successMessage: string;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {

    this.route.queryParams.subscribe((params: Params) => this.loginField = params['username'])

  }

  submitForm() {
    this.errorMessage = '';
    this.successMessage = '';

    this.userService.findUser(this.loginField)
        .subscribe(
            (userData: IUser) => {
              if(userData) {

                this.user = userData;
                this.checkEnteredData();

              } else {

                this.errorMessage = 'Пользователь с таким логином не найден.';
                this.passwordField = null;
                this.newPasswordField = null;

              }
            },
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); }
        );
  }

  private checkEnteredData() {
    if( this.user.password != this.passwordField ) this.errorMessage = 'Неверный текущий пароль.';

    else if( this.passwordField == this.newPasswordField ) this.errorMessage = 'Пароли совпадают.';

    else {
      let updatedUser: IUser = this.user;

      updatedUser.password = this.newPasswordField;
      this.userService.updateUser( updatedUser )
          .subscribe(
              () => this.successMessage = 'Пароль успешно изменен.',
              (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); },
              () => { this.passwordField = null; this.newPasswordField = null; }
          )
    }
  }

}
