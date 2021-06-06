import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss'],
})
export class FiltroComponent implements OnInit {

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() { }

  async dismissPopover(opcao) {
    await this.popoverController.dismiss(opcao);
  }

}
