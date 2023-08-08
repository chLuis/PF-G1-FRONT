import { useSelector, useDispatch } from "react-redux";
import { getDoctors, getDoctor, putDoctor, getPacientes, getPaciente, getUser, logoutUser } from "../../redux/actions";
import { json, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import './test.css';


export const Test = () => {

    const dispatch = useDispatch();
    //const navigate = useNavigate();

    const doctors = useSelector((state) => state.userReducer.doctors);
    //const doctor = useSelector((state) => state.doctor);
    //const paciente = useSelector((state) => state.paciente);
    //const pacientes = useSelector((state) => state.pacientes);
    const user = useSelector((state) => state.dataRoot.user);
    const usuarioLogeado = useSelector((state) => state.userReducer.user);

    //let usuarioConectado = JSON.parse(localStorage.getItem('logeo'));

    const [name, setName] = useState('');
    const [nameI, setNameI] = useState('');
    const [pacienteName, setPacienteName] = useState('');
    const [pacientesNames, setPacientesNames] = useState('');
    const [usuario, setUsuario] = useState('');
    const [pacientesPass, setPacientesPass] = useState('');

    const handleSubmitDoctor = (e) => {
        e.preventDefault();
        console.log("Log handleSubmitDoctor")
        console.log("evalue")
        console.log(nameI)
        console.log("Ya paso el value")
        dispatch(getDoctor(nameI));
        //navigate('/doctors');
    }

    const handleSubmitDoctors = (e) => {
        e.preventDefault();
        console.log(e.target)
        dispatch(getDoctors(name));
        //navigate('/test');

    }

    const handleSubmitPaciente = (e) => {
        e.preventDefault();
        console.log(e.target)
        dispatch(getPaciente(pacienteName));
        //navigate('/doctors');
    }

    const handleSubmitPacientes = (e) => {
        e.preventDefault();
        console.log(e.target)
        dispatch(getPacientes(pacientesNames));
        //navigate('/doctors');
    }

    function changeAprobado(doctorId, aprobado) {
        dispatch(putDoctor(doctorId, aprobado))
    }
    
    useEffect(() => {
        dispatch(getDoctors());
    },[dispatch])
    // useEffect(() => {
    //     dispatch(setUser(user));
    // },[])



    async function handleSubmitUsuario(e) {
        e.preventDefault();
        //console.log(usuario)
        dispatch(getUser(usuario, pacientesPass));
        //console.log("Estamos");
        //console.log(dispatch(getUser(usuario, pacientesPass)))
    }

    const handleSubmitPass = (e) => {
        e.preventDefault();
        
        console.log(usuario)
        console.log(pacientesPass)
        dispatch(logoutUser());
        //dispatch(setUser(usuario, pacientesPass));
        //dispatch(postUser(pacientesUser));
        //dispatch(postUser(pacientesPass));
        
        //dispatch(getPacientes(pacientesPass));
    }



    return (
        <>
        <h4 className="test-title">Administracion de doctores TEST</h4>
        <div className="test">
                <input
                    type="text"
                    placeholder="Search Doctor"
                    value={nameI}
                    onChange={(e) => setNameI(e.target.value)}
                    
                />
                <button onClick={handleSubmitDoctor}>Search DOCTOR</button>


  
                <input
                    type="text"
                    placeholder="Search Doctors"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={handleSubmitDoctors}>Search DOCTORS</button>



                <input
                    type="text"
                    placeholder="Search Paciente"
                    value={pacienteName}
                    onChange={(e) => setPacienteName(e.target.value)}
                />
                <button onClick={handleSubmitPaciente}>Search PACIENTE</button>


        
                <input
                    type="text"
                    placeholder="Search Pacientes"
                    value={pacientesNames}
                    onChange={(e) => setPacientesNames(e.target.value)}
                />
                <button onClick={handleSubmitPacientes}>Search PACIENTES</button>



                <input
                    type="text"
                    style={{color: 'red'}}
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />
                <button onClick={handleSubmitUsuario}>Traer al usuario</button>


                <input
                    type="text"
                    placeholder="Contraseña"
                    value={pacientesPass}
                    onChange={(e) => setPacientesPass(e.target.value)}
                />
                <button onClick={handleSubmitPass}>Log out</button>


                <div className="doctores">
                    {doctors.map((doctor, i) => doctor.aprobado === false ? (
                        <div key={i} className="doctor">
                            <p>ID: {doctor.id_user}</p>
                            <p>Nombre: {doctor.nombre}</p>
                            <p>Apellido: {doctor.apellido}</p>
                            <p>Email: {doctor.email}</p>
                            <p>Telefono: {doctor.telefono}</p>
                            <p>DNI: {doctor.dni}</p>
                            <p>Aprobado: {doctor.aprobado?"Si" : "No"}</p>
                            <p>especialidad: {doctor.especialidad}</p>
                            <button onClick={() => changeAprobado(doctor, true)}>Aprobar</button>
                        </div>) : null)}
                </div>

                <div>
                    {usuarioLogeado? <div><span>Usuario: {usuarioLogeado.nombre}</span> - 
                    <span> {usuarioLogeado.password}</span></div>: console.log(usuarioLogeado)}
                    
                </div>
    </div></>
)}