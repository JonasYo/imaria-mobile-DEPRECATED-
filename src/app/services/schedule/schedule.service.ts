import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';

import { Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  urlIMariaAuth = ENV.apiUrl;

  constructor(public http: HttpClient) { }

  listarAgendaUsuario(idUsuario): Observable<any> {
    return this.http.get(`${this.urlIMariaAuth}/schedule/user/${idUsuario}`);
  }

  listarAgendamentos(date): Observable<any> {
    return this.http.get(`${this.urlIMariaAuth}/schedule/${date}/accredited`);
  }
}
