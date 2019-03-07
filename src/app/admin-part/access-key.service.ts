import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()
export class AccessKeyService {

  constructor(private http: HttpClient) {}

  setAccessKey(value: number): Observable<number> {
    const url = 'http://localhost:3000/access-key';

    return this.http.put(url, { value })
        .pipe(
            map((key: { value: number; }) => key.value)
        );
  }

  getAccessKey(): Observable<number> {
    const url = 'http://localhost:3000/access-key';

    return this.http.get(url)
        .pipe(
            map((key: { value: number; }) => key.value)
        );
  }
}
