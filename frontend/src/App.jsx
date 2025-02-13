import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'
import { Container } from 'react-bootstrap'
import NavBarEdunova from './components/NavBarEdunova'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constans'
import Pocetna from './pages/pocetna'
import DvoranePregled from './pages/dvorane/DvoranePregled'
import DvoraneDodaj from './pages/dvorane/DvoraneDodaj'

function App() {
  

  return (
    <>
      <Container>
        <NavBarEdunova />
        <Routes>
          <Route path={RouteNames.HOME} element={<Pocetna />} />
          <Route path={RouteNames.DVORANE_PREGLED} element={<DvoranePregled />} />
          <Route path={RouteNames.DVORANE_NOVI} element={<DvoraneDodaj />} />



        </Routes>

        <hr />
        &copy; Edunova 2025
      </Container>
      
    </>
  )
}

export default App
