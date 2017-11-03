import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../../shared/models/tarefa';
import { TarefaService } from '../../shared/services/tarefa.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router } from "@angular/router";

import { ToastyService, ToastyConfig } from 'ng2-toasty';

@Component({
  selector: 'app-nova-tarefa',
  templateUrl: './nova-tarefa.component.html',
  styleUrls: ['./nova-tarefa.component.css']
})
export class NovaTarefaComponent implements OnInit {
  public errors: any[] = [];
  public tarefaForm: FormGroup;
  public tarefa: Tarefa;
  public loading: boolean = false;

  constructor(private tarefaService: TarefaService,
    private fb: FormBuilder,
    private router: Router,
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
  }

  adicionarTarefa() {
    if (this.tarefaForm.dirty && this.tarefaForm.valid) {
      let p = Object.assign({}, this.tarefa, this.tarefaForm.value);
      this.loading = true;
      this.tarefaService.registrarTarefa(p)
        .subscribe(
        result => { this.onSaveComplete() },
        error => {
          this.loading = false;
          this.onError(error);
        });
    }
  }

  onError(error) {
    this.errors = JSON.parse(error._body);
  }

  onSaveComplete(): void {
    this.loading = false;
    this.tarefaForm.reset();
    this.errors = [];
    this.toastyService.success('Tarefa registrada com sucesso');
    this.router.navigate(['/']);
  }
}
