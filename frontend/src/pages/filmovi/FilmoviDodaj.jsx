import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constans";
import { Button, Col, Form, Row } from "react-bootstrap";
import FilmoviService from "../../services/FilmoviService";



export default function FilmoviDodaj(){
    
    const Navigate = useNavigate();

    async function dodaj(film) {
        const odgovor = await FilmoviService.dodaj(film);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        Navigate(RouteNames.FILMOVI_PREGLED)
    }


    function odradiSubmit(e){
        e.preventDefault();

        let podaci = new FormData(e.target);

        dodaj(
            {
                naziv: podaci.get('naziv'),
                zanr: podaci.get('zanr')
            }
        )
    }


    return(
        <>
        Dodavanje filma 
        <Form onSubmit={odradiSubmit}>
    
            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required />
            </Form.Group>

            <Form.Group controlId="zanr">
                <Form.Label>Zanr</Form.Label>
                <Form.Control type="text" name="zanr"  />
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
                    Dodaj dvoranu
                  </Button>
               </Col>
            </Row>
    
    
        </Form>
    
    
    
        
        </>
        )
}