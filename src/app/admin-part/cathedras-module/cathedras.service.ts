import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { ICathedra } from "../../interfaces/cathedra";

@Injectable()
export class CathedrasService {

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<any> {
    const url = `http://localhost:3000/cathedras/${id}`;

    return this.http.get(url);
  }

  getByDepartment(id: number): Observable<any> {
    const url = `http://localhost:3000/cathedras?departmentID=${id}`;

    return this.http.get(url);
  }

  getList(): Observable<any> {
    const url = 'http://localhost:3000/cathedras';

    return this.http.get(url);
  }

  insert(newCathedra: ICathedra): Observable<any> {
    const url = 'http://localhost:3000/cathedras';

    return this.http.post(url, newCathedra);
  }

  update(updatedCathedra: ICathedra): Observable<any> {
    const url = `http://localhost:3000/cathedras/${updatedCathedra.id}`;

    return this.http.put(url, updatedCathedra);
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/cathedras/${id}`;

    return this.http.delete(url);
  }

}
