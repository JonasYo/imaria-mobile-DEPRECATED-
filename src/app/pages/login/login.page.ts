import { Component, OnInit } from '@angular/core';
import { AccessService } from '../../services/access/access.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';
import { Storage } from '@ionic/storage';
import { LoadingService } from '../../services/loading/loading.service';

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
  btnLogin = true;

  constructor(private accessServ: AccessService, private toastServ: ToastService, private router: Router, private storage: Storage, private loadingServ: LoadingService) { }

  ngOnInit() {
  }

  async  loginUsuario() {
    this.btnLogin = false;
    try {
      const res = await this.accessServ.loginUsuario(this.usuario).toPromise();
      if (res) {
        await this.storage.set('token', res.token);
        await this.storage.set('user', res.user);
        this.btnLogin = true;
        this.router.navigateByUrl('tabs/servicos');
      }
    } catch (error) {
      this.btnLogin = true;
      this.toastServ.toastDinamicoErro('Ocorreu um erro, verifique seu Usuario/Senha.');
    }
  }

  async loginWithFacebook() {
    alert('logou');
  }

  async loginWithIntagram() {
    alert('logou');
  }

  async loginWithGoogle() {
    alert('logou');
  }

  async loginWithTwitter() {
    alert('logou');
  }
}
