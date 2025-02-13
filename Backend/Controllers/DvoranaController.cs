using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class DvoranaController : ControllerBase
    {
        private readonly EdunovaContext _context;

        public DvoranaController(EdunovaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Dvorane);
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
                var s = _context.Dvorane.Find(sifra);
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

        public IActionResult Post(Dvorana dvorane)
        {
                try
                {
                    _context.Dvorane.Add(dvorane);
                    _context.SaveChanges();
                    return StatusCode(StatusCodes.Status201Created, dvorane);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Dvorana dvorana)
        {
                try
                {

                    var s = _context.Dvorane.Find(sifra);

                    if (s == null)
                    {
                        return NotFound();
                    }

                // Rucno mapiranje, kasnije automapper
                s.Naziv = dvorana.Naziv;

                    _context.Dvorane.Update(s);
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
                var s = _context.Dvorane.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                _context.Dvorane.Remove(s);
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

