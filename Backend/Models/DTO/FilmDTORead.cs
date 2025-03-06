namespace Backend.Models.DTO
{
    public record FilmDTORead(
        int Sifra,
        string Naziv,
        string? Zanr
        );
}
