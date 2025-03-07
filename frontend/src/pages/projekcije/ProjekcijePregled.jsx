import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import ProjekcijeService from "../../services/ProjekcijeService";
import { RouteNames } from "../../constans";
import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";

export default function ProjekcijePregled(){
    const [projekcije,setProjekcije] = useState();
    let navigate = useNavigate(); 
    const { showLoading, hideLoading } = useLoading();
    const { prikaziError } = useError();

    async function dohvatiProjekcije(){
        showLoading();
        await ProjekcijeService.get()
        .then((odgovor)=>{
            //console.log(odgovor);
            setProjekcije(odgovor);
        })
        .catch((e)=>{console.log(e)});
        hideLoading();
    }

    async function obrisiProjekciju(sifra) {
        showLoading();
        const odgovor = await Service.obrisi(sifra);
        hideLoading();
        //console.log(odgovor);
        if(odgovor.greska){
            prikaziError(odgovor.poruka);
            return;
        }
        dohvatiProjekcije();
    }

    useEffect(()=>{
        dohvatiProjekcije();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    return (

        <Container>
            <Link to={RouteNames.PROJEKCIJE_NOVI} className="btn btn-success siroko">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Film</th>
                        <th>Termin</th>
                        <th>Dvorana</th>
                    </tr>
                </thead>
                <tbody>
                    {projekcije && projekcije.map((entitet,index)=>(
                        <tr key={index}>
                            <td>{entitet.FilmNaziv}</td>
                            <td>{entitet.Termin}</td>
                            <td>{entitet.DvoranaNaziv}</td>
                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/projekcije/${entitet.sifra}`)}}
                                    >
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                               
                                
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={() => obrisiProjekciju(entitet.sifra)}
                                    >
                                        <FaTrash
                                        size={25}/>
                                    </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}