using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    public record GledateljDTOInsertUpdate(
        [Required(ErrorMessage = "Ime obavezno")]
            string? Ime,
        [Required(ErrorMessage = "Prezime obavezno")]
            string? Prezime


        );
}
