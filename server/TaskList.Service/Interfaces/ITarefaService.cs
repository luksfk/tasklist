using System;
using System.Collections.Generic;
using System.Text;
using TaskList.Domain.Models;

namespace TaskList.Service.Interfaces
{
    public interface ITarefaService : IEntityService<Tarefa>
    {
        IEnumerable<Tarefa> ObterTodosPorUsuario(Guid usuarioId);
    }
}
