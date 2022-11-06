import { Injectable } from '@angular/core';

import { Producto } from '../compartido/producto';
import { PRODUCTOS } from '../compartido/productos';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Comentario } from '../compartido/comentario';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor() {}

  getProducto(id: number): Observable<Producto> {
    return of(
      PRODUCTOS.find((producto) => producto.id === id) || new Producto()
    ).pipe(delay(1000));
  }

  agregarComentario(id: number, comentario: Comentario): void {
    const producto = PRODUCTOS.find((producto) => producto.id === id);
    producto?.comentarios.push(comentario);
  }

  getProductosOferta(): Observable<Producto[]> {
    return of(PRODUCTOS.filter((producto) => producto.oferta)).pipe(
      delay(1000)
    );
  }

  getProductos(): Observable<Producto[]> {
    return of(PRODUCTOS).pipe(delay(1000));
  }

  getProductosIds(): Observable<number[] | any> {
    return of(PRODUCTOS.map((producto) => producto.id));
  }
}
