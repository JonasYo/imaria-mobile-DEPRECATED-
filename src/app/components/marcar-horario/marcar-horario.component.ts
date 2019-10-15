import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-marcar-horario',
  templateUrl: './marcar-horario.component.html',
  styleUrls: ['./marcar-horario.component.scss'],
})
export class MarcarHorarioComponent implements OnInit {

  servicos: any = [
    { diaDaSemana: 'TER', data: '24/09' },
    { diaDaSemana: 'TER', data: '24/09' },
    { diaDaSemana: 'TER', data: '24/09' },
    { diaDaSemana: 'TER', data: '24/09' },
    { diaDaSemana: 'TER', data: '24/09' },
    { diaDaSemana: 'TER', data: '24/09' }
  ];

  constructor(private modalCtrl: ModalController) { }

  changeColor(index) {
    for (let i = 0; i < this.servicos.length; i++) {
      if (i === index) {
        this.servicos[i].active = true;
      } else {
        this.servicos[i].active = false;
      }
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() { }

}
