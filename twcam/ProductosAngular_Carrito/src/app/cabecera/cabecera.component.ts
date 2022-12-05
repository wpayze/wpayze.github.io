import { Component, OnInit, Inject } from '@angular/core';
import { HostListener } from '@angular/core';
import { AutenticarService } from '../services/autenticar.service';
import {
  faHome,
  faInfo,
  faList,
  faAddressCard,
  faSignInAlt,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { CarritoComponent } from '../carrito/carrito.component';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
})
export class CabeceraComponent implements OnInit {
  faHome = faHome;
  faInfo = faInfo;
  faList = faList;
  faShoppingCart = faShoppingCart;
  faAddressCard = faAddressCard;
  faSignInAlt = faSignInAlt;
  login = { nombre: '', password: '', nocerrar: false };

  constructor(
    private autenticarService: AutenticarService,
    public dialogo: MatDialog,
    @Inject('baseURL') public BaseURL: string
  ) {
    this.autenticarService
      .getLogin()
      .subscribe((login) => (this.login = login));
  }

  ngOnInit(): void {}

  abrirFormularioLogin() {
    let dialogo = this.dialogo.open(LoginComponent, {
      width: '500px',
      height: '450px',
    });
    dialogo.afterClosed().subscribe((result) => (this.login = result));
  }

  abrirCarrito() {
    this.dialogo.open(CarritoComponent, {
      width: '700px',
      height: '450px',
    });
  }

  @HostListener('window:storage', ['$event'])
  procesar() {
    this.autenticarService
      .getLogin()
      .subscribe((login) => (this.login = login));
  }

  cerrarSesion() {
    this.autenticarService
      .cerrarSesion()
      .subscribe((login) => (this.login = login));
    return false;
  }
}
