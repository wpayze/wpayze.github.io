import { Producto } from "./producto";

export class ProductoCarrito {
  cantidad: number;
  producto: Producto;

  constructor() {
    this.cantidad = 0;
    this.producto = new Producto();
  }
}
