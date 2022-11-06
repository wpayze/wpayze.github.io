import { Component, OnInit } from '@angular/core';
import { Producto } from '../compartido/producto';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  vProductos: Producto[] = [];
  productoSeleccionado = new Producto();

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService
      .getProductos()
      .subscribe((productos) => (this.vProductos = productos));
  }

  selectProducto = (producto: Producto) => {
    this.productoSeleccionado =
      this.productoSeleccionado.id === producto.id &&
      this.productoSeleccionado.id !== -1
        ? new Producto()
        : producto;
  };
}
