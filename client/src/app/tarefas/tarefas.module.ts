import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListaTarefasComponent } from './lista-tarefas/lista-tarefas.component';
import { TarefasRoutingModule } from './tarefas-routing.module';
import { UsuarioService } from '../shared/services/usuario.service';
import { TarefaService } from '../shared/services/tarefa.service';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';
import { NovaTarefaComponent } from './nova-tarefa/nova-tarefa.component';
import { EditarTarefaComponent } from './editar-tarefa/editar-tarefa.component';

@NgModule({
    imports: [
        TarefasRoutingModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [ListaTarefasComponent, NovaTarefaComponent, EditarTarefaComponent],
    providers: [
        UsuarioService,
        TarefaService
    ]
})
export class TarefasModule { }