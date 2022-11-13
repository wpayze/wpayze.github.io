import { Injectable } from '@angular/core';
import { Consulta } from '../compartido/consulta';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../compartido/baseurl';
import { HttpHeaders } from '@angular/common/http';
import { ProcesaHTTPMsjService } from './procesa-httpmsj.service';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  constructor(
    private http: HttpClient,
    private procesaHttpmsjService: ProcesaHTTPMsjService
  ) {}

  enviarConsulta(consulta: Consulta): Observable<Consulta> {
    return this.http
      .post<Consulta>(baseURL + 'consultas/', consulta, httpOptions)
      .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }
}
