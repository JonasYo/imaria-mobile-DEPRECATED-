import { Component, ɵConsole } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MarcarHorarioComponent } from '../../components/marcar-horario/marcar-horario.component';
import { ServicosService } from '../../services/servicos/servicos.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-servicos',
  templateUrl: 'servicos.page.html',
  styleUrls: ['servicos.page.scss']
})
export class ServicosPage {
  servicos: any = [];
  datas: any = [];
  dias = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

  constructor(private modalCtrl: ModalController, private servicesServ: ServicosService, private toastServ: ToastService) {
    this.listarServicos();
    this.listaDatas();
  }

  async listarServicos() {
    try {
      this.servicos = await this.servicesServ.listarServicos().toPromise();
    } catch (error) {
      this.toastServ.toastDinamicoErro(error.error.message);
    }
  }

  listaDatas() {
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    let end = new Date('12/30/2019');
    const newend = end.setDate(end.getDate() + 1);
    end = new Date(newend);
    while (currentDate < end) {
      const dia = currentDate.getDay();
      this.datas.data = currentDate.toLocaleDateString();
      this.datas.dia = this.dias[dia];
      // console.log(this.datas);
      // console.log(currentDate.toLocaleDateString()); // ISO Date format
      const newDate = currentDate.setDate(currentDate.getDate() + 1);
      currentDate = new Date(newDate);
    }
  }

  async agendarHorario(dto) {
    try {
      const modal = await this.modalCtrl.create({
        component: MarcarHorarioComponent,
        componentProps: {
          servico: dto,
          other: { couldAlsoBeAnObject: true }
        }
      });
      await modal.present();
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }
}
