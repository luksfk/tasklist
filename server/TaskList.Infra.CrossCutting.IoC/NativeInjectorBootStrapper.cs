using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using TaskList.Domain.Interfaces;
using TaskList.Infra.CrossCutting.Identity.Models;
using TaskList.Infra.Data.Context;
using TaskList.Infra.Data.Repository;
using TaskList.Infra.Data.UoW;
using TaskList.Service;
using TaskList.Service.Interfaces;

namespace TaskList.Infra.CrossCutting.IoC
{
    public class NativeInjectorBootStrapper
    {
        public static void RegisterServices(IServiceCollection services)
        {
            // ASPNET
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton(Mapper.Configuration);
            services.AddScoped<IMapper>(sp => new Mapper(sp.GetRequiredService<IConfigurationProvider>(), sp.GetService));

            // Infra - Data
            services.AddScoped<ITarefaRepository, TaskListRepository>();            
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<TaskListContext>();            

            // Services            
            services.AddScoped<ITarefaService, TarefaService>();            

            // Infra - Identity            
            services.AddScoped<IUser, AspNetUser>();
        }
    }
}
