import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentoRoutingModule } from './agendamento-routing.module';
import { AgendaUsuarioComponent } from './agendausuario/agendausuario.component';
import { AgendamentoComponent } from './agendamento.component';
import { IonicModule } from '@ionic/angular';
import { ViewagendaComponent } from './viewagenda/viewagenda.component';
import { BemVindoComponent } from './bem-vindo/bem-vindo.component';
import { DataSelecaoComponent } from './agendausuario/data-selecao/data-selecao.component';
import { FormsModule } from '@angular/forms';
import { FiltroComponent } from './filtro/filtro.component';
import { AgendaDetalheComponent } from './viewagenda/agenda-detalhe/agenda-detalhe.component';

@NgModule({
  declarations: [
    AgendamentoComponent,
    AgendaUsuarioComponent,
    ViewagendaComponent,
    BemVindoComponent,
    DataSelecaoComponent,
    FiltroComponent,
    AgendaDetalheComponent
  ],
  imports: [
    CommonModule,
    AgendamentoRoutingModule,
    FormsModule,
    IonicModule.forRoot(),
  ]
})
export class AgendamentoModule { }
