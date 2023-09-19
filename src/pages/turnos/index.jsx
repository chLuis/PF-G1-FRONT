import "./turnos.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { postTurno, getTurnos } from "../../redux/actions";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export const Turnos = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const doctors = useSelector((state) => state.userReducer.doctors);
    const user = useSelector((state) => state.userReducer.user.dni);
    const turnos = useSelector((state) => state.userReducer.turnos) || "";
    const especialidades = useSelector((state) => state.userReducer.especialidades) || []
    const { token } = useSelector((state) => state.userReducer.user);

    const [dni, setDni] = useState(user);
    const [especialidadSeleccionadaInput, setEspecialidadSeleccionadaInput] = useState("");
    const [medico, setMedico] = useState("");
    const [medicoDNI, setMedicoDNI] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [motivo, setMotivo] = useState("");
    const [btnSolicitar, setBtnSolicitar] = useState(true)
    const [turnoEnviado, setTurnoEnviado] = useState(false)

    let especialidadesDoctores = []
    doctors?.map((doctor) => {
        doctor.aprobado
        ? especialidadesDoctores.push(doctor.especialidad)
        : null
    })
    const especialidadArray = new Set(especialidadesDoctores)
    const especialidadesDoctorAprobado = [...especialidadArray]

    useEffect(() => {
        if(user){
            dispatch(getTurnos(token));
        }
    }, [user]);

    function handleMedic(e) {
        setMedicoDNI(e.target.value);
        doctors?.map((doctor) => 
        doctor.dni == e.target.value? setMedico(`${doctor.nombre} ${doctor.apellido}`): null
        )}
    
    function handleFecha(e) {
        setFecha(e.target.value);
    }
    function handleHora(e) {
        setHora(e.target.value);
    }
    function handleMotivo(e) {
        setMotivo(e.target.value);
        setBtnSolicitar(false)
    }

    function handleEspecialidad(e) {
        setEspecialidadSeleccionadaInput(e.target.value);
    }
    let idDoctorElegido = false;
    doctors?.map((doctor, i) =>
        doctor.dni == medicoDNI
            ? (idDoctorElegido = doctors[i].dni)
            : null
    );
    function turnoSet(e) {
        setTurnoEnviado(!turnoEnviado)
        e.preventDefault();
        let fechaDate = new Date(fecha);
        let currentDate = new Date();
        let maxDate = new Date();
        maxDate.setDate(currentDate.getDate() + 30); 
        if(fechaDate <= currentDate){
            Swal.fire({
                icon: 'error',
                title: 'FECHA: datos incorrectos!',
                text: 'El turno debe ser solicitado 24 horas antes.',
            })
            return setTurnoEnviado(false)
        }
        if (fechaDate > maxDate) {
            Swal.fire({
                icon: 'error',
                title: 'FECHA: datos incorrectos!',
                text: 'La fecha no puede ser posterior a 30 días a partir de hoy.',
            });
            return setTurnoEnviado(false)
        }
        const turno = {
            dniPaciente: dni,
            especialidad: especialidadSeleccionadaInput,
            nombreDoctor: medico,
            dniDoctor: Number(medicoDNI),
            fecha: fecha,
            horario: hora,
            motivo: motivo,
        };
        
        turno ? dispatch(postTurno(turno)) : null;
            setTimeout(() => {
                Navigate("/");
            }, 2500)
    }
    const turnosOcupados = [];
    turnos?.forEach((turno) => {
        if (
            turno.fecha?.split("T")[0] === fecha &&
            turno.dniDoctor === idDoctorElegido
        ) {
            turnosOcupados.push(turno.horario.split(":")[0]);
        } else if (
            turno.fecha?.split("T")[0] === fecha &&
            turno.dniPaciente === dni
        ) {
            turnosOcupados.push(turno.horario.split(":")[0]);
        }
    });

    return (
        <div className="turnos form-wrapper">
            {!user && <h2 className="formularioNoLog"><a href="#/Join">Inicia Sesión para solicitar un turno</a></h2>}
            {user &&<form className="formularioTurnos" onSubmit={turnoSet}>
                <h2>Solicitar Turno</h2>
                <div className="input-group">
                    <div className="input-group">
                        <input type="text" required value={user} disabled />
                        <label className="hora-label">DNI</label>
                    </div>
                    <select
                        type="text"
                        className="select-especialidad-turno"
                        required
                        defaultValue={"Selecciona una especialidad"}
                        onChange={handleEspecialidad}
                    >
                        <option disabled defaultValue={-1}>
                            Selecciona una especialidad
                        </option>
                        {especialidades?.map((especialidad, i) => (
                            especialidadesDoctorAprobado.includes(especialidad.especialidad) &&
                                <option key={i} value={especialidad.especialidad}>{especialidad.especialidad}</option>
                            ))}
                    </select>
                </div>
                {especialidadSeleccionadaInput &&<div className="input-group">
                    <select
                        type="text"
                        className="select-especialidad-turno"
                        required
                        defaultValue={"Selecciona un/a doctor/a"}
                        onChange={handleMedic}
                    >
                        <option disabled defaultValue={-1}>
                            Selecciona un/a doctor/a
                        </option>
                        {doctors?.map((doctor, i) =>
                            doctor.aprobado === true &&
                            doctor.especialidad ===
                                especialidadSeleccionadaInput ? (
                                <option key={i} value={doctor.dni}>
                                    Dr/a: {doctor.nombre} {doctor.apellido} -
                                    M.P. Nº{doctor.matricula}
                                </option>
                            ) : null
                        )}
                    </select>
                </div>}
                {idDoctorElegido && (
                    <div className="input-group-date">
                        <input
                            type="date"
                            required
                            className={`date-input-turn`}
                            onChange={handleFecha}
                            placeholder="Selecciona una fecha"
                        />
                        <label className={`date-label-turn`}>Fecha</label>
                    </div>
                )}
                {fecha && (
                    <div className="input-group">
                        <label className="hora-label">Hora</label>
                        <select
                            required
                            defaultValue={"Selecciona un horario"}
                            onChange={handleHora}
                        >
                            <option disabled defaultValue={-1}>
                                Selecciona un horario
                            </option>
                            {Array.from({ length: 9 }).map((_, i) => { // Verifica si el doctor se encuentra libre
                                const hour = i + 8;
                                const hourString = hour.toString();
                                let horaTurno = turnosOcupados;
                                if (!horaTurno.includes(hourString)) {
                                    return (
                                        <option key={i} value={hour}>
                                            {hour}:00
                                        </option>
                                    );
                                }
                                return null;
                            })}
                        </select>
                    </div>
                )}
                {hora &&<div className="input-group">
                    <input type="text" required onChange={handleMotivo} />
                    <label>Motivo de la consulta</label>
                </div>}
                {!turnoEnviado &&<button type="submit" disabled={btnSolicitar}>Solicitar</button>}
            </form>}
        </div>
    );
};
