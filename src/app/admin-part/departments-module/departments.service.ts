import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { IDepartment } from "../../interfaces/department";

@Injectable()
export class DepartmentsService {

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<any> {
    const url = `http://localhost:3000/departments/${id}`;

    return this.http.get(url);
  }

  getList(): Observable<any> {
    const url = 'http://localhost:3000/departments';

    return this.http.get(url);
  }

  insert(newDepartment: IDepartment): Observable<any> {
    const url = 'http://localhost:3000/departments';

    return this.http.post(url, newDepartment);
  }

  update(updatedDepartment: IDepartment): Observable<any> {
    const url = `http://localhost:3000/departments/${updatedDepartment.id}`;

    return this.http.put(url, updatedDepartment);
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/departments/${id}`;

    return this.http.delete(url);
  }

}
