using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using TaskList.Domain.Models;

namespace TaskList.Domain.Interfaces
{
    public interface IRepository<TEntity> : IDisposable where TEntity : Entity<TEntity>
    {
        void Adicionar(TEntity obj);
        TEntity ObterPorId(long id);
        IEnumerable<TEntity> ObterTodos();
        void Atualizar(TEntity obj);
        void Remover(long id);
        IEnumerable<TEntity> Buscar(Expression<Func<TEntity, bool>> predicate);
        int SaveChanges();
    }
}
