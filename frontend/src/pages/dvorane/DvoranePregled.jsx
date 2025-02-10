import { useEffect } from "react"
import DvoraneService from "../../services/DvoraneService"



export default function DvoranePregled()
{

    async function dohvatiDvorane() {
        const odgovor = DvoraneService.get()
    }

    useEffect(()=>{
        dohvatiDvorane();
    },[])


    return(

        <>
        Ovdje ćete vidjeti dvorane iz kina
        </>
    )







}