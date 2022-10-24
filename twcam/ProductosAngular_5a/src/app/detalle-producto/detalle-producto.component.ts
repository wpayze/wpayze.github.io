import { Component, OnInit } from '@angular/core';
import { Producto } from '../compartido/producto';
import { ProductoService } from '../services/producto.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss'],
})
export class DetalleProductoComponent implements OnInit {
  producto: Producto;
  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.producto = new Producto();
  }

  volver(): void { this.location.back(); }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.params['id']);
    this.producto = this.productoService.getProducto(id);
  }
}
