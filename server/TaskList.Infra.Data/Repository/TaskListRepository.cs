using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using TaskList.Domain.Interfaces;
using TaskList.Domain.Models;
using TaskList.Infra.Data.Context;

namespace TaskList.Infra.Data.Repository
{
    public class TaskListRepository : Repository<Tarefa>, ITarefaRepository
    {
        public TaskListRepository(TaskListContext context) : base(context)
        {
        }

        public IEnumerable<Tarefa> ObterTodosPorUsuario(Guid usuarioId)
        {
            var sql = @"SELECT * FROM TAREFAS T " +
                       "WHERE T.USUARIOID = @uid " +                       
                       "ORDER BY T.ID DESC";

            return Db.Database.GetDbConnection().Query<Tarefa>(sql, new { uid = usuarioId });
        }
    }
}
