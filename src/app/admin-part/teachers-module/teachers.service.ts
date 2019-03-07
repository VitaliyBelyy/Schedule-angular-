import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { ITeacher } from "../../interfaces/teacher";

@Injectable()
export class TeachersService {

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<any> {
    const url = `http://localhost:3000/teachers/${id}`;

    return this.http.get(url);
  }

  getByCathedra(id: number): Observable<any> {
    const url = `http://localhost:3000/teachers?cathedraID=${id}`;

    return this.http.get(url);
  }

  getList(): Observable<any> {
    const url = 'http://localhost:3000/teachers';

    return this.http.get(url);
  }

  insert(newTeacher: ITeacher): Observable<any> {
    const url = 'http://localhost:3000/teachers';

    return this.http.post(url, newTeacher);
  }

  update(updatedTeacher: ITeacher): Observable<any> {
    const url = `http://localhost:3000/teachers/${updatedTeacher.id}`;

    return this.http.put(url, updatedTeacher);
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/teachers/${id}`;

    return this.http.delete(url);
  }

}
