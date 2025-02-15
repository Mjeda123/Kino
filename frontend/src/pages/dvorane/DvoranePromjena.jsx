import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constans";
import DvoraneService from "../../services/DvoraneService";
import { useEffect, useState } from "react";


export default function DvoranePromjena(){

    const Navigate = useNavigate();
    const [dvorana,setDvorana] = useState({});
    const routeParams = useParams();

    async function dohvatiDvorane() {
        const odgovor = await DvoraneService.getBySifra(routeParams.sifra)
        setDvorana(odgovor)
    }

    useEffect(()=>{
        dohvatiDvorane();
    },[])

    async function dodaj(dvorana) {
        const odgovor = DvoraneService.dodaj(dvorana);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        Navigate(RouteNames.DVORANE_PREGLED)

        
    }


    function odradiSubmit(e){
        e.preventDefault();

        let podaci = new FormData(e.target);

        dodaj(
            {
  
                naziv: podaci.get('naziv')
            }
        );
        
    }




    return(
    <>
    Dodavanje smjera
    <Form onSubmit={odradiSubmit}>

        <Form.Group controlId="naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="naziv" required
            defaultValue={dvorana.naziv}/>
        </Form.Group>

        <hr />

        <Row>
           <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
              <Link
              to={RouteNames.DVORANE_PREGLED}
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