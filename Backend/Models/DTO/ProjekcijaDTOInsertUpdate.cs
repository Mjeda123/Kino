using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    public record ProjekcijaDTOInsertUpdate(
        [Range(1, int.MaxValue, ErrorMessage = "{0} mora biti između {1} i {10}")]
            [Required(ErrorMessage = "film obavezno")]
            int? FilmSifra,
        DateTime? Termin,
        [Range(1, int.MaxValue, ErrorMessage = "{0} mora biti između {1} i {4}")]
            [Required(ErrorMessage = "dvorana obavezno")]
            int? DvoranaSifra
        );
}
