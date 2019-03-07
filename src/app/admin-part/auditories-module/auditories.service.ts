import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { IAuditory } from "../../interfaces/auditory";

@Injectable()
export class AuditoriesService {

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<any> {
    const url = `http://localhost:3000/auditories/${id}`;

    return this.http.get(url);
  }

  getList(): Observable<any> {
    const url = 'http://localhost:3000/auditories';

    return this.http.get(url);
  }

  insert(newAuditory: IAuditory): Observable<any> {
    const url = 'http://localhost:3000/auditories';

    return this.http.post(url, newAuditory);
  }

  update(updatedAuditory: IAuditory): Observable<any> {
    const url = `http://localhost:3000/auditories/${updatedAuditory.id}`;

    return this.http.put(url, updatedAuditory);
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/auditories/${id}`;

    return this.http.delete(url);
  }
}
