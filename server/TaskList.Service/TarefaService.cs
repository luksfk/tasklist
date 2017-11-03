using System;
using System.Collections.Generic;
using TaskList.Domain.Interfaces;
using TaskList.Domain.Models;
using TaskList.Service.Interfaces;

namespace TaskList.Service
{
    public class TarefaService : EntityService<Tarefa>, ITarefaService
    {
        IUnitOfWork _unitOfWork;
        ITarefaRepository _tarefaRepository;

        public TarefaService(IUnitOfWork unitOfWork, ITarefaRepository repository) : base(unitOfWork, repository)
        {
            _unitOfWork = unitOfWork;
            _tarefaRepository = repository;
        }

        public IEnumerable<Tarefa> ObterTodosPorUsuario(Guid usuarioId)
        {
            return _tarefaRepository.ObterTodosPorUsuario(usuarioId);
        }
    }
}
