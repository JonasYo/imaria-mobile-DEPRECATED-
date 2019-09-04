import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'cadastro', loadChildren: './pages/cadastro/cadastro.module#CadastroPageModule' },
  { path: 'resetar', loadChildren: './pages/resetar/resetar.module#ResetarPageModule' },
  { path: 'visualizar-agenda', loadChildren: './pages/visualizar-agenda/visualizar-agenda.module#VisualizarAgendaPageModule' },
  { path: 'enviar-publicacao', loadChildren: './pages/enviar-publicacao/enviar-publicacao.module#EnviarPublicacaoPageModule' },
  { path: 'ajuda', loadChildren: './pages/ajuda/ajuda.module#AjudaPageModule' },
  { path: 'sobre', loadChildren: './pages/sobre-nos/sobre-nos.module#SobreNosPageModule' },
  { path: 'historico-agenda', loadChildren: './pages/historico-agenda/historico-agenda.module#HistoricoAgendaPageModule' },
  { path: 'conta', loadChildren: './pages/conta/conta.module#ContaPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
