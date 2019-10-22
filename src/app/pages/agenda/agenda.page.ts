import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { Storage } from '@ionic/storage';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage {
  selectedTab: any;

  agendaUsuario: any = [];

  constructor(private schedule: ScheduleService, private storage: Storage, private toastServ: ToastService) {
    this.listarAgenda();
  }

  async listarAgenda() {
    try {
      const usuario: any = await this.storage.get('user');
      this.agendaUsuario = await this.schedule.listarAgenda(usuario.id).toPromise();
      console.log(this.agendaUsuario);
    } catch (error) {
      this.toastServ.toastDinamicoErro(error.error.message);
    }
  }
}
