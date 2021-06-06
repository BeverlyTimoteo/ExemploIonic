import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../model/Evento';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(private http: HttpClient) { }

  getEventoUsuario(parametro: { view: string, dtInicio: string, dtTermino: string }): Observable<Evento[]> {
    return this.http.post<Evento[]>(`${environment.url}/eventousuario`, parametro);
  }

  getImagemEvento(id_evento: number): Observable<[{ imagem: string }]> {
    return this.http.get<[{ imagem: string }]>(`${environment.url}/eventousuario/imagem/${id_evento}`);
  }

}
