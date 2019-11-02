import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlIMariaAuth = ENV.apiUrl;

  constructor(public http: HttpClient) { }

  cadastrarUsuario(obj): Observable<any> {
    return this.http.post(`${this.urlIMariaAuth}/users`, obj);
  }

  alterarDadosUsuario(flag, obj): Observable<any> {
    return this.http.put(`${this.urlIMariaAuth}/users/${flag}`, obj);
  }
}
