import "./turnos.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { postTurno, getTurnos } from "../../redux/actions";

export const Turnos = () => {
    const dispatch = useDispatch();

    const doctors = useSelector((state) => state.userReducer.doctors);
    const user = useSelector((state) => state.userReducer.dni);
    const turnos = useSelector((state) => state.userReducer.turnos) || "";

    const [dni, setDni] = useState(user);
    const [especialidadSeleccionadaInput, setEspecialidadSeleccionadaInput] = useState("");
    const [medico, setMedico] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [motivo, setMotivo] = useState("");

    useEffect(() => {
        dispatch(getTurnos());
    }, [user]);

    function handleMedic(e) {
        setMedico(e.target.value);
    }
    function handleFecha(e) {
        setFecha(e.target.value);
    }
    function handleHora(e) {
        setHora(e.target.value);
    }
    function handleMotivo(e) {
        setMotivo(e.target.value);
    }

    function handleEspecialidad(e) {
        setEspecialidadSeleccionadaInput(e.target.value);
    }
    let idDoctorElegido = false;
    doctors?.map((doctor, i) =>
        doctor.dni == medico
            ? (idDoctorElegido = doctors[i].usuario_id) //`${doctors[i].usuario_id} ${doctors[i].nombre}`
            : null
    );


    function turnoSet(e) {
        e.preventDefault();
        const turno = {
            dniPaciente: dni,
            especialidad: especialidadSeleccionadaInput,
            dniDoctor: Number(medico),
            fecha: fecha,
            horario: hora,
            motivo: motivo,
        };
        turno ? dispatch(postTurno(turno)) : null;
    }
    const turnosOcupados = [];
    turnos?.forEach((turno) => {
        if (
            turno.fecha?.split("T")[0] === fecha &&
            turno.doctor_id === idDoctorElegido
        ) {
            turnosOcupados.push(turno.horario.split(":")[0]);
        }
    });
    console.log(turnosOcupados);

    return (
        <div className="turnos form-wrapper">
            <form className="formularioTurnos" onSubmit={turnoSet}>
                <h2>Solicitar Turno</h2>
                <div className="input-group">
                    <div className="input-group">
                        <input type="text" required value={user} disabled />
                        <label></label>
                    </div>
                    <label>Tipo de Consulta</label>
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
                </div>
                {idDoctorElegido && (
                    <div className="input-group">
                        <input
                            type="date"
                            required
                            onChange={handleFecha}
                            placeholder="Selecciona una fecha"
                        />
                        <label>Fecha</label>
                    </div>
                )}
                {fecha && (
                    <div className="input-group">
                        <label>Hora</label>

                        <select
                            required
                            defaultValue={"Selecciona un horario"}
                            onChange={handleHora}
                        >
                            <option disabled defaultValue={-1}>
                                Selecciona un horario
                            </option>
                            {Array.from({ length: 9 }).map((_, i) => {
                                const hour = i + 8;
                                const hourString = hour.toString();
                                let horaTurno = turnosOcupados;
                                //let horaNumber = Number(horaTurno)
                                if (!horaTurno.includes(hourString)) {
                                    //console.log("hora libre", horaTurno, hour);
                                    return (
                                        <option key={i} value={hour}>
                                            {hour}:00
                                        </option>
                                    );
                                }
                                //console.log("hora ocupada", horaTurno, hour);
                                return null;
                            })}
                        </select>
                    </div>
                )}
                <div className="input-group">
                    <input type="text" required onChange={handleMotivo} />
                    <label>Observaciones</label>
                </div>
                <button type="submit">Solicitar</button>
            </form>
        </div>
    );
};
