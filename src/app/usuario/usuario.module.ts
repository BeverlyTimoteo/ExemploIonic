import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioInterceptor } from './usuario.interceptor';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule {

  static forRoot(): ModuleWithProviders<UsuarioModule> {
    return {
      ngModule: UsuarioModule,
      providers: [{ provide: UsuarioInterceptor }]
    }
  }
}
