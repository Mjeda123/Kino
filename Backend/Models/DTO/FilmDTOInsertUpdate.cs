using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    public record FilmDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv obavezno")]
            string Naziv,
            string? Zanr
        );
}
