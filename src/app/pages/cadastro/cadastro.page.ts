import { Component, OnInit } from '@angular/core';
import { AccessService } from '../../services/access/access.service';
import { ToastService } from '../../services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  usuario: any = {};

  constructor(private router: Router,private accessServ: AccessService, private toastServ: ToastService) { }

  async cadastro() {
    try {
      const res = await this.accessServ.cadastrarUsuario(this.usuario).toPromise();
      if (res) {
        this.router.navigateByUrl('login');
      }
    } catch (error) {
      console.error(error.error);
      this.toastServ.toastDinamicoErro(error.error.message);
    }
  }

  ngOnInit(): void {
  }

}
