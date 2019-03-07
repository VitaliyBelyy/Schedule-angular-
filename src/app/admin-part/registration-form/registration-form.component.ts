import { Component, OnInit } from '@angular/core';

import { UserService } from "../user.service";
import { IUser } from "../../interfaces/user";
import { AccessKeyService } from "../access-key.service";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  loginField: string;

  passwordField: string;

  keyField: number;

  keyValue: number;

  errorMessage: string;

  successMessage: string;

  constructor( private userService: UserService, private keyService: AccessKeyService) {}

  ngOnInit() {
    this.keyService.getAccessKey()
        .subscribe(
            (keyValue: number) => { this.keyValue = keyValue },
            (error: any) => { this.errorMessage = 'Произошла ошибка при получении ключа, попробуйте снова.'; console.log(error); }
        );
  }

  submitForm() {
    this.errorMessage = '';
    this.successMessage = '';

    if(this.keyValue == this.keyField) {

        this.userService.findUser(this.loginField)
            .subscribe(
                (userData: IUser) => {
                    if(userData) this.errorMessage = 'Пользователь с таким логином уже существует.';
                    else this.registerUser();
                }
            );

    } else this.errorMessage = 'Неверный ключ регистрации.';
  }

  private registerUser() {
    const newUser: IUser = {
        login: this.loginField,
        password: this.passwordField
    };

    this.userService.registration(newUser)
        .subscribe(
            () => this.successMessage = 'Пользователь успешно зарегестрирован.',
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); },
            () => { this.loginField = null; this.passwordField = null; this.keyField = null; }
        );
  }

}
