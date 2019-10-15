import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {
  urlIMariaAuth = 'http://localhost:8000';

  constructor(public http: HttpClient) { }

  listarServicos(): Observable<any> {
    return this.http.get(this.urlIMariaAuth + '/services');
  }
}
