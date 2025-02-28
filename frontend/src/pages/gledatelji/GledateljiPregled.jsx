import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GledateljiService from "../../services/GledateljiService";
import { RouteNames } from "../../constans";
import { Button, Table } from "react-bootstrap";



export default function GledateljiPregled()
{
    const[gledatelji, setGledatelji] = useState();
    const Navigate = useNavigate();

    async function dohvatiGledatelji() {
        const odgovor = await GledateljiService.get()
        setGledatelji(odgovor)
    }

    useEffect(()=>{
        dohvatiGledatelji();
    },[])

    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return;
        }
        brisanjeGledatelji(sifra);
    }

    async function brisanjeGledatelji(sifra) {
        const odgovor = await GledateljiService.obrisi(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiGledatelji();
    }

    return(


        <>
        <Link
        to={RouteNames.GLEDATELJI_NOVI}
        className="btn btn-success siroko"
        >Dodaj novog gledatelja</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {gledatelji && gledatelji.map((gledatelj,index)=>(
                    <tr key={index}>
                        <td>
                            {gledatelj.ime}
                        </td>
                        <td>
                            {gledatelj.prezime}
                        </td>
                        <td>
                            <Button
                            onClick={()=>Navigate(`/gledatelji/${gledatelj.sifra}`)}
                            >Promjena</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                            variant="danger"
                            onClick={()=>obrisi(gledatelj.sifra)}
                            >Obriši</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )

}