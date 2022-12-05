import { Component, OnInit, Inject } from '@angular/core';
import { Producto } from '../compartido/producto';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  vProductos: Producto[] = [];
  errorMensaje: string = '';

  constructor(
    private productoService: ProductoService,
    @Inject('baseURL') public BaseURL: string
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe({
      next: (productos) => (this.vProductos = productos),
      error: (errorMensaje) => (this.errorMensaje = <any>errorMensaje),
    });
  }
}
