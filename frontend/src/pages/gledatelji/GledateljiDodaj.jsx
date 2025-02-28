import { Link, useNavigate } from "react-router-dom";
import GledateljiService from "../../services/GledateljiService";
import { RouteNames } from "../../constans";
import { Button, Col, Form, Row } from "react-bootstrap";



export default function GledateljiDodaj(){

    const Navigate = useNavigate();

    async function dodaj(gledatelj) {
        const odgovor = await GledateljiService.dodaj(gledatelj);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        Navigate(RouteNames.GLEDATELJI_PREGLED)
    }

    function odradiSubmit(e){
        e.preventDefault();

        let podaci = new FormData(e.target);

        dodaj(
            {
                ime: podaci.get('ime'),
                prezime: podaci.get('prezime')
            }
        )
    }

    return(
        <>
        Dodavanje gledatelja 
        <Form onSubmit={odradiSubmit}>
    
            <Form.Group controlId="ime">
                <Form.Label>Ime</Form.Label>
                <Form.Control type="text" name="ime" required />
            </Form.Group>

            <Form.Group controlId="prezime">
                <Form.Label>Prezime</Form.Label>
                <Form.Control type="text" name="prezime" required />
            </Form.Group>
    
            <hr />
    
            <Row>
               <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                  <Link
                  to={RouteNames.GLEDATELJI_PREGLED}
                  className="btn btn-danger siroko"
                  >Odustani</Link>
               </Col>
               <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                  <Button variant="success" type="submit" className="siroko">
                    Dodaj gledatelja
                  </Button>
               </Col>
            </Row>
    
    
        </Form>
    
    
    
        
        </>
        )
}