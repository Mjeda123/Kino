import { useEffect, useState } from "react";
import useLoading from "../hooks/useLoading";
import { Col, Row } from "react-bootstrap";
import FilmoviService from "../services/FilmoviService";
import GledateljiService from "../services/GledateljiService";
import CountUp from "react-countup";




export default function Pocetna(){
    
    const { showLoading, hideLoading } = useLoading();

    const [gledatelja, setGledatelja] = useState(0);
    const [filmovi, setFilmovi] = useState([]);

    async function dohvatiFilmovi() {
        
        await FilmoviService.dostupniFilmovi()
        .then((odgovor)=>{
            setFilmovi(odgovor);
        })
        .catch((e)=>{console.log(e)});

    }

    async function dohvatiBrojGledatelja() {
        await GledateljiService.ukupnoGledatelja()
        .then((odgovor)=>{
            setGledatelja(odgovor.poruka);
        })
        .catch((e)=>{console.log(e)});
    }


    async function ucitajPodatke() {
        showLoading();
        await dohvatiFilmovi();
        await dohvatiBrojGledatelja();
        hideLoading();
      }


    useEffect(()=>{
        ucitajPodatke()
    },[]);

   

    return(
        <>
        <Row>
           
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                    Filmovi u planu:
                    <ul>
                    {filmovi && filmovi.map((film,index)=>(
                            <li key={index}>{film.naziv}</li>
                            
                    ))}
                    </ul>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                    Broj gledatelja koji je gledao film
                    <div className="brojGledatelja">
                    <CountUp
                    start={0}
                    end={gledatelja}
                    duration={10}
                    separator="."></CountUp>
                    </div>
                    gledatelj
                    </Col>
                </Row>
            </>
    )



}