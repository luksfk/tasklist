import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from "@angular/router";

import { UsuarioService } from "../shared/services/usuario.service";
import { Usuario } from "../shared/models/usuario";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public errors: any[] = [];
  loginForm: FormGroup;
  usuario: Usuario;
  loading = false;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.usuarioService.logout();
    this.loginForm = this.fb.group({

      usuario: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    this.loading = true;
    if (this.loginForm.dirty && this.loginForm.valid) {
      let p = Object.assign({}, this.usuario, this.loginForm.value);

      this.usuarioService.login(p)
        .subscribe(
        result => { this.onSaveComplete(result) },
        error => {
          this.loading = false;
          this.errors = JSON.parse(error._body);
        });
    }
  }

  onSaveComplete(response: any): void {
    this.loginForm.reset();
    this.errors = [];

    localStorage.setItem('eio.token', response.result.access_token);
    localStorage.setItem('eio.user', JSON.stringify(response.result.user));

    this.router.navigate(['/']);
  }

}
