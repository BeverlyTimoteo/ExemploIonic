import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { IonRouterOutlet, NavController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../usuario/model/usuario';
import { UsuarioService } from '../usuario/usuario.service';

const { App } = Plugins;

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss'],
})
export class AgendamentoComponent implements OnInit {

  selectedIndex = -1;
  logado$: Observable<boolean>;
  usuario$: Observable<Usuario>;

  appPages = [
    { title: 'Meus Agendamentos', url: '/agendamento/agenda/usuario', icon: 'calendar-clear', param: { view: 'user' } },
    { title: 'Agendamentos', url: '/agendamento/agenda/usuario', icon: 'calendar', param: { view: 'job' } }
  ];

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    this.logado$ = this.usuarioService.isLogado();
    this.usuario$ = this.usuarioService.getUsuario();
  }

  getEmpresaUsuarioLogado(): Observable<string> {
    return this.usuario$.pipe(
      map((u) => u?.empresas_usuario?.find(emp => emp.id = u.id_empresa)?.razao)
    );
  }

  logout() {
    this.usuarioService.logout();
    this.navCtrl.navigateRoot("/usuario/login");
  }

}
