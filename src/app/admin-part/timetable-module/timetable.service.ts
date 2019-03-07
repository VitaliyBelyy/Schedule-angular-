import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { ITimetableItem } from "../../interfaces/timetable-item";
import { IFilterOptions } from "../../interfaces/filter-options";

@Injectable()
export class TimetableService {

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<any> {
    const url = `http://localhost:3000/timetable/${id}`;

    return this.http.get(url);
  }

  getList(): Observable<any> {
    const url = 'http://localhost:3000/timetable';

    return this.http.get(url);
  }

  getFilteredList(options: IFilterOptions) {
    const queryString = ('groupID' in options) ? `groupID=${options.groupID}` : `teacherID=${options.teacherID}`;
    const url = `http://localhost:3000/timetable?${queryString}&weekType=${options.weekType}&_sort=weekDay,lessonNumber`;

    return this.http.get(url);
  }

  insert(newItem: ITimetableItem): Observable<any> {
    const url = 'http://localhost:3000/timetable';

    return this.http.post(url, newItem);
  }

  update(updatedItem: ITimetableItem): Observable<any> {
    const url = `http://localhost:3000/timetable/${updatedItem.id}`;

    return this.http.put(url, updatedItem);
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/timetable/${id}`;

    return this.http.delete(url);
  }

}
