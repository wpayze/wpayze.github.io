import { Component, OnInit } from '@angular/core';
import { Producto } from '../compartido/producto';
import { PRODUCTOS } from '../compartido/productos';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  vProductos: Producto[] = PRODUCTOS;

  productoSeleccionado = new Producto();

  constructor() {}

  ngOnInit(): void {}

  selectProducto = (producto: Producto) => {
    this.productoSeleccionado =
      this.productoSeleccionado.id === producto.id &&
      this.productoSeleccionado.id !== -1
        ? new Producto()
        : producto;
  };
}
