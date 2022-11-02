import { Component, OnInit } from '@angular/core';
import { Producto } from '../compartido/producto';
import { ProductoService } from '../services/producto.service';
import { Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Comentario } from '../compartido/comentario';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss'],
})
export class DetalleProductoComponent implements OnInit {
  producto: Producto;
  comentarioForm!: FormGroup;
  comentario: Comentario;
  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.producto = new Producto();
    this.crearFormulario();
    this.comentario = new Comentario();
  }
  crearFormulario() {
    this.comentarioForm = this.fb.group({
      autor: '',
      comentario: '',
      estrellas: 5,
      fecha: ""
    });
  }

  onSubmit() {
    this.comentario = this.comentarioForm.value;
    this.comentario.fecha = new Date().toString();
    console.log(this.comentario);
    this.comentarioForm.reset({
      autor: '',
      comentario: '',
      estrellas: 5,
      fecha: ""
    });
  }

  volver(): void {
    this.location.back();
  }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.params['id']);
    this.producto = this.productoService.getProducto(id);
  }
}
