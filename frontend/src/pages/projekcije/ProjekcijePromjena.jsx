import { Button, Col, Row } from "react-bootstrap";
import { RouteNames } from "../../constans";
import FilmoviService from "../../services/FilmoviService";
import GledateljiService from "../../services/GledateljiService";
import { Link } from "react-router-dom";


export default function ProjekcijePromjena() {
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const routeParams = useParams();
    const { prikaziError } = useError();
  
    const [filmovi, setFilmovi] = useState([]);
    const [FilmSifra, setFilmSifra] = useState(0);
    const [gledatelji, setGledatelji] = useState([]);
    const [pronadeniGledatelji, setPronadeniGledatelji] = useState([]);
  
    const [projekcija, setProjekcija] = useState({});
  
    const typeaheadRef = useRef(null);
  
    async function dohvatiFilmovi(){
      const odgovor = await FilmoviService.get();
      setFilmovi(odgovor.poruka);
    }
  
    async function dohvatiProjekcija() {
      const odgovor = await Service.getBySifra(routeParams.sifra);
      if(odgovor.greska){
        prikaziError(odgovor.poruka);
        return;
    }
      let projekcija = odgovor.poruka;
      setProjekcija(projekcija);
      setFilmSifra(projekcija.filmSifra); 
    }
  
    async function dohvatiGledatelji() {
      const odgovor = await Service.getGledatelji(routeParams.sifra);
      if(odgovor.greska){
        prikaziError(odgovor.poruka);
        return;
      }
      setGledatelji(odgovor.poruka);
    }
  
    async function traziGledatelji(uvjet) {
      const odgovor =  await GledateljiService.traziGledatelji(uvjet);
      if(odgovor.greska){
        prikaziError(odgovor.poruka);
        return;
      }
      setPronadeniGledatelji(odgovor.poruka);
    }
  
    async function dodajGledatelji(e) {
      showLoading();
      const odgovor = await GledateljiService.dodajGledatelji(routeParams.sifra, e[0].sifra);
      hideLoading();
      if(odgovor.greska){
        prikaziError(odgovor.poruka);
        return;
      }
        await dohvatiGledatelji();
        typeaheadRef.current.clear();
    }
  
    async function obrisiGledatelji(gledatelji) {
      showLoading();
      const odgovor = await GledateljiService.obrisiGledatelji(routeParams.sifra, gledatelji);
      hideLoading();
      if(odgovor.greska){
        prikaziError(odgovor.poruka);
        return;
      }
        await dohvatiGledatelji();
    }
  
  
    async function dohvatiInicijalnePodatke() {
      showLoading();
      await dohvatiFilmovi();
      await dohvatiProjekcija();
      await dohvatiGledatelji();
      hideLoading();
    }
  
  
    useEffect(()=>{
      dohvatiInicijalnePodatke();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
  
    async function promjena(e){
      showLoading();
      const odgovor = await Service.promjena(routeParams.sifra,e);
      hideLoading();
      if(odgovor.greska){
          prikaziError(odgovor.poruka);
          return;
      }
      navigate(RouteNames.PROJEKCIJE_PREGLED);
  }
  
    function obradiSubmit(e) {
      e.preventDefault();
  
      const podaci = new FormData(e.target);
  
  
      promjena({
        film: podaci.get('film'),
        filmsifra: parseInt(filmsifra),
        termin: podaci.get('termin'),
        dvoranasifra: parseInt(dvoranasifra)
      });
    }
  
    return (
        <>
        Mjenjanje podataka projekcije
        <Row>
          <Col key='1' sm={12} lg={6} md={6}>
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="film">
                    <Form.Label>Film</Form.Label>
                    <Form.Control type="text" name="film" required defaultValue={projekcije.film}/>
                </Form.Group>
  
                <Form.Group className='mb-3' controlId='gledatelj'>
                  <Form.Label>Gledatelji</Form.Label>
                  <Form.Select
                  value={Ime}
                  onChange={(e)=>{setGledatelji(e.target.value)}}
                  >
                  {termin && termin.map((s,index)=>(
                    <option key={index} value={s.sifra}>
                      {s.naziv}
                    </option>
                  ))}
                  </Form.Select>
                </Form.Group>
  
                <Form.Group controlId="dvorana">
                    <Form.Label>Dvorana</Form.Label>
                    <Form.Control type="text" name="dvorana" required defaultValue={projekcija.dvorana}/>
                </Form.Group>
  
                <Form.Group controlId="termin">
                    <Form.Label>Termin</Form.Label>
                    <Form.Control type="datetime" name="termin" defaultValue={projekcija.termin}/>
                </Form.Group>
  
  
                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                    <Link to={RouteNames.PROJEKCIJE_PREGLED}
                    className="btn btn-danger siroko">
                    Odustani
                    </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                    <Button variant="primary" type="submit" className="siroko">
                        Promjeni 
                    </Button>
                    </Col>
                </Row>
            </Form>
          </Col>
          <Col key='2' sm={12} lg={6} md={6}>
          <div style={{overflow: 'auto', maxHeight:'400px'}}>
          <Form.Group className='mb-3' controlId='uvjet'>
            <Form.Label>Traži gledatelja</Form.Label>
              <AsyncTypeahead
              className='autocomplete'
              id='uvjet'
              emptyLabel='Nema rezultata'
              searchText='Tražim...'
              labelKey={(gledatelji) => `${gledatelji.prezime} ${gledatelji.ime}`}
              minLength={3}
              options={pronadeniGledatelji}
              onSearch={traziGledatelji}
              placeholder='dio imena ili prezimena'
              renderMenuItemChildren={(polaznik) => (
                <>
                  <span>
                     {gledatelji.prezime} {gledatelji.ime}
                  </span>
                </>
              )}
              onChange={dodajGledatelji}
              ref={typeaheadRef}
              />
            </Form.Group>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Gledatelji u kinu</th>
                  <th>Akcija</th>
                </tr>
              </thead>
              <tbody>
                {gledatelji &&
                  gledatelji.map((gledatelj, index) => (
                    <tr key={index}>
                      <td>
                         {gledatelj.ime} {gledatelj.prezime}
                        
                      </td>
                      <td>
                        <Button variant='danger' onClick={() =>
                            obrisiGledatelji(gledatelj.sifra)
                          } >
                          <FaTrash />
                        </Button>
        
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            </div>
          </Col>
          </Row>
          </>
    );
  }