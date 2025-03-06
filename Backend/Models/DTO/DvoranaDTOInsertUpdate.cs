using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    public record DvoranaDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv obavezno")]
            string Naziv
        );
}
