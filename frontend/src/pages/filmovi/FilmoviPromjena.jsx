import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FilmoviService from "../../services/FilmoviService";
import { RouteNames } from "../../constans";
import { Button, Col, Form, Row } from "react-bootstrap";




export default function FilmoviPromjena(){

    const Navigate = useNavigate();
    const [film,setFilm] = useState({});
    const routeParams= useParams();

    async function dohvatiFilmovi() {
        const odgovor = await FilmoviService.getBySifra(routeParams.sifra)
        setFilm(odgovor)
    }

    useEffect(()=>{
        dohvatiFilmovi();
    },[])

    async function promjena(film) {
        const odgovor = await FilmoviService.promjena(routeParams.sifra,naziv,zanr);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        Navigate(RouteNames.FILMOVI_PREGLED)
    }

    function odradiSubmit(e){
        e.preventDefault();

        let podaci = new FormData(e.target);

        promjena(
            {
                naziv: podaci.get('naziv'),
                zanr: podaci.get('zanr')
            }
        )
    }



    return(
        <>
        Promjena filma
        <Form onSubmit={odradiSubmit}>
            <Form.Group controlId='naziv'>
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required
                defaultValue={film.naziv}/>
            </Form.Group>
            <Form.Group controlId='zanr'>
                <Form.Label>Zanr</Form.Label>
                <Form.Control type="text" name="zanr" 
                defaultValue={film.naziv}/>
            </Form.Group>
        

        <hr />

        <Row>
            <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
               <Link
               to={RouteNames.FILMOVI_PREGLED}
               className="btn btn-danger siroko"
               >Odustani</Link>
            </Col>
            <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
               <Button variant="success" type="submit" className="siroko">
                Promjeni film
               </Button>
            </Col>
        </Row>
        </Form>
        </>
    )
}