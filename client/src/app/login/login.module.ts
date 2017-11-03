import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { UsuarioService } from '../shared/services/usuario.service';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        LoginRoutingModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [LoginComponent],
    providers: [
        UsuarioService
    ]
})
export class LoginModule { }