import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { IGroup } from "../../interfaces/group";

@Injectable()
export class GroupsService {

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<any> {
    const url = `http://localhost:3000/groups/${id}`;

    return this.http.get(url);
  }

  getByCathedra(id: number): Observable<any> {
    const url = `http://localhost:3000/groups?cathedraID=${id}`;

    return this.http.get(url);
  }

  getList(): Observable<any> {
    const url = 'http://localhost:3000/groups';

    return this.http.get(url);
  }

  insert(newGroup: IGroup): Observable<any> {
    const url = 'http://localhost:3000/groups';

    return this.http.post(url, newGroup);
  }

  update(updatedGroup: IGroup): Observable<any> {
    const url = `http://localhost:3000/groups/${updatedGroup.id}`;

    return this.http.put(url, updatedGroup);
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/groups/${id}`;

    return this.http.delete(url);
  }

}
