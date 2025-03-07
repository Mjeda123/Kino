using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ProjekcijaController(EdunovaContext context, IMapper mapper) : EdunovaController(context, mapper)
    {

        [HttpGet]
        public ActionResult<List<ProjekcijaDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<ProjekcijaDTORead>>(_contex.Projekcije.Include(g => g.Film)));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<ProjekcijaDTORead> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Projekcija? e;
            try
            {
                e = _contex.Projekcije.Include(g => g.Film).FirstOrDefault(g => g.Sifra == sifra);
            }
            catch (Exception ex)
            {

                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Projekcija ne postoji u bazi" });
            }

            return Ok(_mapper.Map<ProjekcijaDTOInsertUpdate>(e));
        }

        [HttpPost]
        public IActionResult Post(ProjekcijaDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Film? es;
            try
            {
                es = _contex.Filmovi.Find(dto.FilmSifra);
            }
            catch (Exception ex)
            {

                return BadRequest(new { poruka = ex.Message });
            }
            if (es == null)
            {
                return NotFound(new { poruka = "Film na projekciji ne postoji u bazi" });
            }
            try
            {
                var e = _mapper.Map<Projekcija>(dto);
                e.Film = es;
                _contex.Projekcije.Add(e);
                _contex.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<ProjekcijaDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, ProjekcijaDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Projekcija? e;
                try
                {
                    e = _contex.Projekcije.Include(g => g.Film).FirstOrDefault(x => x.Sifra == sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Projekcija ne postoji u bazi" });
                }

                Film? es;
                try
                {
                    es = _contex.Filmovi.Find(dto.FilmSifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (es == null)
                {
                    return NotFound(new { poruka = "Film na grupi ne postoji u bazi" });
                }

                e = _mapper.Map(dto, e);
                e.Film = es;
                _contex.Projekcije.Update(e);
                _contex.SaveChanges();

                return Ok(new { poruka = "Uspješno promjenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Projekcija? e;
                try
                {
                    e = _contex.Projekcije.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Projekcija ne postoji u bazi");
                }
                _contex.Projekcije.Remove(e);
                _contex.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpGet]
        [Route("Gledatelji/{sifraProjekcije:int}")]
        public ActionResult<List<GledateljDTORead>> GetGledatelji(int sifraProjekcije)
        {
            if (!ModelState.IsValid || sifraProjekcije <= 0)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var p = _contex.Projekcije
                    .Include(i => i.Gledatelji).FirstOrDefault(x => x.Sifra == sifraProjekcije);
                if (p == null)
                {
                    return BadRequest("Ne postoji projekcija s šifrom " + sifraProjekcije + " u bazi");
                }

                return Ok(_mapper.Map<List<GledateljDTORead>>(p.Gledatelji));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpPost]
        [Route("{sifra:int}/dodaj/{gledateljSifra:int}")]
        public IActionResult DodajGledatelja(int sifra, int gledateljSifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (sifra <= 0 || gledateljSifra <= 0)
            {
                return BadRequest("Šifra projekcije ili gledatelja nije dobra");
            }
            try
            {
                var projekcija = _contex.Projekcije
                    .Include(g => g.Gledatelji)
                    .FirstOrDefault(g => g.Sifra == sifra);
                if (projekcija == null)
                {
                    return BadRequest("Ne postoji projekcija s šifrom " + sifra + " u bazi");
                }
                var gledatelj = _contex.Gledatelji.Find(gledateljSifra);
                if (gledatelj == null)
                {
                    return BadRequest("Ne postoji gledatelj s šifrom " + gledateljSifra + " u bazi");
                }
                projekcija.Gledatelji?.Add(gledatelj);
                _contex.Projekcije.Update(projekcija);
                _contex.SaveChanges();
                return Ok(new
                {
                    poruka = "Gledatelj " + gledatelj.Prezime + " " + gledatelj.Ime + " dodan na grupu "
                 + projekcija.Film
                });
            }
            catch (Exception ex)
            {
                return StatusCode(
                       StatusCodes.Status503ServiceUnavailable,
                       ex.Message);
            }
        }

        [HttpDelete]
        [Route("{sifra:int}/obrisi/{gledateljSifra:int}")]
        public IActionResult ObrisiGledatelja(int sifra, int gledateljSifra)
        {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (sifra <= 0 || gledateljSifra <= 0)
                {
                    return BadRequest("Šifra projekcije ili gledatelja nije dobra");
                }
                try
                {
                    var projekcija = _contex.Projekcije
                        .Include(g => g.Gledatelji)
                        .FirstOrDefault(g => g.Sifra == sifra);
                    if (projekcija == null)
                    {
                        return BadRequest("Ne postoji projekcija s šifrom " + sifra + " u bazi");
                    }
                    var gledatelj = _contex.Gledatelji.Find(gledateljSifra);
                    if (gledatelj == null)
                    {
                        return BadRequest("Ne postoji gledatelj s šifrom " + gledateljSifra + " u bazi");
                    }
                    projekcija.Gledatelji?.Remove(gledatelj);
                    _contex.Projekcije.Update(projekcija);
                    _contex.SaveChanges();

                    return Ok(new
                    {
                        poruka = "Gledatelj " + gledatelj.Prezime + " " + gledatelj.Ime + " obrisan iz grupe "
                     + projekcija.Film
                    });
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
        }




    }
}


