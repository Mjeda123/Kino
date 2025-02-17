import { useEffect, useState } from "react"
import DvoraneService from "../../services/DvoraneService"
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constans";



export default function DvoranePregled()
{

    const[dvorane, setDvorane] = useState();
    const Navigate = useNavigate();

    async function dohvatiDvorane() {
        const odgovor = await DvoraneService.get()
        setDvorane(odgovor)
    }

    useEffect(()=>{
        dohvatiDvorane();
    },[])

    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return;
        }
        brisanjeDvorane(sifra);
    }

    async function brisanjeDvorane(sifra) {
        const odgovor = await DvoraneService.obrisi(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiDvorane();
    }


    return(

        <>
        <Link
        to={RouteNames.DVORANE_NOVI}
        className="btn btn-success siroko"
        >Dodaj novu dvoranu</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {dvorane && dvorane.map((dvorana,index)=>(
                    <tr key={index}>
                        <td>
                            {dvorana.naziv}
                        </td>
                        <td>
                            <Button
                            onClick={()=>Navigate(`/dvorane/${dvorana.sifra}`)}
                            >Promjena</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                            variant="danger"
                            onClick={()=>obrisi(dvorana.sifra)}
                            >Obriši</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )







}