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

function App() {
  

  return (
    <>
      <Container>
        <NavBarEdunova />
        <Routes>
          <Route path={RouteNames.HOME} element={<Pocetna />} />
          <Route path={RouteNames.DVORANE_PREGLED} element={<DvoranePregled />} />
          <Route path={RouteNames.DVORANE_NOVI} element={<DvoraneDodaj />} />
          <Route path={RouteNames.DVORANE_PROMJENA} element={<DvoranePromjena />} />
          <Route path={RouteNames.FILMOVI_PREGLED} element={<FilmoviPregled />} />
          <Route path={RouteNames.FILMOVI_NOVI} element={<FilmoviDodaj />} />
          <Route path={RouteNames.FILMOVI_PROMJENA} element={<FilmoviPromjena />} />
          <Route path={RouteNames.GLEDATELJI_PREGLED} element={<GledateljiPregled />} />
          <Route path={RouteNames.GLEDATELJI_NOVI} element={<GledateljiDodaj />} />
          <Route path={RouteNames.GLEDATELJI_PROMJENA} element={<GledateljiPromjena />} />


         
        </Routes>

        <hr />
        &copy; Kino 2025
      </Container>
      
    </>
  )
}

export default App
