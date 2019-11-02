import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  urlIMariaAuth = ENV.apiUrl;

  constructor(public http: HttpClient) { }

  loginUsuario(obj): Observable<any> {
    return this.http.post(`${this.urlIMariaAuth}/auth/singin`, obj);
  }

  loginAlternativo(obj) {
    return this.http.post(`${this.urlIMariaAuth}/auth/singin/alternative`, obj);
  }

  forgotPassword(obj): Observable<any> {
    return this.http.post(`${this.urlIMariaAuth}/auth/forgot`, obj);
  }

  resetPassword(obj): Observable<any> {
    return this.http.post(`${this.urlIMariaAuth}/auth/reset`, obj);
  }
}

