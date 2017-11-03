using System;
using System.Collections.Generic;
using System.Text;
using TaskList.Domain.Utils;

namespace TaskList.Domain.Models
{
    public class Tarefa : Entity<Tarefa>
    {
        public string Titulo { get; private set; }

        public string Descricao { get; private set; }

        public int Status { get; private set; }

        public Guid UsuarioId { get; private set; }

        public Tarefa() { }

        public Tarefa(Guid usuarioId)
        {
            UsuarioId = usuarioId;
        }

        public Tarefa(string titulo, string descricao, int status, Guid usuarioId)
        {
            Titulo = titulo;
            Descricao = descricao;
            Status = status;
            UsuarioId = usuarioId;
        }

    }
}


