using AutoMapper;
using Backend.Models;
using Backend.Models.DTO;
using System.Text.RegularExpressions;

namespace Backend.Mapping
{
    public class EdunovaMappingProfile:Profile
    {

        public EdunovaMappingProfile()
        {
            // kreiramo mapiranja: izvor, odredište
            CreateMap<Film, FilmDTORead>();
            CreateMap<FilmDTOInsertUpdate, Film>();
            CreateMap<Film, FilmDTOInsertUpdate>();

            CreateMap<Gledatelj, GledateljDTORead>()
              .ConstructUsing(entitet =>
               new GledateljDTORead(
                  entitet.Sifra,
                  entitet.Ime ?? "",
                  entitet.Prezime ?? ""));
            CreateMap<GledateljDTOInsertUpdate, Gledatelj>();
            CreateMap<Gledatelj, GledateljDTOInsertUpdate>();

            CreateMap<Projekcija, ProjekcijaDTORead>()
               .ForCtorParam(
                   "FilmSifra",
                   opt => opt.MapFrom(src => src.Film.Naziv)
               );
            CreateMap<Projekcija, ProjekcijaDTOInsertUpdate>().ForMember(
                    dest => dest.FilmSifra,
                    opt => opt.MapFrom(src => src.Film.Sifra)
                );
            CreateMap<ProjekcijaDTOInsertUpdate, Projekcija>();

        }
    }
}
