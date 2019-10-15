import { Component } from '@angular/core';
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
  servicos = [
    { id: 2174298, nome: ' Sobrancelhas', duracaoEmMinutos: 30, preco: 40.0, idPrecoTipo: 1 },
    { id: 2155279, nome: 'Design de Sobrancelha', duracaoEmMinutos: 30, preco: 60.0, idPrecoTipo: 1 },
    { id: 2174315, nome: 'Maquiagem Social com Cílios', duracaoEmMinutos: 90, preco: 130.0, idPrecoTipo: 1 },
    { id: 2174313, nome: 'Design Sobrancelha + Buço', duracaoEmMinutos: 60, preco: 80.0, idPrecoTipo: 1 },
    { id: 2222814, nome: 'Sobrancelhas + Buço', duracaoEmMinutos: 30, preco: 55.0, idPrecoTipo: 1 },
    { id: 2237154, nome: 'Penteado', duracaoEmMinutos: 60, preco: 140.0, idPrecoTipo: 1 }
  ];

  constructor(private modalCtrl: ModalController, private servicesServ: ServicosService, private toastServ: ToastService) {
    this.listarServicos();
  }

  async listarServicos() {
    try {
      const res = await this.servicesServ.listarServicos().toPromise();
      console.log(res);
    } catch (error) {
      console.log(error);
      this.toastServ.toastDinamicoErro(error.error.message);
    }
  }

  async agendarHorario() {
    try {
      const modal = await this.modalCtrl.create({
        component: MarcarHorarioComponent
      });
      await modal.present();
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }
}
