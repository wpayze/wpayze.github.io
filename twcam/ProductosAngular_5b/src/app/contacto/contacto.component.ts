import { Component, OnInit } from '@angular/core';
import { faPhone, faFax, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Consulta, TipoContacto } from '../compartido/consulta';

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
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: [0, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactar: false,
      tipocontacto: 'None',
      mensaje: '',
    });
  }

  onSubmit() {
    this.consulta = this.consultaForm.value;
    console.log(this.consulta);
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

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
    this.consulta = new Consulta();
  }

  ngOnInit(): void {}
}
