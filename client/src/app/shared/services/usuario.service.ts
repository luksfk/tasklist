import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Usuario } from "../models/usuario";

import { BaseService } from "./base.service";

@Injectable()
export class UsuarioService extends BaseService {

    constructor(private http: Http) { super(); }

    login(usuario: Usuario): Observable<Usuario> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let jsons = JSON.stringify(usuario);
        let response = this.http
            .post(this.UrlService + "account/login ", usuario, options)
            .map(super.extractData)
            .catch((super.serviceError));
        return response;
    };

    logout() {
        localStorage.removeItem('eio.token');
        localStorage.removeItem('eio.user');
    }
}


