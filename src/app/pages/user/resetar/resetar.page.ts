import { Component } from '@angular/core';
import { AccessService } from '../../../services/access/access.service';
import { ToastService } from '../../../services/toast/toast.service';
import { ModalController } from '@ionic/angular';
import { ModalsComponent } from '../../../components/modals/modals.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetar',
  templateUrl: './resetar.page.html',
  styleUrls: ['./resetar.page.scss'],
})
export class ResetarPage {
  submitted: boolean;
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

  usuario: any = {};
  btnAvancarRecuperacao = true;

  public recuperarSenhaForm: any;

  constructor(private accessServ: AccessService, private toastServ: ToastService, private modalCtrl: ModalController, private formBuilder: FormBuilder) {
    this.recuperarSenhaForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]{3})$/), , Validators.required])],
    });
  }

  async resetarSenha() {
    this.btnAvancarRecuperacao = false;
    if (this.recuperarSenhaForm.valid) {
      try {
        let res = await this.accessServ.forgotPassword(this.usuario).toPromise();
        if (res) {
          this.toastServ.toastDinamicoSucesso('Foi enviado um token de verificação para o seu email.');
          this.btnAvancarRecuperacao = true;
          this.validarRecuperacaoSenha();
        }
      } catch (error) {
        this.btnAvancarRecuperacao = true;
        this.toastServ.toastDinamicoErro(error.error.message);
      }
    } else {
      this.btnAvancarRecuperacao = true;
      this.toastServ.toastDinamicoAviso('Verifique se o email está correto para que possa presseguir.')
    }
  }

  async validarRecuperacaoSenha() {
    try {
      const modal = await this.modalCtrl.create({
        component: ModalsComponent,
        componentProps: {
          tipoModal: 'resetPassword',
        }
      });

      await modal.present();
      const { data } = await modal.onDidDismiss();
      console.log(data);
      if (data) {
        this.resetPassword(data);
      }
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }

  resetPassword(dto) {
    try {
      let res = this.accessServ.resetPassword(dto).toPromise();
      if (res) {
        this.toastServ.toastDinamicoSucesso('Sucesso na recuperação de senha.')
      }
    } catch (error) {
      this.toastServ.toastDinamicoErro(error.error.message)
    }
  }
}
