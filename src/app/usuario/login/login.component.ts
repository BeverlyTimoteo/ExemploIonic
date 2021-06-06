import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { IonRouterOutlet, NavController, Platform, ToastController } from '@ionic/angular';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../usuario.service';

const { App } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    'cnpj': ['', [Validators.required, Validators.maxLength(14)]],
    'usuario': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    'senha': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    'guardar': ['false']
  });

  loading: boolean = false;
  
  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private toastController: ToastController,
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
    this.loginForm.patchValue({
      cnpj: this.usuarioService.getCnpj(), 
      guardar: this.usuarioService.getLembrarCnpj()
    });
  }

  onSubmit() {
    const login = this.loginForm.value;
    this.loading = true;

    this.usuarioService.login(login)
      .subscribe(
        (usuario: Usuario) => {
          this.usuarioService.lembrarCnpj(login.guardar, login.cnpj);

          this.mensagemToast('Bem-vindo ', usuario.nome);
          this.navCtrl.navigateRoot('/');
          this.loading = false;
        },
        (err) => {
          this.mensagemToast('=( algum erro ocorreu, verifique as informações de login!');
          this.loading = false;
        }
      )
  }

  async mensagemToast(msg: string, nome?: string) {
    const toast = await this.toastController.create({
      message: msg + (nome == undefined ? "" : nome),
      duration: 2000
    });

    toast.present();
  }
}
