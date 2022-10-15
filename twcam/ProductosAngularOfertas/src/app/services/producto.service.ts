import { Injectable } from '@angular/core';

import { Producto } from '../compartido/producto';
import { PRODUCTOS } from '../compartido/productos';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor() {}

  getProductos(): Producto[] {
    return PRODUCTOS;
  }

  getProducto(id: number): Producto {
    return PRODUCTOS.filter((producto) => producto.id === id)[0];
  }

  getProductosOferta(): Producto[] {
    return PRODUCTOS.filter((producto) => producto.oferta);
  }
}
