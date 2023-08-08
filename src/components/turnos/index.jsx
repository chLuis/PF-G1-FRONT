import "./turnos.css"
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { postTurno } from "../../redux/actions";

export const Turnos = () => {

    const dispatch = useDispatch()
    
    const doctors = useSelector((state) => state.userReducer.doctors)
    const user = useSelector((state) => state.userReducer.dni)
    
    const [dni, setDni] = useState(user)
    const [especialidadSeleccionadaInput, setEspecialidadSeleccionadaInput] = useState("")
    const [medico, setMedico] = useState("")
    const [fecha, setFecha] = useState("")
    const [hora, setHora] = useState("")
    const [motivo, setMotivo] = useState("")


    function handleMedic(e) {
        setMedico(e.target.value)
        console.log(medico)
    }
    function handleFecha(e) {
        setFecha(e.target.value)
    }
    function handleHora(e) {
        setHora(e.target.value)
    }
    function handleMotivo(e) {
        setMotivo(e.target.value)
    }

    function handleEspecialidad(e) {
        setEspecialidadSeleccionadaInput(e.target.value)
    }
    

    function turnoSet(e) {
        e.preventDefault()
        console.log("dni-paciente",dni)
        console.log(especialidadSeleccionadaInput)
        console.log("dni-medico",Number(medico))
        console.log(fecha)
        console.log(hora)
        console.log(motivo)
        const turno = {
            dniPaciente: dni,
            especialidad: especialidadSeleccionadaInput,
            dniDoctor: Number(medico),
            fecha: fecha,
            horario: hora,
            motivo: motivo
        }
        turno?dispatch(postTurno(turno)):null

        //console.log(e.target.value)
    }



    return (

    <div className="turnos form-wrapper">
        <form className="formularioTurnos" onSubmit={turnoSet}>
            <h2>Solicitar Turno</h2>
            <div className="input-group-turns">
            <div className="input-group-turns">
                <input type="text" required value={user} disabled/>
                <label></label>
            </div>
            <label>Tipo de Consulta</label>
                <select type="text" className="select-especialidad-turno" required defaultValue={"Selecciona una especialidad"} onChange={handleEspecialidad}>
                            <option disabled >Selecciona una especialidad</option>
                            <option value="Cardiología">Cardiología</option>
                            <option value="Dermatología">Dermatología</option>
                            <option value="Neurología">Neurología</option>
                            <option value="Obstetricia">Obstetricia</option>
                            <option value="Odontología">Odontología</option>
                            <option value="Traumatología">Traumatología</option>
                </select>
            </div>
            <div>
                <label>Medico</label>
                <select type="text" className="select-especialidad-turno" required onChange={handleMedic}>
                    <option disabled value={-1}>Selecciona un/a doctor/a</option>
                        {doctors?.map((doctor, i) => doctor.aprobado === true && doctor.especialidad === especialidadSeleccionadaInput
                            ? <option key={i} value={doctor.dni}>Dr/a: {doctor.nombre} {doctor.apellido} - M.P. Nº{doctor.matricula}</option>
                            : null)}
                </select>
            </div>
            <div className="input-group-turns">
                <input type="date" required onChange={handleFecha} placeholder="Selecciona una fecha"/>
                <label>Fecha</label>
            </div>
            <div className="input-group-turns">
                <label>Hora</label>
                <select required onChange={handleHora}>
                <option disabled>Selecciona un horario</option>
                    {Array.from({ length: 20 - 8 }, (_, index) => {
                        const hour = index + 8;
                            return (
                                <option key={hour} value={hour}>
                                    {hour}:00
                                </option>
                            );
                        }
                    )}
                </select>
            </div>
            <div className="input-group-turns">
                <input type="text" required onChange={handleMotivo}/>
                <label>Observaciones</label>
            </div>
            <button type="submit">Solicitar</button>
        </form>
    </div>
  );

}