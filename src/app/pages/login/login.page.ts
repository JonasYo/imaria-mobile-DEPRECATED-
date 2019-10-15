import { Component, OnInit } from '@angular/core';
import { AccessService } from '../../services/access/access.service';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  facebookIcon = '../../../assets/icon/facebook.svg';
  instagramIcon = '../../../assets/icon/instagram.png';
  googleIcon = '../../../assets/icon/google.svg';
  twitterIcon = '../../../assets/icon/twitter.png';

  usuario: any = {};

  constructor(private accessServ: AccessService, private toastServ: ToastService, private router: Router) { }

  ngOnInit() {
  }

  async  loginUsuario() {
    try {
      const res = await this.accessServ.loginUsuario(this.usuario).toPromise();
      if (res) {
        this.router.navigateByUrl('tabs/servicos');
      }
    } catch (error) {
      this.toastServ.toastDinamicoErro('Ocorreu um erro, verifique seu Usuario/Senha.');
    }
  }
}
