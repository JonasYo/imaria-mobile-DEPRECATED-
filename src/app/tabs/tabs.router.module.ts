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
              import('../pages/login/login.module').then(m => m.LoginPageModule)
          }
        ]
      },
      {
        path: 'cadastro',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/cadastro/cadastro.module').then(m => m.CadastroPageModule)
          }
        ]
      },
      {
        path: 'resetar',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/resetar/resetar.module').then(m => m.ResetarPageModule)
          }
        ]
      },
      {
        path: 'servicos',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/servicos/servicos.module').then(m => m.ServicosPageModule)
          }
        ]
      },
      {
        path: 'feed',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/feed/feed.module').then(m => m.FeedPageModule)
          }
        ]
      },
      {
        path: 'opcoes',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/opcoes/opcoes.module').then(m => m.OpcoesPageModule)
          }
        ]
      },
      {
        path: 'enviar/publicacao',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/enviar-publicacao/enviar-publicacao.module').then(m => m.EnviarPublicacaoPageModule)
          }
        ]
      }, {
        path: 'ajuda',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/ajuda/ajuda.module').then(m => m.AjudaPageModule)
          }
        ]
      },
      {
        path: 'sobre',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/sobre-nos/sobre-nos.module').then(m => m.SobreNosPageModule)
          }
        ]
      },
      {
        path: 'agenda',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/agenda/agenda.module').then(m => m.AgendaPageModule)
          }
        ]
      },
      {
        path: 'conta',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/conta/conta.module').then(m => m.ContaPageModule)
          }
        ]
      }
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
