import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-opcoes',
  templateUrl: 'opcoes.page.html',
  styleUrls: ['opcoes.page.scss']
})
export class OpcoesPage {
  selectedTab = 'conta';

  imgLogo = '../../../assets/icon/imaria-logo.png';
  roseGoldBackground = '../../../assets/images/rose-gold.jpg';

  constructor(public nav: NavController) { }

  redirecionarPage() {
    // this.nav.push('')
  }

}
