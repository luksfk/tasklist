using System;
using System.Collections.Generic;
using System.Text;
using TaskList.Domain.Models;

namespace TaskList.Domain.Interfaces
{
    public interface ITarefaRepository : IRepository<Tarefa>
    {
        IEnumerable<Tarefa> ObterTodosPorUsuario(Guid usuarioId);
    }
}
