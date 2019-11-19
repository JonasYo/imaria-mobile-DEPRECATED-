import { Component } from '@angular/core';
import { ToastService } from '../../../services/toast/toast.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})

export class CadastroPage {
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

  usuario: any = {
    'role_id': 1,
  };

  btnCadastro = true;

  public cadastroForm: any;

  constructor(private router: Router, private userServ: UserService, private toastServ: ToastService, private formBuilder: FormBuilder, private storage: Storage) {
    this.cadastroForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.pattern('^[a-zA-Z]+$'), Validators.required])],
      dateBirth: ['', Validators.compose([Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/), Validators.required])],
      phone: ['', Validators.compose([Validators.minLength(14), Validators.maxLength(15), Validators.required])],
      email: ['', Validators.compose([Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]{3})$/), , Validators.required])],
      password: ['', Validators.compose([Validators.minLength(4), Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.minLength(4), Validators.required])]
    });
  }

  async cadastro() {
    this.btnCadastro = false;
    if (this.cadastroForm.valid) {
      try {
        const res = await this.userServ.cadastrarUsuario(this.usuario).toPromise();
        if (res) {
          this.toastServ.toastDinamicoSucesso('Cadastro realizado com sucesso.');
          this.router.navigateByUrl('login');
        }
        this.btnCadastro = true;
      } catch (error) {
        this.btnCadastro = true;
        this.toastServ.toastDinamicoErro(error.error.message);
      }
    } else {
      this.btnCadastro = true;
      this.toastServ.toastDinamicoAviso('Verifique os dados informados para que possa presseguir.');
    }
  }
}
