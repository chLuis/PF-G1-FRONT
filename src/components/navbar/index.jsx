import './navbar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ClimaApi } from '../climaAPI/index.jsx';
import { useSelector, useDispatch } from "react-redux";
import { getDoctors, logoutUser } from '../../redux/actions';
import Swal from 'sweetalert2';

export const Navbarr = () => { 
  
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.userReducer) || "";
  

  const [isOpen, setIsOpen] = useState(false); // Abre o cierra el panel de opciones cuando estamos en tamañó mobile
  const [mostrar, setMostrar] = useState(false) // muestra btn de login cuando no hay usuario conectado
  //const [isLog, setIsLog] = useState(user)
  //const [logBtn, setLogBtn] = useState("navbar-links navbar-login")
  //const [saludo, setSaludo] = useState("navbar-bienvenida")
 // const [isOpen, setIsOpen] = useState(false);
  //const nombre_usuario = "Ricardo"
  //const [isLog, setIsLog] = useState(false)
  //const [logBtn, setLogBtn] = useState("navbar-links navbar-login")
  //const [saludo, setSaludo] = useState("navbar-bienvenida show")
  


  //dispatch(getDoctors())
  console.log("hola")
  console.log(user)
  useEffect (() => {
    salirTest()
  },[user])

//console.log("mostrar", mostrar, user)

  function salirTest() {
    dispatch(getDoctors())
    if(user){
      setMostrar(false)
    } else {
      setMostrar(true)
    }
  }

  function logOut() {
      dispatch(logoutUser())
      Swal.fire({
        icon: 'success',
        title: 'Desconectado',
      })
      return window.location.reload()
    }

  return (
    <Navbar className="m-0 navbar-bg">
        <Container className='navbar-container'>
          <Navbar.Brand href='/' className='navbar-logo'>
          </Navbar.Brand>
          <Navbar.Brand><h5><ClimaApi/></h5></Navbar.Brand>
          <div className={`navbar-toggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={`navbar-options ${isOpen && "open"}`}>
              <Nav.Link onClick={() => setIsOpen(!isOpen)} className='navbar-links' as={Link} to="/">
                <i className="fa-solid fa-house"></i><span className='navbar-links-text'>Home</span>
              </Nav.Link>
              <Nav.Link onClick={() => setIsOpen(!isOpen)} href="#link" as={Link} to="/Turnos" className='navbar-links navbar-turnos'>
                <i className="fa-regular fa-calendar"></i><span className='navbar-links-text'>Turnos</span>
              </Nav.Link>
              <Nav.Link onClick={() => setIsOpen(!isOpen)} className='navbar-links' as={Link} to="/AboutUs">
                <i className="fa-regular fa-address-card"></i><span className='navbar-links-text'>About Us</span>
              </Nav.Link>
              <Nav.Link onClick={() => setIsOpen(!isOpen)} className='navbar-links' as={Link} to="/Contact">
                <i className="fa-regular fa-paper-plane"></i><span className='navbar-links-text'>Contact</span>
              </Nav.Link>
              <NavDropdown title="🥼 Especialistas" id="basic-nav-dropdown" className='navbar-links-drop'>
                <NavDropdown.Item href="/#Cardiología" onClick={() => setIsOpen(!isOpen)} className='navbar-dropdown-links'>
                  <span>Cardiología</span>
                </NavDropdown.Item>
                <NavDropdown.Item href="/#Dermatología" onClick={() => setIsOpen(!isOpen)} className='navbar-dropdown-links'>
                  <span>Dermatología</span>
                </NavDropdown.Item>
                <NavDropdown.Item href="/#Neurología" onClick={() => setIsOpen(!isOpen)} className='navbar-dropdown-links'>
                  <span>Neurología</span>
                </NavDropdown.Item>
                <NavDropdown.Item href="/#Obstetricia" onClick={() => setIsOpen(!isOpen)} className='navbar-dropdown-links'>
                  <span>Obstetricia</span></NavDropdown.Item>
                <NavDropdown.Item href="/#Odontología" onClick={() => setIsOpen(!isOpen)} className='navbar-dropdown-links'>
                  <span>Odontología</span>
                </NavDropdown.Item>
                <NavDropdown.Item href="/#Traumatología" onClick={() => setIsOpen(!isOpen)} className='navbar-dropdown-links'>
                  <span>Traumatología</span>
                </NavDropdown.Item>
              </NavDropdown>
              {mostrar &&
              <span className="navbar-links navbar-login">
                <Nav.Link as={Link} to="/Join" onClick={() => setIsOpen(!isOpen)}>
                  Inicio
                </Nav.Link>
              </span>}
              {!mostrar &&
              <span className="navbar-bienvenida show">
                <span>
                <Nav.Link as={Link} to="/panelUser" onClick={() => setIsOpen(!isOpen)}>
                <span className='nombre-user'>
                  Bienvenido {user}
                </span>
                </Nav.Link>
                </span>
                <span className='logout' onClick={logOut}>
                  Log out
                </span>
              </span>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      );
    }
