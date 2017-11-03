import { Component, OnInit } from '@angular/core';
import { TarefaService } from '../../shared/services/tarefa.service';
import { Tarefa } from '../../shared/models/tarefa';
import { Router } from "@angular/router";


import { ToastyService, ToastyConfig } from 'ng2-toasty';

@Component({
  selector: 'app-lista-tarefas',
  templateUrl: './lista-tarefas.component.html',
  styleUrls: ['./lista-tarefas.component.css']
})
export class ListaTarefasComponent implements OnInit {
  public tarefas: Tarefa[];
  public loading = false;
  constructor(private service: TarefaService,
    private router: Router,
    private toastyService: ToastyService, private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.theme = 'bootstrap';
  }

  ngOnInit(): void {
    this.obterTarefas();
  }

  obterTarefas() {
    this.loading = true;
    this.service.obterTarefas()
      .subscribe(res => this.onGetComplete(res),
      error => this.loading = false);
  }

  onGetComplete(response) {
    this.loading = false;
    this.tarefas = response;
  }

  alteraStatus(tarefa: Tarefa, concluida: boolean) {
    this.loading = true;
    let p = Object.assign({}, tarefa);
    p.status = concluida ? 1 : 0;
    this.service.atualizarTarefa(p)
      .subscribe(
      result => { this.obterTarefas() },
      error => {
        this.onError();
      });
  }

  public excluirTarefa(id: number) {
    this.loading = true;
    this.service.excluirTarefa(id)
      .subscribe(
      evento => { this.onDeleteComplete(evento) },
      error => { this.onError() }
      );
  }

  public onDeleteComplete(evento: any) {
    this.obterTarefas();
    this.toastyService.success('Tarefa excluida com sucesso!');
    this.router.navigate(['/']);
  }

  public onError() {
    this.loading = false;
    this.toastyService.error('Falha no processamento!');
  }
}
