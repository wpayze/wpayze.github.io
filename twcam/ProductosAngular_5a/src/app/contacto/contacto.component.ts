import { Component, OnInit } from '@angular/core';
import { faPhone, faFax, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent implements OnInit {
  faPhone = faPhone;
  faFax = faFax;
  faEnvelope = faEnvelope;

  constructor() {}

  ngOnInit(): void {}
}
