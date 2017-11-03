import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaTarefasComponent } from './lista-tarefas/lista-tarefas.component';
import { NovaTarefaComponent } from './nova-tarefa/nova-tarefa.component';
import { EditarTarefaComponent } from './editar-tarefa/editar-tarefa.component';

const routes: Routes = [
    {
        path: '',
        component: ListaTarefasComponent,
    },
    {
        path: 'nova',
        component: NovaTarefaComponent
    },
    {
        path: 'editar/:id',
        component: EditarTarefaComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TarefasRoutingModule { }