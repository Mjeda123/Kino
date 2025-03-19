import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'
import { Container } from 'react-bootstrap'
import NavBarEdunova from './components/NavBarEdunova'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constans'
import Pocetna from './pages/pocetna'
import DvoranePregled from './pages/dvorane/DvoranePregled'
import DvoraneDodaj from './pages/dvorane/DvoraneDodaj'
import DvoranePromjena from './pages/dvorane/DvoranePromjena'
import FilmoviPregled from './pages/filmovi/FilmoviPregled'
import FilmoviDodaj from './pages/filmovi/FilmoviDodaj'
import FilmoviPromjena from './pages/filmovi/FilmoviPromjena'
import GledateljiPregled from './pages/gledatelji/GledateljiPregled'
import GledateljiDodaj from './pages/gledatelji/GledateljiDodaj'
import GledateljiPromjena from './pages/gledatelji/GledateljiPromjena'
import ProjekcijePregled from './pages/projekcije/ProjekcijePregled'
import ProjekcijeDodaj from './pages/projekcije/ProjekcijeDodaj'
import ProjekcijePromjena from './pages/projekcije/ProjekcijePromjena'
import useError from './hooks/useError'
import EraDijagram from './pages/EraDijagram'
import ErrorModal from './components/ErrorModal'

function App() {
  
  const { isLoggedIn } = useAuth();
  const { errors, prikaziErrorModal, sakrijError } = useError();

  function godina(){
    const pocenta = 2024;
    const trenutna = new Date().getFullYear();
    if(pocenta===trenutna){
      return trenutna;
    }
    return pocenta + ' - ' + trenutna;
  }

  return (
    <>
    <LoadingSpinner />
    <ErrorModal show={prikaziErrorModal} errors={errors} onHide={sakrijError} />
      <Container className='aplikacija'>
        <NavBarEdunova />
        <Routes>
          <Route path={RouteNames.HOME} element={<Pocetna />} />
          {isLoggedIn ? (
        <>
        <Route path={RouteNames.NADZORNA_PLOCA} element={<NadzornaPloca />} />


          <Route path={RouteNames.DVORANE_PREGLED} element={<DvoranePregled />} />
          <Route path={RouteNames.DVORANE_NOVI} element={<DvoraneDodaj />} />
          <Route path={RouteNames.DVORANE_PROMJENA} element={<DvoranePromjena />} />
          <Route path={RouteNames.FILMOVI_PREGLED} element={<FilmoviPregled />} />
          <Route path={RouteNames.FILMOVI_NOVI} element={<FilmoviDodaj />} />
          <Route path={RouteNames.FILMOVI_PROMJENA} element={<FilmoviPromjena />} />
          <Route path={RouteNames.GLEDATELJI_PREGLED} element={<GledateljiPregled />} />
          <Route path={RouteNames.GLEDATELJI_NOVI} element={<GledateljiDodaj />} />
          <Route path={RouteNames.GLEDATELJI_PROMJENA} element={<GledateljiPromjena />} />
          <Route path={RouteNames.PROJEKCIJE_PREGLED} element={<ProjekcijePregled />} />
          <Route path={RouteNames.PROJEKCIJE_NOVI} element={<ProjekcijeDodaj />} />
          <Route path={RouteNames.PROJEKCIJE_PROMJENA} element={<ProjekcijePromjena />} />

          <Route path={RouteNames.ERA} element={<EraDijagram />} /> 

          </>
        ) : (
          <>
            <Route path={RouteNames.LOGIN} element={<Login />} />
          </>
        )}


         
        </Routes>

        <hr />
        &copy; Kino {godina()}
      </Container>
      
    </>
  )
}

export default App
