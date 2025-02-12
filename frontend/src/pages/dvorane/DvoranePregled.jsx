import { useEffect, useState } from "react"
import DvoraneService from "../../services/DvoraneService"
import { Table } from "react-bootstrap";



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