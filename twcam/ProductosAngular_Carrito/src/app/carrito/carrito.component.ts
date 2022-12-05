import { Component, OnInit, Inject } from '@angular/core';
import { Producto } from '../compartido/producto';
import { ProductoCarrito } from '../compartido/productocarrito';
import { CarritoService } from '../services/carrito.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  productos: ProductoCarrito[] = [];
  constructor(
    private carritoService: CarritoService,
    @Inject('baseURL') public BaseURL: string
  ) {}

  faTrash = faTrash;
  totalCarrito = 0;

  ngOnInit(): void {
    this.refrescarCarrito();
  }

  refrescarCarrito() {
    this.productos = this.carritoService.getProductos();
    this.totalCarrito = this.productos.reduce( (acc, next) => acc + (next.producto.precio * next.cantidad),0);
  }

  agregarUno(producto: Producto) {
    this.carritoService.agregarProducto(producto);
    this.refrescarCarrito();
  }

  quitarUno(producto: Producto) {
    this.carritoService.quitarProducto(producto);
    this.refrescarCarrito();
  }

  borrarDelCarrito(producto: Producto) {
    this.carritoService.borrarProducto(producto);
    this.refrescarCarrito();
  }
}
