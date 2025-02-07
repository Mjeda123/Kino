import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'
import { Container } from 'react-bootstrap'
import NavBarEdunova from './components/NavBarEdunova'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constans'
import Pocetna from './pages/pocetna'

function App() {
  

  return (
    <>
      <Container>
        <NavBarEdunova />
        <Routes>
          <Route path={RouteNames.HOME} element={<Pocetna />} />
          <Route path={RouteNames.SMJER_PREGLEDA} element={<}



        </Routes>

        <hr />
        &copy; Edunova 2025
      </Container>
      
    </>
  )
}

export default App
