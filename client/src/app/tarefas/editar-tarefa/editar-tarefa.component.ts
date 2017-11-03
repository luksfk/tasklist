import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Tarefa } from '../../shared/models/tarefa';
import { TarefaService } from '../../shared/services/tarefa.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';

import { ToastyService, ToastyConfig } from 'ng2-toasty';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.component.html',
  styleUrls: ['./editar-tarefa.component.css']
})
export class EditarTarefaComponent implements OnInit {
  public errors: any[] = [];
  public tarefaForm: FormGroup;
  public tarefa: Tarefa;
  public sub: Subscription;
  public loading: boolean = false;

  constructor(private fb: FormBuilder,
    private tarefaService: TarefaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastyService: ToastyService, private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.theme = 'bootstrap';
    this.tarefa = new Tarefa();
  }

  ngOnInit() {
    this.tarefaForm = this.fb.group({
      descricao: ['', Validators.required],
      titulo: ['', Validators.required]
    })

    this.sub = this.route.params.subscribe(
      params => {
        this.obterTarefa(params['id']);
      }
    );
  }

  obterTarefa(id: number) {
    this.tarefaService.obterTarefa(id)
      .subscribe(
      tarefa => this.preencherFormTarefa(tarefa),
      response => {
        this.router.navigate(['/']);
      });
  }

  preencherFormTarefa(tarefa: Tarefa): void {
    this.tarefa = tarefa;

    this.tarefaForm.patchValue({
      titulo: this.tarefa.titulo,
      descricao: this.tarefa.descricao
    });
  }

  editarTarefa() {
    if (this.tarefaForm.dirty && this.tarefaForm.valid) {
      let p = Object.assign({}, this.tarefa, this.tarefaForm.value);
      this.loading = true;
      this.tarefaService.atualizarTarefa(p)
        .subscribe(
        result => { this.onSaveComplete() },
        error => {
          this.loading = false;
          this.errors = JSON.parse(error._body).errors;
        });
    }
  }

  onSaveComplete(): void {
    this.errors = [];
    this.loading = false;
    this.toastyService.success("Tarefa atualizada com sucesso!");
    this.router.navigate(['/']);
  }
}
