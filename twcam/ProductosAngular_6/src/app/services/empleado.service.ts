import { Injectable } from '@angular/core';
import { Empleado } from '../compartido/empleado';
import { EMPLEADOS } from '../compartido/empleados';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor() {}

  getEmpleados(): Observable<Empleado[]> {
    return of(EMPLEADOS).pipe(delay(1000));
  }
}
