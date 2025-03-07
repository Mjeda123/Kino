
import { Link, useNavigate } from "react-router-dom";
import FilmoviService from "../../services/FilmoviService";
import useLoading from "../../hooks/useLoading";
import { useEffect, useState } from "react";
import useError from "../../hooks/useError";
import { RouteNames } from "../../constans";
import ProjekcijeService from "../../services/ProjekcijeService";
import { Button, Col, Row } from "react-bootstrap";

export default function ProjekcijeDodaj() {
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
  
    const [filmovi, setFilmovi] = useState([]);
    const [Naziv, setNaziv ] = useState(0);
  
    const { prikaziError } = useError();
  
    async function dohvatiFilmovi(){
      showLoading();
      const odgovor = await FilmoviService.get();
      hideLoading();
      setFilmovi(odgovor.poruka);
      setNaziv(odgovor.poruka[0].sifra);
    }
  
  
  
    useEffect(()=>{
      dohvatiFilmovi();
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
  
    async function dodaj(e) {
      showLoading();
      const odgovor = await ProjekcijeService.dodaj(e);
      hideLoading();
      if(odgovor.greska){
        prikaziError(odgovor.poruka);
        return;
      }
      navigate(RouteNames.PROJEKCIJE_PREGLED);
    }
  
    function obradiSubmit(e) {
      e.preventDefault();
  
      const podaci = new FormData(e.target);
  
  
      dodaj({
        naziv: podaci.get('naziv'),
        Naziv: parseInt(Naziv),
        zanr: podaci.get('zanr')
      });
      
    }
  
    return (
        <>
        Dodavanje novih filmova
        
        <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required />
            </Form.Group>
  
            <Form.Group className='mb-3' controlId='film'>
              <Form.Label>Film</Form.Label>
              <Form.Select 
              onChange={(e)=>{setFilmSifra(e.target.value)}}
              >
              {filmovi && filmovi.map((s,index)=>(
                <option key={index} value={s.sifra}>
                  {s.naziv}
                </option>
              ))}
              </Form.Select>
            </Form.Group>
  
  
  
            <hr />
            <Row>
                <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                <Link to={RouteNames.PROJEKCIJE_PREGLED}
                className="btn btn-danger siroko">
                Odustani
                </Link>
                </Col>
                <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                <Button variant="primary" type="submit" className="siroko">
                    Dodaj novi film
                </Button>
                </Col>
            </Row>
        </Form>
    </>
    );
  }