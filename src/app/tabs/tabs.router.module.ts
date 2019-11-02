import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/global/login/login.module').then(m => m.LoginPageModule)
          }
        ]
      },
      {
        path: 'cadastro',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/user/cadastro/cadastro.module').then(m => m.CadastroPageModule)
          }
        ]
      },
      {
        path: 'resetar',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/user/resetar/resetar.module').then(m => m.ResetarPageModule)
          }
        ]
      },
      {
        path: 'servicos',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/user/servicos/servicos.module').then(m => m.ServicosPageModule)
          }
        ]
      },
      {
        path: 'feed',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/user/feed/feed.module').then(m => m.FeedPageModule)
          }
        ]
      },
      {
        path: 'opcoes',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/global/opcoes/opcoes.module').then(m => m.OpcoesPageModule)
          }
        ]
      },
      {
        path: 'agendamentos',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/manager/agendamentos/agendamentos.module').then(m => m.AgendamentosPageModule)
          }
        ]
      },
      {
        path: 'enviar/publicacao',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/manager/enviar-publicacao/enviar-publicacao.module').then(m => m.EnviarPublicacaoPageModule)
          }
        ]
      }, {
        path: 'ajuda',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/global/ajuda/ajuda.module').then(m => m.AjudaPageModule)
          }
        ]
      },
      {
        path: 'agenda',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/user/agenda/agenda.module').then(m => m.AgendaPageModule)
          }
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
