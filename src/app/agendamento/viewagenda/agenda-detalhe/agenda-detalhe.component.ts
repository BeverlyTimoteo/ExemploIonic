import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { Evento } from '../../model/Evento';
import { EventoService } from '../../service/evento.service';

@Component({
  selector: 'app-agenda-detalhe',
  templateUrl: './agenda-detalhe.component.html',
  styleUrls: ['./agenda-detalhe.component.scss'],
})
export class AgendaDetalheComponent implements OnInit {

  @Input() evento: Evento;
  imagem: string;

  constructor(
    private modalController: ModalController,
    private eventoService: EventoService
  ) { }

  ngOnInit() {
    this.getImagem();
  }

  fechar() {
    this.modalController.dismiss();
  }

  getImagem() {
    this.eventoService.getImagemEvento(this.evento.id_evento)
      .pipe(take(1))
      .subscribe(
        dados => {
          if (dados.length > 0) {
            this.imagem = "data:image/jpeg;base64," + dados[0].imagem;
          }
        }, err => {
          console.log('Erro ao obter imagem do agendamento!');
        }
      );
  }

  getTamanho(obs: string) {
    return obs && obs.length > 100 ? 6 : 2;
  }

}
