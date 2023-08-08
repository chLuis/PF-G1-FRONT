import { Link } from 'react-router-dom';
import "./register.css"
import { useState } from 'react';
import Swal from 'sweetalert2';
import { postPaciente } from '../../redux/actions';
import { useDispatch } from 'react-redux';

export const Register = () => {
    const dispatch = useDispatch();

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [dni, setDni] = useState('')
    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [mail, setMail] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [obra, setObra] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!isNaN(nombre) || !/^[\p{L}\s]+$/u.test(nombre)) {
            Swal.fire({
                icon: 'error',
                title: 'NOMBRE: datos incorrectos!',
                text: 'El nombre sólo debe contener letras.',
              })
              return
        }
        if (!isNaN(apellido) || !/^[\p{L}\s]+$/u.test(apellido)) {
            Swal.fire({
                icon: 'error',
                title: 'APELLIDO: datos incorrectos!',
                text: 'El apellido sólo debe contener letras.',
              })
              return
        }
        if ( dni.length < 7 || dni.length > 10 || dni <= 0 ){
            Swal.fire({
                icon: 'error',
                title: 'DNI: datos incorrectos!',
                text: 'El DNI debe tener entre 7 y 10 caracteres.',
              })
              return
        }
        if (Number.isNaN(Number(dni))) {
            Swal.fire({
                icon: 'error',
                title: 'DNI: datos incorrectos!',
                text: 'El DNI debe ser numérico.',
              })
              return
        }
        if (!/^[a-zA-Z0-9\u00C0-\u024F\s]+$/.test(direccion)) {
            Swal.fire({
                icon: 'error',
                title: 'DIRECCION: datos incorrectos!',
                text: 'La direccion sólo debe contener letras y numeros.',
              })
              return
        }
        if (Number.isNaN(Number(telefono))) {
            Swal.fire({
                icon: 'error',
                title: 'TELEFONO: datos incorrectos!',
                text: 'El teléfono debe ser numérico.',
              })
              return
        }
        if ( telefono.length < 0 || telefono.length > 15 || telefono <= 0 ){
            Swal.fire({
                icon: 'error',
                title: 'TELEFONO: datos incorrectos!',
                text: 'El teléfono debe tener como máximo 15 numeros.',
              })
              return
        }
        const fechaNacimientoDate = new Date(fechaNacimiento);
        const currentDate = new Date();
        if (fechaNacimientoDate > currentDate) {
            Swal.fire({
                icon: 'error',
                title: 'FECHA DE NACIMIENTO: datos incorrectos!',
                text: 'La fecha de nacimiento debe ser una fecha válida.',
              })
              return
        }
        if (!isNaN(obra) || !/^[\p{L}\s]+$/u.test(obra)) {
            Swal.fire({
                icon: 'error',
                title: 'OBRA SOCIAL: datos incorrectos!',
                text: 'La Obra Social sólo debe contener letras.',
              })
              return
        }
        if ( password.length > 20 ){
            Swal.fire({
                icon: 'error',
                title: 'CONTRASEÑA: datos incorrectos!',
                text: 'La contraseña debe tener como máximo 20 caracteres.'
              })
              return
        }
        if ( password != passwordRepeat){
            Swal.fire({
                icon: 'error',
                title: 'CONTRASEñA: datos incorrectos!',
                text: 'Las contraseñas deben coincidir.'
              })
              return
        }
        
        let user = {
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            direccion: direccion,
            telefono: telefono,
            mail: mail,
            fechaNacimiento: fechaNacimiento,
            obraSocial: obra,
            password: password
        }

        if(user){
            dispatch(postPaciente(user))
        }
    
        /* setNombre('');
        setApellido('');
        setDni('');
        setDireccion('');
        setTelefono('');
        setMail('');
        setFechaNacimiento('');
        setObra('');
        setPassword('');
        setPasswordRepeat(''); */
      };
    
      const [isFocused, setIsFocused] = useState(false);
      const handleInputChange = (e) => {
        setFechaNacimiento(e.target.value);
      };
      const handleInputFocus = () => {
        setIsFocused(true);
      };
      const handleInputBlur = () => {
        if (fechaNacimiento === '') {
          setIsFocused(false);
        }
      };

    return (
    <div className="cuerpo2">
        <div className="wrapper2">
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <h2>Registrarse como Paciente</h2>
                    <div className="input-group">
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
                        <label>Nombre</label>
                    </div>
                    <div className="input-group">
                        <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required/>
                        <label>Apellido</label>
                    </div>
                    <div className="input-group">
                        <input type="text" value={dni} onChange={(e) => setDni(e.target.value)} required/>
                        <label>DNI</label>
                    </div>
                    <div className="input-group">
                        <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required/>
                        <label>Dirección</label>
                    </div>
                    <div className="input-group">
                        <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required/>
                        <label>Teléfono</label>
                    </div>
                    <div className="input-group">
                        <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} required/>
                        <label>Email</label>
                    </div>
                    <div className="input-group">
                        <input
                            type="date"
                            className={`date-input ${isFocused ? 'active' : ''}`}
                            value={fechaNacimiento}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            required
                        />
                        <label>Fecha de Nacimiento</label>
                    </div>
                    <div className="input-group">
                        <input type="text" value={obra} onChange={(e) => setObra(e.target.value)} required/>
                        <label>Obra Social</label>
                    </div>
                    <div className="input-group">
                        <input type={showPassword1 ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        <label>Contraseña</label>
                        <div className="Eye" onClick={() => setShowPassword1(!showPassword1)}>
                                        {showPassword1 ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
                                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
                                        <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                                        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                                        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                                        </svg>}
                                    </div>
                    </div>
                    <div className="input-group">
                        <input type={showPassword2 ? "text" : "password"} value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} required/>
                        <label>Confirmar Contraseña</label>
                        <div className="Eye" onClick={() => setShowPassword2(!showPassword2)}>
                                        {showPassword2 ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
                                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
                                        <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                                        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                                        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                                        </svg>}
                                    </div>
                    </div>
                    <button type="submit">Registrarse</button>
                    <div className="join-link">
                        <p>Tienes cuenta? <Link to="/Join">Ingresar</Link> </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
  )
}