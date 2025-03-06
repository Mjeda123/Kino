using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Projekcija : Entitet
    {
        [ForeignKey("film")]
        public required Film Film { get; set; }

        public DateTime? Termin { get; set; }

        [ForeignKey("dvorana")]
        public required Dvorana Dvorana { get; set; }

        public ICollection<Gledatelj>? Gledatelji { get; set; }
    }
}
