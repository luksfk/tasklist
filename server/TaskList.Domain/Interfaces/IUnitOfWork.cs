using System;
using System.Collections.Generic;
using System.Text;

namespace TaskList.Domain.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        bool Commit();
    }
}
