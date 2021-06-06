import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Evento } from '../model/Evento';
import { AgendaDetalheComponent } from './agenda-detalhe/agenda-detalhe.component';

interface Item {
  data: string;
  evento: Evento[];
}

@Component({
  selector: 'viewagenda',
  templateUrl: './viewagenda.component.html',
  styleUrls: ['./viewagenda.component.scss'],
})
export class ViewagendaComponent implements OnInit {

  @Input() dados: BehaviorSubject<Evento[]>;
  @Input() subjectBusca: BehaviorSubject<string>;

  private unsubsBusca: Subject<void> = new Subject<void>();
  private unsubsDados: Subject<void> = new Subject<void>();

  eventos: [Item];
  eventosClone: [Item];

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.dados.pipe(
      takeUntil(this.unsubsDados)
    ).subscribe(
      evento => {
        if (this.eventosClone) {
          this.eventosClone.splice(0, this.eventosClone.length);
        }

        if (this.eventos) {
          this.eventos.splice(0, this.eventos.length);
        }

        let dt: string;

        if (evento) {
          evento.forEach(value => {
            dt = this.formatarData(value.inicio);

            if (!this.eventos) {
              this.eventos = [{ data: dt, evento: [value] }]

            } else {
              let index = this.eventos.findIndex(item => item.data == dt);

              if (index !== -1) {
                this.eventos[index].evento.push(value);
              } else {
                this.eventos.push({ data: dt, evento: [value] });
              }
            }
          });

          if (this.eventos) {
            this.eventosClone = [...this.eventos]
          }
        }
      }
    );

    this.subjectBusca.pipe(
      takeUntil(this.unsubsBusca)
    ).subscribe(
      dados => {
        if (this.eventos) {
          if (dados !== '') {
            this.eventos.splice(0, this.eventos.length);

            this.eventosClone.forEach(
              item => {
                let lista = item.evento.filter(evento => {
                  return (evento.descricao_evento && evento.descricao_evento.toUpperCase().includes(dados.toUpperCase())) ||
                    (evento.cliente && evento.cliente.toUpperCase().includes(dados.toUpperCase())) ||
                    (evento.telefone && evento.telefone.toUpperCase().includes(dados.toUpperCase())) ||
                    (evento.celular && evento.celular.toUpperCase().includes(dados.toUpperCase()));
                });

                if (lista.length > 0) {
                  this.eventos.push({ data: item.data, evento: lista });
                }
              }
            )
          } else {
            this.eventos = [...this.eventosClone];
          }
        }
      }
    );
  }

  ngOnDestroy() {
    this.unsubsBusca.next();
    this.unsubsBusca.complete();

    this.unsubsDados.next();
    this.unsubsDados.complete();
  }

  formatarData(data: string | Date): string {
    return formatDate(data, "dd/MM/yyyy", "pt");
  }

  async detalhar(evento: Evento) {
    const modal = await this.modalController.create({
      component: AgendaDetalheComponent,
      componentProps: {
        'evento': evento
      }
    });

    return await modal.present();
  }
}
