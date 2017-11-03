using System;
using System.Collections.Generic;
using System.Text;
using TaskList.Domain.Interfaces;
using TaskList.Domain.Models;
using TaskList.Service.Interfaces;

namespace TaskList.Service
{
    public abstract class EntityService<T> : IEntityService<T> where T : Entity<T>
    {
        IUnitOfWork _unitOfWork;
        IRepository<T> _repository;

        public EntityService(IUnitOfWork unitOfWork, IRepository<T> repository)
        {
            _unitOfWork = unitOfWork;
            _repository = repository;
        }


        public virtual void Adicionar(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            _repository.Adicionar(entity);
            _unitOfWork.Commit();
        }


        public virtual void Atualizar(T entity)
        {
            if (entity == null) throw new ArgumentNullException("entity");
            _repository.Atualizar(entity);
            _unitOfWork.Commit();
        }

        public virtual void Remover(long id)
        {            
            _repository.Remover(id);
            _unitOfWork.Commit();
        }

        public virtual IEnumerable<T> ObterTodos()
        {
            return _repository.ObterTodos();
        }

        public T ObterPorId(long id)
        {
            return _repository.ObterPorId(id);
        }
    }
}
