import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-data-selecao',
  templateUrl: './data-selecao.component.html',
  styleUrls: ['./data-selecao.component.scss'],
})
export class DataSelecaoComponent implements OnInit {

  min: string;
  max: number;
  maxInicio: string;

  @Input() dataInicio: string;
  @Input() dataTermino: string;

  datas = { dtInicio: '', dtTermino: '' }

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.max = new Date().getFullYear() + 2;
    this.datas.dtInicio = this.dataInicio;
    this.datas.dtTermino = this.dataTermino;
  }

  filtar() {
    this.modalController.dismiss(this.datas);
  }

  setMinDate(event) {
    if (event.target.value) {
      this.min = formatDate(event.target.value, 'yyyy-MM-dd', 'pt');
    }
  }

  setMaxDate(event) {
    if (event.target.value) {
      this.maxInicio = formatDate(event.target.value, 'yyyy-MM-dd', 'pt');
    }
  }

}
