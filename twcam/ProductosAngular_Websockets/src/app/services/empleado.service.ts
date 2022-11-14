import { Injectable } from '@angular/core';
import { Empleado } from '../compartido/empleado';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../compartido/baseurl';
import { catchError } from 'rxjs/operators';
import { ProcesaHTTPMsjService } from './procesa-httpmsj.service';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor(
    private http: HttpClient,
    private procesaHttpmsjService: ProcesaHTTPMsjService
  ) {}

  getEmpleados(): Observable<Empleado[]> {
    return this.http
      .get<Empleado[]>(baseURL + 'empleados')
      .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }
}
