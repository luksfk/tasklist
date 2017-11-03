using System;
using System.Collections.Generic;
using System.Text;

namespace TaskList.Domain.Utils
{
    public abstract class StatusTarefa
    {
        public enum Status
        {
            ANDAMENTO = 0,
            CONCLUIDA = 1
        }
    }
}
