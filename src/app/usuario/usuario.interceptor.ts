import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UsuarioService } from './usuario.service';
import { throwError } from 'rxjs';
import { NavController } from '@ionic/angular';

@Injectable()
export class UsuarioInterceptor implements HttpInterceptor {

    constructor(
        private usuarioService: UsuarioService,
        private navCtrl: NavController
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (localStorage.getItem('token')) {
            let token = localStorage.getItem('token');
            const authReq = req.clone({
                setHeaders: {
                    Authorization: token
                }
            });

            return next.handle(authReq)
                .pipe(catchError((error) => {
                    if (error instanceof HttpErrorResponse) {
                        if (error.status === 401) {
                            this.usuarioService.logout();
                            this.navCtrl.navigateRoot('/usuario/login');
                        }
                    }
                    return throwError(error);
                }));
        }

        return next.handle(req);
    }

}