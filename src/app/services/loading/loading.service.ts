import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loaderToShow: any;

  constructor(public loadingCtrl: LoadingController) { }

  async showLoader(duracao: any) {
    this.loaderToShow = await this.loadingCtrl.create({
      spinner: 'lines',
      message: 'Carregando',
      cssClass: 'custom-loader-class',
      duration: duracao
    }).then(async (res) => {
      await res.present();
    });
  }

  async hideLoader() {
    await this.loadingCtrl.dismiss();
    console.log('Loading dismissed!');
  }
}
