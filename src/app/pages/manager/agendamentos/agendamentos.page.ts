import { Component } from '@angular/core';
import { ScheduleService } from '../../../services/schedule/schedule.service';
import { LoadingService } from '../../../services/loading/loading.service';
import { ToastService } from '../../../services/toast/toast.service';
import { ModalController } from '@ionic/angular';
import { ModalsComponent } from '../../../components/modals/modals.component';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.page.html',
  styleUrls: ['./agendamentos.page.scss'],
})
export class AgendamentosPage {
  notHave = '../../../assets/icon/alert.png';

  dias = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
  datasDisponiveis: any = [];

  agendamentos: any = [];

  constructor(private scheduleServ: ScheduleService, private loadingServ: LoadingService, private toastServ: ToastService, private modalCtrl: ModalController) {
    this.listaDatas();
    this.listarAgendamentos(this.datasDisponiveis[0].date);
  }

  changeColor(index) {
    for (let i = 0; i < this.datasDisponiveis.length; i++) {
      if (i === index) {
        this.datasDisponiveis[i].active = true;
        this.listarAgendamentos(this.datasDisponiveis[i].date);
      } else {
        this.datasDisponiveis[i].active = false;
      }
    }
  }

  async listaDatas() {
    let currentDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 2);
    for (let index = 0; index < 65; index++) {
      if (currentDate < endDate) {
        const diaDaSemana = currentDate.getDay();
        const dia = currentDate.getDate();
        const mes = currentDate.getMonth();
        const ano = currentDate.getFullYear();

        const res: any = {
          diaDaSemana: this.dias[diaDaSemana],
          data: `${dia <= 9 ? '0' + dia : dia}/${mes <= 9 ? '0' + mes : mes}`,
          date: `${ano}-${mes <= 9 ? '0' + mes : mes}-${dia <= 9 ? '0' + dia : dia}`,
        };

        this.datasDisponiveis.push(res);
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      } else {
        break;
      }
    }
    this.datasDisponiveis[0].active = true;
  }

  async listarAgendamentos(date) {
    this.loadingServ.showLoader(3000);
    try {
      this.agendamentos = await this.scheduleServ.listarAgendamentos(date).toPromise();
    } catch (error) {
      this.toastServ.toastDinamicoAviso('Não há agendamentos marcados para a data selecionada.');
    }
    this.loadingServ.hideLoader();
  }

  async mostrarInformacoes(dto) {
    console.log(dto);
    try {
      const modal = await this.modalCtrl.create({
        component: ModalsComponent,
        componentProps: {
          tipoModal: 'informacaoAgendamento',
          informacaoAgendamento: dto
        }
      });
      await modal.present();
      await modal.onDidDismiss();
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }
}
