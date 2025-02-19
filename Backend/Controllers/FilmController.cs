﻿




using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
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
                _context.Film.Add(film);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, film);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Film film)
        {
            try
            {

                var s = _context.Film.Find(sifra);

                if (s == null)
                {
                    return NotFound();
                }

                // Rucno mapiranje, kasnije automapper
                s.Naziv = film.Naziv;
                s.Zanr = film.Zanr;

                _context.Film.Update(s);
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
                var s = _context.Film.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                _context.Film.Remove(s);
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

