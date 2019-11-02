import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EnviarPublicacaoPage } from './enviar-publicacao.page';

const routes: Routes = [
  {
    path: '',
    component: EnviarPublicacaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EnviarPublicacaoPage]
})
export class EnviarPublicacaoPageModule {}
