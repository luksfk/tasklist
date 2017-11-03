using AutoMapper;
using TaskList.Api.ViewModels;
using TaskList.Domain.Models;

namespace TaskList.Api.AutoMapper
{
    internal class ViewModelToDomainMappingProfile : Profile
    {
        public ViewModelToDomainMappingProfile()
        {
            CreateMap<TarefaViewModel, Tarefa>();
        }
    }
}