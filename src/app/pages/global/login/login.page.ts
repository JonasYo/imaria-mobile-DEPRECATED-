import { Component } from '@angular/core';
import { AccessService } from '../../../services/access/access.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast/toast.service';
import { Storage } from '@ionic/storage';
import { LoadingService } from '../../../services/loading/loading.service';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  facebookIcon = '../../../assets/icon/facebook.png';
  instagramIcon = '../../../assets/icon/instagram.png';
  googleIcon = '../../../assets/icon/google.png';
  twitterIcon = '../../../assets/icon/twitter.png';

  validationMessage = {
    name: [
      { type: 'required', message: 'Nome é obrigadorio.' },
      { type: 'pattern', message: 'Seu nome não pode conter números.' },
    ],
    dateBirth: [
      { type: 'required', message: 'Data de nascimento é obrigatório.' },
      { type: 'pattern', message: 'Data de nascimento inválida.' },
    ],
    phone: [
      { type: 'required', message: 'Telefone é obrigatório.' },
      { type: 'minlength', message: 'Telefone inválido.' },
    ],
    email: [
      { type: 'required', message: 'Email é obrigatório.' },
      { type: 'pattern', message: 'Email inválido.' },
    ],
    password: [
      { type: 'required', message: 'Senha é obrigatório.' },
      { type: 'minlength', message: 'A senha deve ter mais que 4 caracteres.' },
    ],
    confirmPassword: [
      { type: 'required', message: 'Confirmar a senha é obrigatório.' },
      { type: 'minlength', message: 'A senha deve ter mais que 4 caracteres.' },
    ]
  }

  usuario: any = { id: '', name: '', email: '', picture: { data: { url: '' } } };
  btnLogin = true;

  public loginForm: any;

  constructor(private accessServ: AccessService, private toastServ: ToastService, private router: Router, private storage: Storage, private formBuilder: FormBuilder, private loadingServ: LoadingService, private fb: Facebook) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]{3})$/), , Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  async  loginUsuario() {
    this.btnLogin = false;
    try {
      const res = await this.accessServ.loginUsuario(this.usuario).toPromise();
      if (res) {
        await this.storage.set('token', res.token);
        await this.storage.set('user', res.user);
        this.btnLogin = true;
        res.user.userRoles.map(role => {
          if (role.is_actived === 1 && role.role_id === 2) {
            this.router.navigateByUrl('tabs/agendamentos');
          } else if (role.is_actived === 1 && role.role_id === 1) {
            this.router.navigateByUrl('tabs/servicos');
          }
        })
      }
    } catch (error) {
      this.btnLogin = true;
      this.toastServ.toastDinamicoErro('Ocorreu um erro, verifique seu Usuario/Senha.');
    }
  }

  async loginWithFacebook() {
    try {
      let response = await this.fb.login(['public_profile', 'email']);
      if (response.status === 'connected') {
        this.usuario = await this.fb.api('/' + response.authResponse.userID + '/?fields=id,email,name,picture', ['public_profile']);
        this.usuario.alias = 'FACEBOOK';
        this.usuario.role_id = 1;

        const res = await this.accessServ.loginAlternativo(this.usuario).toPromise();

        if (res) {
          this.toastServ.toastDinamicoSucesso('Sucesso ao logar com o Facebook');
          let { user, token }: any = res;
          await this.storage.set('token', token);
          await this.storage.set('avatar', this.usuario.data.url);
          await this.storage.set('user', user);

          user.userRoles.map(role => {
            if (role.is_actived === 1 && role.role_id === 2) {
              this.router.navigateByUrl('tabs/agendamentos');
            } else if (role.is_actived === 1 && role.role_id === 1) {
              this.router.navigateByUrl('tabs/servicos');
            }
          })
        }
      } else {
        this.toastServ.toastDinamicoErro('Ocorreu um erro ao tentar logar com o Facebook');
      }
    } catch (e) {
      alert(JSON.stringify(e))
      this.toastServ.toastDinamicoErro('Ocorreu um erro ao tentar logar.');
    };
  }

  async loginWithGoogle() {
    alert('logou');
  }

  async loginWithTwitter() {
    alert('logou');
  }
}
