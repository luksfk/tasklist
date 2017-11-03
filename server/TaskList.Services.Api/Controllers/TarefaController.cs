using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaskList.Domain.Interfaces;
using TaskList.Services.Api.Controllers;
using TaskList.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using TaskList.Domain.Models;
using AutoMapper;
using System.Collections;
using TaskList.Api.ViewModels;

namespace TaskList.Api.Controllers
{
    [Authorize]
    public class TarefaController : BaseController
    {
        private readonly ITarefaService _tarefaService;
        private readonly IMapper _mapper;

        public TarefaController(IUser user, ITarefaService tarefaService, IMapper mapper) : base(user)
        {
            _tarefaService = tarefaService;
            _mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<TarefaViewModel> Get()
        {
            return _mapper.Map<IEnumerable<TarefaViewModel>>(_tarefaService.ObterTodosPorUsuario(UsuarioId));
        }

        [HttpPost]
        public IActionResult Post([FromBody]TarefaViewModel tarefaViewModel)
        {
            var errors = new List<string>();
            if (!ModelState.IsValid)
            {
                errors = ModelState.Values.SelectMany(value => value.Errors.Select(error => error.ErrorMessage)).ToList();
                return BadRequest(errors);
            }

            tarefaViewModel.UsuarioId = UsuarioId;
            tarefaViewModel.Status = 0;
            _tarefaService.Adicionar(_mapper.Map<Tarefa>(tarefaViewModel));

            return Ok("");
        }

        [HttpDelete]
        public IActionResult Delete(long id)
        {
            _tarefaService.Remover(id);
            return Ok("");
        }

        [HttpPut]
        public IActionResult Update([FromBody]TarefaViewModel tarefaViewModel)
        {
            var errors = new List<string>();
            if (!ModelState.IsValid)
            {
                errors = ModelState.Values.SelectMany(value => value.Errors.Select(error => error.ErrorMessage)).ToList();
                return BadRequest(errors);
            }

            tarefaViewModel.UsuarioId = UsuarioId;
            _tarefaService.Atualizar(_mapper.Map<Tarefa>(tarefaViewModel));

            return Ok("");
        }

        [HttpGet]
        [Route("tarefa/{id:long}")]
        public TarefaViewModel Get(long id)
        {
            return _mapper.Map<TarefaViewModel>(_tarefaService.ObterPorId(id));
        }
    }
}