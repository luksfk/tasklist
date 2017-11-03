import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BaseService } from "./base.service";
import { Tarefa } from '../models/tarefa';

@Injectable()
export class TarefaService extends BaseService {

    constructor(private http: Http) { super(); }

    obterTarefas(): Observable<Tarefa[]> {
        let options = this.obterAuthHeader();

        return this.http.get(this.UrlService + "tarefa/get", options)
            .map((res: Response) => <Tarefa[]>res.json())
            .catch(super.serviceError);
    }

    registrarTarefa(tarefa: Tarefa): Observable<Tarefa> {
        let options = this.obterAuthHeader();

        let response = this.http
            .post(this.UrlService + "tarefa/post", tarefa, options)
            .map(super.extractData)
            .catch((super.serviceError));
        return response;
    };

    excluirTarefa(id: number): Observable<Tarefa> {
        let options = this.obterAuthHeader();

        let response = this.http
            .delete(this.UrlService + "tarefa/delete/" + id, options)
            .map(super.extractData)
            .catch((super.serviceError));
        return response;
    };

    obterTarefa(id: number): Observable<Tarefa> {
        let options = this.obterAuthHeader();

        return this.http.get(this.UrlService + "tarefa/" + id, options)
            .map((res: Response) => <Tarefa[]>res.json())
            .catch(super.serviceError);
    }

    atualizarTarefa(tarefa: Tarefa): Observable<Tarefa> {
        let options = this.obterAuthHeader();

        let response = this.http
            .put(this.UrlService + "tarefa/update", tarefa, options)
            .map(super.extractData)
            .catch((super.serviceError));
        return response;
    };
}


