import { Component, OnInit, Inject } from '@angular/core';
import { Empleado } from '../compartido/empleado';
import { EmpleadoService } from '../services/empleado.service';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss'],
})
export class NosotrosComponent implements OnInit {
  vEmpleados: Empleado[] = [];
  errorMensaje: string = '';

  constructor(
    private empleadoService: EmpleadoService,
    @Inject('baseURL') public BaseURL: string
  ) {}

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe({
      next: (empleados) => (this.vEmpleados = empleados),
      error: (errorMensaje) => (this.errorMensaje = <any>errorMensaje),
    });
  }
}
