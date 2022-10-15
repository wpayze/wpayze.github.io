import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../compartido/producto';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss'],
})
export class DetalleProductoComponent implements OnInit {
  @Input() producto: Producto = new Producto();

  constructor() {}

  ngOnInit(): void {
    if (!this.producto)
      throw new Error(
        'El valor de la propiedad [producto] no existe y es requerida'
      );
  }
}
