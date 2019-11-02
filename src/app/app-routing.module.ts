import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './pages/global/login/login.module#LoginPageModule' },
  { path: 'cadastro', loadChildren: './pages/user/cadastro/cadastro.module#CadastroPageModule' },
  { path: 'resetar', loadChildren: './pages/user/resetar/resetar.module#ResetarPageModule' },
  { path: 'enviar-publicacao', loadChildren: './pages/manager/enviar-publicacao/enviar-publicacao.module#EnviarPublicacaoPageModule' },
  { path: 'ajuda', loadChildren: './pages/global/ajuda/ajuda.module#AjudaPageModule' },
  { path: 'agenda', loadChildren: './pages/user/agenda/agenda.module#AgendaPageModule' },
  { path: 'agendamentos', loadChildren: './pages/manager/agendamentos/agendamentos.module#AgendamentosPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
