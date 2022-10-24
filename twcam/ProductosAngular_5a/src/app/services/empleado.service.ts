import { Injectable } from '@angular/core';
import { Empleado } from '../compartido/empleado';
import { EMPLEADOS } from '../compartido/empleados';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor() { }

  getEmpleados(): Empleado[] {
    return EMPLEADOS;
  }
}
