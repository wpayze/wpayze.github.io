import { Injectable } from '@angular/core';
import { ProductoCarrito } from '../compartido/productocarrito';
import { Producto } from '../compartido/producto';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  productos: ProductoCarrito[] = [];

  constructor() {}

  agregarProducto(producto: Producto) {
    let productoCarrito = new ProductoCarrito();
    productoCarrito.producto = producto;
    productoCarrito.cantidad = 1;

    let productoExistente = this.productos.find(
      (p) => p.producto.id === producto.id
    );

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      this.productos.push(productoCarrito);
    }

    localStorage.setItem('productosCarrito', JSON.stringify(this.productos));
    return this.productos;
  }

  getProductos() {
    let productosData = localStorage.getItem('productosCarrito');

    if (productosData != null) this.productos = JSON.parse(productosData);

    return this.productos;
  }

  quitarProducto(producto: Producto) {
    let productoCarrito = new ProductoCarrito();
    productoCarrito.producto = producto;
    productoCarrito.cantidad = 1;

    let productoExistente = this.productos.find(
      (p) => p.producto.id === producto.id
    );

    if (productoExistente) {
      if (productoExistente.cantidad > 1) productoExistente.cantidad -= 1;
      else
        this.productos = this.productos.filter(
          (p) => p.producto.id !== producto.id
        );
    } else {
      this.productos.push(productoCarrito);
    }

    localStorage.setItem('productosCarrito', JSON.stringify(this.productos));
    return this.productos;
  }

  borrarProducto(producto: Producto) {
    let productoExistente = this.productos.find(
      (p) => p.producto.id === producto.id
    );

    if (productoExistente) {
      this.productos = this.productos.filter(
        (p) => p.producto.id !== producto.id
      );
    }

    localStorage.setItem('productosCarrito', JSON.stringify(this.productos));
    return this.productos;
  }
}
