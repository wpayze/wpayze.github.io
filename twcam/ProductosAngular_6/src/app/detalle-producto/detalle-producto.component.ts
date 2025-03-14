import { Component, OnInit } from '@angular/core';
import { Producto } from '../compartido/producto';
import { ProductoService } from '../services/producto.service';
import { Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Comentario } from '../compartido/comentario';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss'],
})
export class DetalleProductoComponent implements OnInit {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  producto: Producto;
  comentarioForm!: FormGroup;
  comentario: Comentario;

  productoIds: number[];
  prev: number;
  post: number;

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.producto = new Producto();
    this.crearFormulario();
    this.comentario = new Comentario();
    this.productoIds = [];
    this.prev = 0;
    this.post = 0;
  }
  crearFormulario() {
    this.comentarioForm = this.fb.group({
      autor: ['', [Validators.required, Validators.minLength(2)]],
      comentario: ['', [Validators.required]],
      estrellas: 5,
      fecha: '',
    });

    this.comentarioForm.valueChanges.subscribe((datos) =>
      this.onCambioValor(datos)
    );
    this.onCambioValor();
  }

  erroresForm: any = {
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
  };

  mensajesError: any = {
    autor: {
      required: 'El autor es obligatorio.',
      minlength: 'El autor debe tener una longitud mínima de 2 caracteres.',
    },

    comentario: {
      required: 'El comentario es obligatorio.',
    }
  };

  onCambioValor(data?: any) {
    if (!this.comentarioForm) {
      return;
    }

    const form = this.comentarioForm;
    for (const field in this.erroresForm) {
      // Se borrarán los mensajes de error previos
      this.erroresForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.mensajesError[field];
        for (const key in control.errors) {
          this.erroresForm[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.comentario = this.comentarioForm.value;
    this.comentario.fecha = new Date().toISOString();
    this.productoService.agregarComentario(this.producto.id, this.comentario);

    this.comentarioForm.reset({
      autor: '',
      comentario: '',
      estrellas: 5,
      fecha: '',
    });
  }

  volver(): void {
    this.router.navigate(['/productos']);
  }

  setPrevPost(productoId: number) {
    const index = this.productoIds.indexOf(productoId);
    this.prev =
      this.productoIds[
        (this.productoIds.length + index - 1) % this.productoIds.length
      ];
    this.post =
      this.productoIds[
        (this.productoIds.length + index + 1) % this.productoIds.length
      ];
  }

  ngOnInit(): void {
    this.productoService
      .getProductosIds()
      .subscribe((productoIds) => (this.productoIds = productoIds));

    this.route.params
      .pipe(
        switchMap((params: Params) =>
          this.productoService.getProducto(+params['id'])
        )
      )
      .subscribe((producto) => {
        this.producto = producto;
        this.setPrevPost(producto.id);
      });
  }
}
