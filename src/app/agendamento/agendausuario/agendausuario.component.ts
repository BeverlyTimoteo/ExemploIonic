import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { FiltroComponent } from '../filtro/filtro.component';
import { Evento } from '../model/Evento';
import { EventoService } from '../service/evento.service';
import { DataSelecaoComponent } from './data-selecao/data-selecao.component';

@Component({
  selector: 'app-agendausuario',
  templateUrl: './agendausuario.component.html',
  styleUrls: ['./agendausuario.component.scss'],
})
export class AgendaUsuarioComponent implements OnInit {

  titulo: string;

  parametros: {
    view: string;
    dtInicio: string;
    dtTermino: string
  };

  dados: BehaviorSubject<Evento[]> = new BehaviorSubject<Evento[]>([]);
  subjBusca: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private eventoService: EventoService,
    private route: ActivatedRoute,
    private popoverController: PopoverController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.route.queryParams
      .pipe(
        tap(p => {
          this.parametros = { view: p.view, dtInicio: '', dtTermino: '' };

          if (p.view == 'user') {
            this.titulo = 'Meus Agendamentos'

          } else {
            this.titulo = 'Agendamentos'
          }

          this.consultar();
        })
      ).subscribe();
  }

  consultar() {
    this.eventoService.getEventoUsuario(this.parametros)
      .pipe(take(1))
      .subscribe(lista => this.dados.next(lista))
  }

  changeBusca(evento: any) {
    this.subjBusca.next(evento.target.value);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: FiltroComponent,
      event: ev,
      translucent: true,
      animated: true
    });

    popover.onDidDismiss().then(e => {
      if (e.data && e.data.option == 'Por Data') {
        this.presentModal();
      }
    });

    return await popover.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: DataSelecaoComponent,
      cssClass: 'class-modal',
      componentProps: {
        'dataInicio': this.parametros?.dtInicio,
        'dataTermino': this.parametros?.dtTermino
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      if (data.dtInicio !== '')
        this.parametros.dtInicio = formatDate(data.dtInicio, 'yyyy-MM-dd', 'pt');

      if (data.dtTermino !== '')
        this.parametros.dtTermino = formatDate(data.dtTermino, 'yyyy-MM-dd', 'pt');

      this.consultar();
    }
  }

}
