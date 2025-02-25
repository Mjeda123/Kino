import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FilmoviService from "../../services/FilmoviService";
import { RouteNames } from "../../constans";
import { Button, Table } from "react-bootstrap";




export default function FilmoviPregled()
{
    const[filmovi, setFilmovi] = useState();
    const Navigate = useNavigate();

    async function dohvatiFilmovi() {
        const odgovor = await FilmoviService.get()
        setFilmovi(odgovor)
    }

    useEffect(()=>{
        dohvatiFilmovi();
    },[])

    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return;
        }
        brisanjeFilmovi(sifra);
    }

    async function brisanjeFilmovi(sifra) {
        const odgovor = await FilmoviService.obrisi(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiFilmovi();
    }

    return(


        <>
        <Link
        to={RouteNames.FILMOVI_NOVI}
        className="btn btn-success siroko"
        >Dodaj novi film</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Zanr</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {filmovi && filmovi.map((film,index)=>(
                    <tr key={index}>
                        <td>
                            {film.naziv}
                        </td>
                        <td>
                            {film.zanr}
                        </td>
                        <td>
                            <Button
                            onClick={()=>Navigate(`/filmovi/${film.sifra}`)}
                            >Promjena</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                            variant="danger"
                            onClick={()=>obrisi(film.sifra)}
                            >Obriši</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}