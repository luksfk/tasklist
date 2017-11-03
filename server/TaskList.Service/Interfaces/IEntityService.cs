using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using TaskList.Domain.Models;

namespace TaskList.Service.Interfaces
{
    public interface IEntityService<T> : IService
        where T : Entity<T>
    {
        void Adicionar(T entity);
        T ObterPorId(long id);
        IEnumerable<T> ObterTodos();
        void Atualizar(T obj);
        void Remover(long id);        
    }
}
