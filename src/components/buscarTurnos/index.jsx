import './buscarTurnos.css'
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTurno, getTurnos } from "../../redux/actions";
import Swal from "sweetalert2";



export const BuscarTurnos = () => {

    const dispatch = useDispatch();
    
    const turnos = useSelector((state) => state.userReducer.turnos);
    const [dniTurno, setDniTurno] = useState(false);                         // buscar por dni turnos
    
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
    });


    function guardarDNITurnos(e){
        setDniTurno(e)
    }

    //Funcion para borrar un turno
    async function borrarTurno(turno) {
            swalWithBootstrapButtons
                .fire({
                    title: "¿Estas seguro?",
                    text: "Vas a borrar a este turno",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonText: "Si! Borrar!",
                    cancelButtonText: "No, conservar!",
                    reverseButtons: true,
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        let turnoId = turno._id;
                        await dispatch(deleteTurno(turnoId));
                        dispatch(getTurnos());
                        swalWithBootstrapButtons.fire(
                            "Borrado!",
                            "Has borrado este turno.",
                            "success"
                        );
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire(
                            "Acción cancelada",
                            "Este turno se ha conservado",
                            "info"
                        );
                    }
                });
    }


    return (
        <>
        <h4>Buscar turnos</h4>
            <input
                className="searchDNI"
                onChange={(e) => guardarDNITurnos(e.target.value)}
                type="text"
                placeholder="Buscar por DNI"
            ></input>
            {dniTurno && (
                <h6 className="turnosPorDni">Turnos del DNI: {dniTurno}</h6>
            )}
            {turnos?.map((turno, i) =>
                turno.dniDoctor == dniTurno || turno.dniPaciente == dniTurno ? (
                    <div className="turnos-panel-show" key={i}>
                        <span className="tooltipPanel">
                            Motivo de la consulta: {turno.motivo}
                        </span>
                        Fecha: {turno.fecha.split("T")[0]}, Hs: {turno.horario}
                        :00 Espec.: {turno.especialidad} - Dr.{" "}
                        {turno.doctorNombre} - Paciente: {turno.pacienteNombre}
                        <button
                            className="btn-delete-admin"
                            onClick={() => borrarTurno(turno, turno.fecha)}
                        >
                            Cancelar
                        </button>{" "}
                    </div>
                ) : null
            )}
        </>
    );
};
