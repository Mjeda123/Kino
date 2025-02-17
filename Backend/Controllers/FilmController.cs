




using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v2/[controller]")]
    public class FilmController : ControllerBase
    {
        private readonly EdunovaContext _context;

        public FilmController(EdunovaContext context)   
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Film);
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
                var s = _context.Film.Find(sifra);
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

        public IActionResult Post(Film film)
        {
            try
            {
                _context.Dvorane.Add(film);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, film);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
    }
}
