import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ServicosService } from '../../services/servicos/servicos.service';
import { ToastService } from '../../services/toast/toast.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-marcar-horario',
  templateUrl: './marcar-horario.component.html',
  styleUrls: ['./marcar-horario.component.scss'],
})
export class MarcarHorarioComponent implements OnInit {
  dias = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
  datas: any = [];

  horariosDisponiveis: any = [];

  agendamentoHorario: any = {};

  servicoEscolhido: any = {};

  // tslint:disable-next-line:max-line-length
  constructor(private navParams: NavParams, private modalCtrl: ModalController, private servicesServ: ServicosService, private toastServ: ToastService, private storage: Storage) {
    this.listaDatas();
    this.servicoEscolhido = this.navParams.get('servico');
    this.listaHorariosDisponiveis(this.datas[0].date);
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

        this.datas.push(res);
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      } else {
        break;
      }
    }
    this.datas[0].active = true;
  }

  changeColor(index) {
    for (let i = 0; i < this.datas.length; i++) {
      if (i === index) {
        this.datas[i].active = true;
        this.listaHorariosDisponiveis(this.datas[i].date);
      } else {
        this.datas[i].active = false;
      }
    }
  }

  async listaHorariosDisponiveis(date) {
    try {
      this.agendamentoHorario.date = date;
      this.horariosDisponiveis = await this.servicesServ.listaHorariosDisponiveis(date, this.servicoEscolhido.id).toPromise();
    } catch (error) {
      this.toastServ.toastDinamicoErro(error.error.message);
    }
  }

  async agendarHorario(dto) {
    this.agendamentoHorario.hour_id = dto.id;
    this.agendamentoHorario.service_id = this.servicoEscolhido.id;

    const separarHorario = dto.hour.split(':');
    const date = new Date(this.agendamentoHorario.date);

    date.setDate(date.getDate() + 1);
    date.setHours(separarHorario[0]);
    date.setMinutes(separarHorario[1]);

    this.agendamentoHorario.date = date.toISOString();

    const { id } = await this.storage.get('user');
    try {
      const res = await this.servicesServ.agendarHorario(id, this.agendamentoHorario).toPromise();
      console.log(res);
    } catch (error) {
      this.toastServ.toastDinamicoErro(error.error.message);
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() { }
}
