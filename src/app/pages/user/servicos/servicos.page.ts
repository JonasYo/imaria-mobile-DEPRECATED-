import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MarcarHorarioComponent } from '../../../components/marcar-horario/marcar-horario.component';
import { ServicosService } from '../../../services/servicos/servicos.service';
import { ToastService } from '../../../services/toast/toast.service';
import { LoadingService } from '../../../services/loading/loading.service';

@Component({
  selector: 'app-servicos',
  templateUrl: 'servicos.page.html',
  styleUrls: ['servicos.page.scss']
})
export class ServicosPage {
  imgLogo = '../../assets/images/imaria-horizontal.png';

  servicos: any = [];
  datas: any = [];
  dias = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

  constructor(private modalCtrl: ModalController, private servicesServ: ServicosService, private toastServ: ToastService,
    private loadingServ: LoadingService) {
    this.listarServicos();
  }

  async listarServicos() {
    await this.loadingServ.showLoader(3000);
    try {
      this.servicos = await this.servicesServ.listarServicos().toPromise();
      if (this.servicos) {
        await this.loadingServ.hideLoader();
      }
    } catch (error) {
      await this.loadingServ.hideLoader();
      this.toastServ.toastDinamicoErro(error.error.message);
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
      this.toastServ.toastDinamicoErro(error.error.message);
    }
  }
}
