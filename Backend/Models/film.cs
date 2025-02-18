namespace Backend.Models
{
    public class Film : Entitet
    {
        public string Naziv { get; set; } = "";

        public string? Zanr { get; set; }
    }
}
