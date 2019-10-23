import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastCtrl: ToastController) { }

  async toastDinamicoSucesso(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      showCloseButton: true,
      closeButtonText: 'Fechar',
      color: 'success',
    });
    toast.present();
  }

  async toastDinamicoErro(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      showCloseButton: true,
      closeButtonText: 'Fechar',
      color: 'danger',
    });
    toast.present();
  }

  async toastDinamicoAviso(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      showCloseButton: true,
      closeButtonText: 'Fechar',
      color: 'warning',
    });
    toast.present();
  }
}
