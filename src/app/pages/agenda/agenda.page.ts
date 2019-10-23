import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { Storage } from '@ionic/storage';
import { ToastService } from '../../services/toast/toast.service';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage {
  selectedTab: any = 'aRealizar';

  agendaUsuario: any = [];

  // tslint:disable-next-line:max-line-length
  constructor(private schedule: ScheduleService, private storage: Storage, private toastServ: ToastService, private loadingServ: LoadingService) {
    this.listarAgenda();
  }

  async listarAgenda() {
    try {
      this.loadingServ.showLoader(3000);
      const usuario: any = await this.storage.get('user');
      this.agendaUsuario = await this.schedule.listarAgenda(usuario.id).toPromise();
      this.loadingServ.hideLoader();
    } catch (error) {
      this.toastServ.toastDinamicoErro(error.error.message);
    }
  }
}
