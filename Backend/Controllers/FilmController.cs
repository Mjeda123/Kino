﻿using Backend.Data;
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
                return Ok(_context.Filmovi);
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
                var s = _context.Filmovi.Find(sifra);
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

        public IActionResult Post(Film filmovi)
        {
            try
            {
                _context.Filmovi.Add(filmovi);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, filmovi);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Film filmovi)
        {
            try
            {

                var s = _context.Filmovi.Find(sifra);

                if (s == null)
                {
                    return NotFound();
                }

                // Rucno mapiranje, kasnije automapper
                s.Naziv = filmovi.Naziv;
                s.Zanr = filmovi.Zanr;

                _context.Filmovi.Update(s);
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
                var s = _context.Filmovi.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                _context.Filmovi.Remove(s);
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

