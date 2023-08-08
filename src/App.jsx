import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import { Navbarr, Home, SectionDoctorsMain, Error404, Join, Register, RegisterDoc, Footerr, Contact, AboutUs, Turnos, SacarTurno, PanelUser, Test } from './components/'

function App() {
  return (
    <div className='App'>
      <Navbarr/>
      <Routes>
        <Route path='/AboutUs' element={<AboutUs/>}></Route>
        <Route path='/Contact' element={<Contact/>}></Route>
        <Route path='/Turnos' element={<Turnos/>}></Route>
        <Route path='/Join' element={<Join/>}></Route>
        <Route path='/Register' element={<Register/>}></Route>
        <Route path='/RegisterDoc' element={<RegisterDoc/>}></Route>
        <Route path='/error404' element={<Error404/>} />
        <Route path='*' element={<SacarTurno/>} />
        <Route path='/panelUser' element={<PanelUser/>} /> 
        <Route path='/test' element={<Test/>} /> 
      </Routes>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
      <Routes>
        <Route path='/' element={<SectionDoctorsMain/>} />
      </Routes>
      <Footerr/>
    </div>
  )
}

export default App
