import { Component } from '@angular/core';
import { NavController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../services/user/user.service';
import { ToastService } from '../../services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opcoes',
  templateUrl: 'opcoes.page.html',
  styleUrls: ['opcoes.page.scss']
})
export class OpcoesPage {
  selectedTab = 'perfil';

  user: any = {};
  userInfomation: any = {};
  passwordUser: any = {};

  constructor(public nav: NavController, private router: Router, private events: Events, private storage: Storage,
    private toastServ: ToastService, private userServ: UserService) {
    this.getInformacoesUsuario();
  }

  async getInformacoesUsuario() {
    this.user = await this.storage.get('user');
    this.userInfomation = JSON.parse(JSON.stringify(this.user));
  }

  logout() {
    this.events.publish('logout');
  }

  async alterarSenha() {
    console.table(this.passwordUser);
    if (this.passwordUser.password === this.passwordUser.passwordConfirmation) {
      try {
        const res = await this.userServ.alterarDadosUsuario('userPassword', this.passwordUser).toPromise();
        if (res) {
          this.router.navigateByUrl('tabs/servicos');
          this.toastServ.toastDinamicoSucesso('Senha alterada com sucesso');
        }
      } catch (error) {
        this.toastServ.toastDinamicoErro(error.error.message);
      }
    } else {
      this.toastServ.toastDinamicoAviso('Senhas informadas não são iguais');
    }
  }

  async alterarInformacoesUsuario() {
    try {
      const res = await this.userServ.alterarDadosUsuario('userInfomation', this.userInfomation).toPromise();
      if (res) {
        await this.storage.set('user', res);
        await this.getInformacoesUsuario();
        this.toastServ.toastDinamicoSucesso('Alteração realizada com sucesso');
      }
    } catch (error) {
      this.toastServ.toastDinamicoErro(error.error.message);
    }
  }
}
