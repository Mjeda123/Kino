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
                return Ok(_context.dvorane);
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
                var s = _context.dvorane.Find(sifra);
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

        public IActionResult Post(dvorana dvorane)
        {
                try
                {
                    _context.dvorane.Add(dvorane);
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
        public IActionResult Put(int sifra, dvorana dvorane)
        {
                try
                {

                    var s = _context.dvorane.Find(sifra);

                    if (s == null)
                    {
                        return NotFound();
                    }

                // Rucno mapiranje, kasnije automapper
                s.naziv = dvorana.Naziv;

                    _context.dvorane.Update(s);
                    _context.SaveChanges();
                    return Ok(new { poruka = "Uspješno promijenjeno" });
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
        }

        }
    }

