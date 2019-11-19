import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

import { AccessService } from '../../../services/access/access.service';
import { ToastService } from '../../../services/toast/toast.service';
import { LoadingService } from '../../../services/loading/loading.service';

import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  submitted: boolean;
  keyboardIsOpen: boolean;

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

  usuario: any = { name: '', email: '', picture: { data: { url: '' } } };
  btnLogin = true;

  public loginForm: any;

  constructor(private accessServ: AccessService, private toastServ: ToastService, private router: Router, private storage: Storage, private formBuilder: FormBuilder, private loadingServ: LoadingService, private facebook: Facebook, private googlePlus: GooglePlus, private afAuth: AngularFireAuth) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]{3})$/), , Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  async  loginUsuario() {
    this.btnLogin = false;
    this.loadingServ.showLoader(30000);
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
      this.loadingServ.hideLoader();
    } catch (error) {
      this.loadingServ.hideLoader();
      this.btnLogin = true;
      this.toastServ.toastDinamicoErro('Ocorreu um erro, verifique seu Usuario/Senha.');
    }
  }

  async getUserLoggedFacebook() {
    try {
      this.loadingServ.showLoader(30000);
      let response = await this.facebook.login(['public_profile', 'email']);
      if (response.status === 'connected') {
        this.usuario = await this.facebook.api('/' + response.authResponse.userID + '/?fields=email,name,picture', ['public_profile']);
        this.usuario.alias = 'FACEBOOK';
        this.usuario.role_id = 1;

        delete this.usuario.id;
        await this.storage.set('avatar', this.usuario.picture.data.url);
        await this.loginAlternative();
      } else {
        this.toastServ.toastDinamicoErro('Ocorreu um erro ao tentar logar com o Facebook');
      }
    } catch (e) {
      this.loadingServ.hideLoader();
      this.toastServ.toastDinamicoErro('Ocorreu um erro ao tentar logar.');
    };
  }

  async getUserLoggedGoogle() {
    try {
      this.loadingServ.showLoader(30000);
      let gplusUser = await this.googlePlus.login({
        'webClientId': '766636459443-g1jplo64mp5c5n7b2k1dar4nfl48dl3d.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      });

      const { user } = await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken));
      this.usuario.name = user.displayName;
      this.usuario.email = user.email;
      this.usuario.alias = 'GOOGLE';
      this.usuario.role_id = 1;
      await this.storage.set('avatar', user.photoURL);
      await this.loginAlternative();
    } catch (error) {
      this.loadingServ.hideLoader();
      this.toastServ.toastDinamicoErro('Ocorreu um erro ao tentar logar.');
    }
  }

  async loginAlternative() {
    try {
      const res = await this.accessServ.loginAlternativo(this.usuario).toPromise();
      if (res) {
        let { user, token }: any = res;

        await this.storage.set('token', token);
        await this.storage.set('user', user);

        user.userRoles.map(role => {
          if (role.is_actived === 1 && role.role_id === 2) {
            this.router.navigateByUrl('tabs/agendamentos');
          } else if (role.is_actived === 1 && role.role_id === 1) {
            this.router.navigateByUrl('tabs/servicos');
          }
        })
        this.loadingServ.hideLoader();
      }
    } catch (error) {
      this.loadingServ.hideLoader();
      this.toastServ.toastDinamicoErro('Ocorreu um erro ao tentar logar');
    }
  }


  async loginWithTwitter() {
    alert('logou');
  }
}
