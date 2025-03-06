namespace Backend.Models.DTO
{
    public record ProjekcijaDTORead(
        int Sifra,
        string? FilmNaziv,
        DateTime? Termin,
        string? DvoranaNaziv
        );
}
