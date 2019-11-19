import { Component } from '@angular/core';
import { NavController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../../services/user/user.service';
import { ToastService } from '../../../services/toast/toast.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-opcoes',
  templateUrl: 'opcoes.page.html',
  styleUrls: ['opcoes.page.scss']
})
export class OpcoesPage {
  submitted: boolean;
  selectedTab = 'perfil';

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

  user: any = {};
  userInfomation: any = {};
  passwordUser: any = {};

  btnAtualizar: boolean = true;

  public userInfomationForm: any;
  public changePasswordForm: any;

  constructor(public nav: NavController, private router: Router, private events: Events, private storage: Storage,
    private toastServ: ToastService, private userServ: UserService, private formBuilder: FormBuilder) {
    this.getInformacoesUsuario();

    this.userInfomationForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.pattern('^[a-zA-Z]+$'), Validators.required])],
      dateBirth: ['', Validators.compose([Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/), Validators.required])],
      phone: ['', Validators.compose([Validators.minLength(14), Validators.maxLength(15), Validators.required])],
    });
    this.changePasswordForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required])],
      newPassword: ['', Validators.compose([Validators.minLength(4), Validators.required])],
      confirmNewPassword: ['', Validators.compose([Validators.minLength(4), Validators.required])]
    });
  }

  async getInformacoesUsuario() {
    this.user = await this.storage.get('user');
    this.user.avatar = await this.storage.get('avatar');
    this.userInfomation = JSON.parse(JSON.stringify(this.user));
  }

  logout() {
    this.events.publish('logout');
  }

  async alterarSenha() {
    this.btnAtualizar = false;
    if (this.changePasswordForm.valid && this.passwordUser.password === this.passwordUser.passwordConfirmation) {
      try {
        const res = await this.userServ.alterarDadosUsuario('userPassword', this.passwordUser).toPromise();
        if (res) {
          this.router.navigateByUrl('tabs/servicos');
          this.toastServ.toastDinamicoSucesso('Senha alterada com sucesso');
        }
      } catch (error) {
        this.toastServ.toastDinamicoErro(error.error.message);
      }
      this.btnAtualizar = true;
    } else {
      this.btnAtualizar = true;
      this.toastServ.toastDinamicoAviso('Verifique os dados informados e se as senhas informadas são iguais.');
    }
  }

  async alterarInformacoesUsuario() {
    this.btnAtualizar = false;
    if (this.userInfomationForm.valid) {
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
      this.btnAtualizar = true;
    } else {
      this.btnAtualizar = true;
      this.toastServ.toastDinamicoAviso('Verifique os dados informados para que possa presseguir.');
    }
  }
}
