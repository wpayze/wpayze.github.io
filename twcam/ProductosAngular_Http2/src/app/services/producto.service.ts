import { Injectable } from '@angular/core';

import { Producto } from '../compartido/producto';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Comentario } from '../compartido/comentario';

import { map, catchError } from 'rxjs/operators';
import { ProcesaHTTPMsjService } from './procesa-httpmsj.service';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../compartido/baseurl';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(
    private http: HttpClient,
    private procesaHttpmsjService: ProcesaHTTPMsjService
  ) {}

  getProductos(): Observable<Producto[]> {
    return this.http
      .get<Producto[]>(baseURL + 'productos')
      .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }
  getProducto(id: number): Observable<Producto> {
    return this.http
      .get<Producto>(baseURL + 'productos/' + id)
      .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }
  getProductosOferta(): Observable<Producto[]> {
    return this.http
      .get<Producto[]>(baseURL + 'productos?oferta=true')
      .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }
  getProductosIds(): Observable<number[] | any> {
    return this.getProductos().pipe(
      map((productos) => productos.map((producto) => producto.id))
    );
  }

  setProducto(producto: Producto): Observable<Producto> {
    return this.http
      .put<Producto>(
        baseURL + 'productos/' + producto.id,
        producto,
        httpOptions
      )
      .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }
}
