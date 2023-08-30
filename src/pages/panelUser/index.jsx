import "./panelUser.css";
import { useSelector, useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import {
    getDoctorsAdmin,
    deleteTurno,
    getTurnos,
    getEspecialidades,
    getUsers
} from "../../redux/actions";
import Swal from "sweetalert2";
import adminPic from '../../assets/users/admin-avatar.png'
import pacientePic from '../../assets/users/paciente-avatar.png'
import doctorPic from '../../assets/users/doctor-avatar.png'
import { BuscarTurnos, MostrarUsuarios, AprobarDoctor, AdminEspecialidades} from "../../components";

export const PanelUser = () => {
    const dispatch = useDispatch();
    const {
        _id,
        nombre: user,
        apellido,
        dni,
        direccion,
        telefono,
        mail,
        fechaNacimiento,
        administrador,
        medico,
        token
    } = useSelector((state) => state.userReducer.user);
    
    const turnos = useSelector((state) => state.userReducer.turnos);
    const [dniSearch, SetDniSearch] = useState(false);                              // buscar por dni (oculta la lista)
    const [dniSearchUser, setDniSearchUser] = useState(false);                      // buscar por dni
    const [userImage, setUserImage] = useState("")                                  // Modifica la imagen de log
    const [tipoUsuario, setTipoUsuario] = useState("")                              // Clasifica al user por Doc/Paciente/Administrador
    const fechaActual = new Date().toISOString();


    useEffect(() => {
        if(user){
            dispatch(getTurnos(token))
            dispatch(getEspecialidades())
        }
    },[])

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
    });

    //Effect para mostrar todos los doctores que coinciden con el NDI
    useEffect(() => {
        !dniSearch?SetDniSearch(false):false;
    }, [dniSearch]);

    //Effect para mostrar todos los usuarios que coinciden con el NDI
    useEffect(() => {
        !dniSearchUser?setDniSearchUser(false):false;
    }, [dniSearchUser]);

    useEffect(() => {
        if(administrador){
            dispatch(getDoctorsAdmin(token));
            dispatch(getUsers(token))
            setUserImage(adminPic)
            setTipoUsuario("Administrador")
        } else if(medico) {
            setUserImage(doctorPic)
            setTipoUsuario("Medico")
        } else {
            setUserImage(pacientePic)
            setTipoUsuario("Paciente")
        }
    }, [user]);

    //Funcion para borrar un turno
    async function borrarTurno(turno, fecha) {
        let turnoFecha = fecha.split("T")[0]
        let turnoFechaFix = turnoFecha.replaceAll("-", ",")
        let turnoDate = new Date(turnoFechaFix)
        let currentDate = new Date()
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
                    if(turnoDate <= currentDate){
                        return swalWithBootstrapButtons.fire(
                            "Acción cancelada",
                            "No puede borrar turnos 24 hs antes",
                            "info"
                        );
                    }
                    if (result.isConfirmed) {
                        let turnoId = turno._id;
                        await dispatch(deleteTurno(turnoId, token));
                        dispatch(getTurnos(token));
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
        <div className="panelUser">
        {!user &&<h2 className="panelUserDeslog"><a href="#/Join">Debe ingresar con su cuenta</a></h2>}
            {user &&<div>
                <div className="panelUser-column">
                    <img
                        src={userImage}
                        alt="imagen tipo usuario"
                    />
                    <div>
                        <div className="panelUserData">
                            <h2>Bienvenido {user}</h2>
                            <h4>Datos del {tipoUsuario}</h4>
                            <div className="datos-user">
                                <p>Nombre: {user}</p>
                                <p>Apellido: {apellido}</p>
                                <p>DNI: {dni}</p>
                                <p>Dirección: {direccion}</p>
                                <p>Mail: {mail}</p>
                                <p>Telefono: {telefono}</p>
                                <p>
                                    Fecha de nacimiento:{" "}
                                    {fechaNacimiento
                                        ? fechaNacimiento.split("T")[0]
                                        : false}
                                </p>
                            </div>
                            {turnos &&<>
                            <h4 key="mis-turnos">Mis turnos</h4>
                            {turnos?.map((turno, i) => turno.paciente_id === _id
                            ? turno.fecha < fechaActual 
                                ?<div className="turnos-panel-show fueraDeFecha" key={i}>
                                    <span className="tooltipPanel">Motivo de la consulta: {turno.motivo}</span>
                                    <p>{turno.fecha.split("T")[0]} (mm/dd), Hs: {turno.horario}:00 Espec.: {turno.especialidad} -  Dr. {turno.doctorNombre} </p>
                                    <button className="btn-delete-admin-vencido">Expirado</button>
                                </div>
                                :<div className="turnos-panel-show" key={i}>
                                    <span className="tooltipPanel">Motivo de la consulta: {turno.motivo}</span>
                                    <p>{turno.fecha.split("T")[0]} (mm/dd), Hs: {turno.horario}:00 Espec.: {turno.especialidad} -  Dr. {turno.doctorNombre} </p>
                                    <button className="btn-delete-admin" onClick={() => borrarTurno(turno, turno.fecha)}>Cancelar</button></div>
                            : null
                            )}</>}
                        </div>

                        {administrador && (
                            <div className="columnDoctorsToAprobe">
                                <BuscarTurnos />
                                <AprobarDoctor />
                                <MostrarUsuarios />
                                <AdminEspecialidades />
                            </div>
                        )}
                    </div>
                </div>
            </div>}
        </div>
    );
};
