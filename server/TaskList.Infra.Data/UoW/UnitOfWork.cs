using System;
using System.Collections.Generic;
using System.Text;
using TaskList.Domain.Interfaces;
using TaskList.Infra.Data.Context;

namespace TaskList.Infra.Data.UoW
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly TaskListContext _context;

        public UnitOfWork(TaskListContext context)
        {
            _context = context;
        }

        public bool Commit()
        {
            return _context.SaveChanges() > 0;
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
