import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AutenticarService } from '../services/autenticar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuario = { nombre: '', password: '', nocerrar: false };

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private autenticarService: AutenticarService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.autenticarService.autenticar(this.usuario)) {
      this.dialogRef.close(this.usuario);
    } else {
      let usuario = { nombre: '', password: '', nocerrar: false };
      this.dialogRef.close(usuario);
    }
  }
}
