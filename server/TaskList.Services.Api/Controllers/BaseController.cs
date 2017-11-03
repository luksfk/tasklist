using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaskList.Domain.Interfaces;

namespace TaskList.Services.Api.Controllers
{
    [Produces("application/json")]
    public abstract class BaseController : Controller
    {
        protected Guid UsuarioId { get; set; }

        protected BaseController(IUser user)
        {
            if (user.IsAuthenticated())
            {
                UsuarioId = user.GetUserId();
            }
        }
    }
}