import { useEffect, useState } from "react"
import DvoraneService from "../../services/DvoraneService"
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RouteNames } from "../../constans";



export default function DvoranePregled()
{

    const[dvorane, setDvorane] = useState();

    async function dohvatiDvorane() {
        const odgovor = await DvoraneService.get()
        setDvorane(odgovor)
    }

    useEffect(()=>{
        dohvatiDvorane();
    },[])


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
                </tr>
            </thead>
            <tbody>
                {dvorane && dvorane.map((dvorana,index)=>(
                    <tr key={index}>
                        <td>
                            {dvorana.naziv}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )







}