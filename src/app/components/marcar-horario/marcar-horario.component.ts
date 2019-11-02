import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ServicosService } from '../../services/servicos/servicos.service';
import { ToastService } from '../../services/toast/toast.service';
import { Storage } from '@ionic/storage';
import { LoadingService } from '../../services/loading/loading.service';
import { ModalsComponent } from '../modals/modals.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marcar-horario',
  templateUrl: './marcar-horario.component.html',
  styleUrls: ['./marcar-horario.component.scss'],
})
export class MarcarHorarioComponent{
  notHave = '../../../assets/icon/alert.png';
  dias = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
  datasDisponiveis: any = [];
  horariosDisponiveis: any = [];
  agendamentoHorario: any = {};
  servicoEscolhido: any = {};

  // tslint:disable-next-line:max-line-length
  constructor(private navParams: NavParams, private modalCtrl: ModalController, private servicesServ: ServicosService, private toastServ: ToastService, private storage: Storage, private loadingServ: LoadingService) {
    this.servicoEscolhido = this.navParams.get('servico');
    this.listaDatas();
    this.listaHorariosDisponiveis(this.datasDisponiveis[0].date);
  }

  changeColor(index) {
    for (let i = 0; i < this.datasDisponiveis.length; i++) {
      if (i === index) {
        this.datasDisponiveis[i].active = true;
        this.listaHorariosDisponiveis(this.datasDisponiveis[i].date);
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

  async listaHorariosDisponiveis(date) {
    this.loadingServ.showLoader(3000);
    try {
      this.agendamentoHorario.date_start = date;
      this.horariosDisponiveis = await this.servicesServ.listaHorariosDisponiveis(date, this.servicoEscolhido.id).toPromise();
      this.loadingServ.hideLoader();
    } catch (error) {
      this.loadingServ.hideLoader();      
      this.toastServ.toastDinamicoErro(error.error.message);
    }
  }

  async confirmarAgendamento(dto) {
    try {
      const modal = await this.modalCtrl.create({
        component: ModalsComponent,
        componentProps: {
          tipoModal: 'agendarProcedimento',
          servicoEscolhido: this.servicoEscolhido
        }
      });

      await modal.present();
      const { data } = await modal.onDidDismiss();
      if (data === 'confirmar') {
        this.agendarHorario(dto);
      }
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }

  async agendarHorario(dto) {
    await this.formataHorario(dto);

    this.agendamentoHorario.hour_id = dto.id;
    this.agendamentoHorario.service_id = this.servicoEscolhido.id;
    const { id } = await this.storage.get('user');

    try {
      const res = await this.servicesServ.agendarHorario(id, this.agendamentoHorario).toPromise();
      if (res) {
        this.toastServ.toastDinamicoSucesso('Agendamento realizado com sucesso');
        this.closeModal();
      }
    } catch (error) {
      this.toastServ.toastDinamicoErro(error.error.message);
    }
  }

  async formataHorario(dto) {
    const separarHorario = dto.hour.split(':');
    const date = new Date(this.agendamentoHorario.date_start);

    date.setDate(date.getDate() + 1);
    date.setHours(separarHorario[0]);
    date.setMinutes(separarHorario[1]);

    this.agendamentoHorario.date_start = date.toISOString();
    date.setMinutes(date.getMinutes() + this.servicoEscolhido.duration);
    this.agendamentoHorario.date_end = date.toISOString();

    return this.agendamentoHorario;
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
