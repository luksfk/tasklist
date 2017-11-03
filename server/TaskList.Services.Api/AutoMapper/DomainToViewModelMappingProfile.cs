using AutoMapper;
using TaskList.Api.ViewModels;
using TaskList.Domain.Models;

namespace TaskList.Api.AutoMapper
{
    internal class DomainToViewModelMappingProfile : Profile
    {
        public DomainToViewModelMappingProfile()
        {
            CreateMap<Tarefa, TarefaViewModel>();
        }
    }
}