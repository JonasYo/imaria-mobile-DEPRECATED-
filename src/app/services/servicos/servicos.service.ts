import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {
  urlIMariaAuth = ENV.apiUrl;

  constructor(public http: HttpClient) { }

  listarServicos(): Observable<any> {
    return this.http.get(`${this.urlIMariaAuth}/services`);
  }

  listaHorariosDisponiveis(date, serviceId): Observable<any> {
    return this.http.get(`${this.urlIMariaAuth}/services/${date}/schedule/${serviceId}`);
  }

  agendarHorario(userId, dto): Observable<any> {
    return this.http.post(`${this.urlIMariaAuth}/services/${userId}/schedule`, dto);
  }
}
