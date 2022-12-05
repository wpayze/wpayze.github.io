import { Component, OnInit } from '@angular/core';
import { faPhone, faFax, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Consulta, TipoContacto } from '../compartido/consulta';
import { ConsultaService } from '../services/consulta.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent implements OnInit {
  faPhone = faPhone;
  faFax = faFax;
  faEnvelope = faEnvelope;
  consultaForm!: FormGroup;
  consulta: Consulta;
  tipoContacto = TipoContacto;

  crearFormulario() {
    this.consultaForm = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      apellidos: ['', Validators.required],
      telefono: [, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      contactar: false,
      tipocontacto: 'None',
      mensaje: '',
    });

    this.consultaForm.valueChanges.subscribe((datos) =>
      this.onCambioValor(datos)
    );
    this.onCambioValor();
  }

  onCambioValor(data?: any) {
    if (!this.consultaForm) {
      return;
    }
    const form = this.consultaForm;
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
    this.consulta = this.consultaForm.value;
    this.consultaService
      .enviarConsulta(this.consulta)
      .subscribe((respuesta) => console.log("Respuesta del servidor:", respuesta));

    this.consultaForm.reset({
      nombre: '',
      apellidos: '',
      telefono: 0,
      email: '',
      contactar: false,
      tipocontacto: 'None',
      mensaje: '',
    });
  }

  erroresForm: any = {
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
  };

  mensajesError: any = {
    nombre: {
      required: 'El nombre es obligatorio.',
      minlength: 'El nombre debe tener una longitud mínima de 2 caracteres.',
      maxlength: 'El nombre no puede exceder de 25 caracteres.',
    },

    apellidos: {
      required: 'Los apellidos son obligatorios.',
      minlength:
        'Los apellidos deben tener una longitud mínima de 2 caracteres.',
      maxlength: 'Los apellidos no pueden exceder de 25 caracteres.',
    },

    telefono: {
      required: 'El número de teléfono es obligatorio.',
      pattern: 'El número de teléfono sólo puede contener números.',
    },

    email: {
      required: 'La dirección de email es obligatoria.',
      email: 'La dirección de email no tiene el formato correcto.',
    },
  };

  constructor(
    private fb: FormBuilder,
    private consultaService: ConsultaService
  ) {
    this.crearFormulario();
    this.consulta = new Consulta();
  }

  ngOnInit(): void {}
}
