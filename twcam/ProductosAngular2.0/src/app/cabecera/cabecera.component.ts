import { Component, OnInit } from '@angular/core';
import {
  faHome,
  faInfo,
  faList,
  faAddressCard,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
})
export class CabeceraComponent implements OnInit {
  faHome = faHome;
  faInfo = faInfo;
  faList = faList;
  faAddressCard = faAddressCard;

  constructor() {}

  ngOnInit(): void {}
}
