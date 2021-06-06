import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentoComponent } from './agendamento.component';
import { AgendaUsuarioComponent } from './agendausuario/agendausuario.component';
import { BemVindoComponent } from './bem-vindo/bem-vindo.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'agenda/inicio' },
    {
        path: 'agenda', component: AgendamentoComponent,
        children: [
            { path: 'inicio', component: BemVindoComponent },
            { path: 'usuario', component: AgendaUsuarioComponent }
        ]
    }    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AgendamentoRoutingModule { }