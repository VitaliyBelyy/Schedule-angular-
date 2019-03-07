import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { IUser } from "../interfaces/user";

@Injectable()
export class UserService {

  private user: IUser;

  constructor(private http: HttpClient) { }

  getUsername(): string {
    return this.user.login;
  }

  authorization(userData: IUser) {
    this.user = userData;
  }

  registration(newUser: IUser): Observable<any> {
    const url = 'http://localhost:3000/users';

    return this.http.post(url, newUser);
  }

  findUser(login: string): Observable<any> {
    const url = `http://localhost:3000/users?login=${login}`;

    return this.http.get(url)
        .pipe(
            map(users => users[0])
        );
  }

  updateUser(updatedUser: IUser): Observable<any> {
    const url = `http://localhost:3000/users/${updatedUser.id}`;

    return this.http.put(url, updatedUser);
  }

}
