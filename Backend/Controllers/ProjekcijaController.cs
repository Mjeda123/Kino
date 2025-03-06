using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;

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
                return Ok(_context.Projekcije);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            try
            {
                var s = _context.Projekcije.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                return Ok(s);
            }
            catch (Exception e)
            {

                return BadRequest(e);
            }
        }

        [HttpPost]
        public IActionResult Post(Projekcija projekcija)
        {
            try
            {
                _context.Projekcije.Add(projekcija);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, projekcija);
            }
            catch (Exception e)
            {

                return BadRequest(e);
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Projekcija projekcija)
        {
            try
            {
                var s = _context.Projekcije.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }

                // Rucno mapiranje, kasnije automapper
                s.Film = projekcija.Film;
                s.Termin = projekcija.Termin;
                s.Dvorana = projekcija.Dvorana;

                _context.Projekcije.Update(s);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno promijenjeno" });
            }
            catch (Exception e)
            {

                return BadRequest(e);
            }
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            try
            {
                var s = _context.Projekcije.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                _context.Projekcije.Remove(s);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
