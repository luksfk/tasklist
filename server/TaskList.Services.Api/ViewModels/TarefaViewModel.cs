using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TaskList.Api.ViewModels
{
    public class TarefaViewModel
    {
        [Key]
        public int Id { get; set; }

        public string Descricao { get; set; }

        [Required(ErrorMessage = "O título é requerido")]
        public string Titulo { get; set; }

        public int Status { get; set; }

        public Guid UsuarioId { get; set; }
    }
}
