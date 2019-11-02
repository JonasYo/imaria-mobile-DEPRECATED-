import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss'],
})

export class ModalsComponent implements OnInit {
  tipoModal: any;
  servicoEscolhido: any;
  informacaoAgendamento: any;
  resetPass: any = {};

  constructor(private navParams: NavParams, private modalCtrl: ModalController) {
    this.tipoModal = this.navParams.get('tipoModal');
    this.servicoEscolhido = this.navParams.get('servicoEscolhido');
    this.informacaoAgendamento = this.navParams.get('informacaoAgendamento');
  }

  ngOnInit() { }

  returnModal(dto) {
    this.modalCtrl.dismiss(dto);
  }
}
