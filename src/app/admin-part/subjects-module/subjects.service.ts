import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { ISubject } from "../../interfaces/subject";

@Injectable()
export class SubjectsService {

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<any> {
    const url = `http://localhost:3000/subjects/${id}`;

    return this.http.get(url);
  }

  getList(): Observable<any> {
    const url = 'http://localhost:3000/subjects';

    return this.http.get(url);
  }

  insert(newSubject: ISubject): Observable<any> {
    const url = 'http://localhost:3000/subjects';

    return this.http.post(url, newSubject);
  }

  update(updatedSubject: ISubject): Observable<any> {
    const url = `http://localhost:3000/subjects/${updatedSubject.id}`;

    return this.http.put(url, updatedSubject);
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/subjects/${id}`;

    return this.http.delete(url);
  }

}
