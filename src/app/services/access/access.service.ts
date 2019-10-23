import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  // urlDespensaNaMaoApp: string = ENV.urlDespensaNaMaoApp;
  urlIMariaAuth = 'http://localhost:8000';

  constructor(public http: HttpClient) { }

  loginUsuario(obj): Observable<any> {
    return this.http.post(this.urlIMariaAuth + '/auth/singin', obj);
  }

  // loginAlternativo(obj) {
  //   return this.http.post(this.urlDespensaNaMaoAuth + '/acesso/alternativo', obj);
  // }
}

