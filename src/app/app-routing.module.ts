import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { UsuarioGuardService } from './usuario/usuario-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'agendamento' },
  { path: 'agendamento', loadChildren: () => import('./agendamento/agendamento.module').then(m => m.AgendamentoModule), canActivate: [UsuarioGuardService] },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  { path: '**', component: PaginaNaoEncontradaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
