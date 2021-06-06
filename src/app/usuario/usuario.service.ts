import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Usuario } from './model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private subjLogado$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private subjUsuario$: BehaviorSubject<Usuario> = new BehaviorSubject(null);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  constructor(private http: HttpClient) { }

  isLogado(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (token && !this.subjLogado$.value) {
      return this.validarToken();
    }

    return this.subjLogado$.asObservable();
  }

  getUsuario(): Observable<Usuario> {
    return this.subjUsuario$.asObservable();
  }

  validarToken(): Observable<boolean> {
    return this.http.post<Usuario>(`${environment.url}/usuario`, { headers: this.headers })
      .pipe(
        tap((u: Usuario) => {
          if (u && u.token !== undefined) {
            localStorage.setItem('token', u.token);
            this.subjLogado$.next(true);
            this.subjUsuario$.next(u);
          } else {
            throw new Error("Usuario não logado!");
          }
        }),
        map((u: Usuario) => (u) ? true : false),
        catchError((err) => {
          this.logout();
          return of(false);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.subjLogado$.next(false);
    this.subjUsuario$.next(null);
  }

  login(usuario: { cnpj: string, usuario: string, senha: string }): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.url}/login`, usuario)
      .pipe(
        tap((u: Usuario) => {
          localStorage.setItem('token', u.token);
          this.subjLogado$.next(true);
          this.subjUsuario$.next(u);
        })
      )
  }

  lembrarCnpj(guardarCnpj: boolean, cnpj: string) {
    localStorage.setItem('lembrarcnpj', (guardarCnpj ? 'S' : 'N'));
    localStorage.setItem('cnpj', (guardarCnpj ? cnpj : ''));
  }

  getCnpj(): string {
    return localStorage.getItem('cnpj');
  }

  getLembrarCnpj(): boolean {
    return localStorage.getItem('lembrarcnpj') == 'S';
  }

}
