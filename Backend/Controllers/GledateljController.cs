using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class GledateljController : ControllerBase
    {
        private readonly EdunovaContext _context;

        public GledateljController(EdunovaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Gledatelji);
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
                var s = _context.Gledatelji.Find(sifra);
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
        public IActionResult Post(Gledatelj gledatelji)
        {
            try
            {
                _context.Gledatelji.Add(gledatelji);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, gledatelji);
            }
            catch (Exception e)
            {

                return BadRequest(e);
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Gledatelj gledatelji)
        {
            try
            {
                var s = _context.Gledatelji.Find(sifra);
                if(s == null)
                {
                    return NotFound();
                }

                // Rucno mapiranje, kasnije automapper
                s.Ime = gledatelji.Ime;
                s.Prezime = gledatelji.Prezime;

                _context.Gledatelji.Update(s);
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
                var s = _context.Gledatelji.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                _context.Gledatelji.Remove(s);
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
