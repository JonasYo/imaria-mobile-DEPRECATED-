import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  urlIMariaAuth = 'http://localhost:8000';

  constructor(public http: HttpClient) { }

  listarAgenda(idUsuario): Observable<any> {
    return this.http.get(`${this.urlIMariaAuth}/schedule/${idUsuario}`);
  }
}
