import "./panelUser.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    getDoctors,
    putDoctor,
    deleteDoctor,
    getUsers,
    deleteUser,
    deleteTurno,
    getTurnos
} from "../../redux/actions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import adminPic from '../../assets/users/admin-avatar.png'
import pacientePic from '../../assets/users/paciente-avatar.png'
import doctorPic from '../../assets/users/doctor-avatar.png'

export const PanelUser = () => {
    const dispatch = useDispatch();
    const {
        user,
        apellido,
        dni,
        direccion,
        telefono,
        mail,
        fechaNacimiento,
        admin,
        medico
    } = useSelector((state) => state.userReducer);
    const doctors = useSelector((state) => state.userReducer.doctors);
    const users = useSelector((state) => state.userReducer.users);
    const turnos = useSelector((state) => state.userReducer.turnos);
    const [listDoctorsForAprobe, setListDoctorsForAprobe] = useState(false);
    const [listUsersShow, setListUsersShow] = useState(false);
    const [dniSearch, SetDniSearch] = useState(false);
    const [dniSearchUser, setDniSearchUser] = useState(false);
    const [userImage, setUserImage] = useState("")
    const [tipoUsuario, setTipoUsuario] = useState("")
    //const [paciente, setPaciente] = useState()

    //Muestra la lista de doctores que necesitan aprobacion para figurar en tarjetas de entrada
    function showDoctorForAprobe() {
        dispatch(getDoctors())
        setListDoctorsForAprobe(!listDoctorsForAprobe);
    }
    //Funcion para cambiar estado de "No aprobado" a "aprobado"
    function changeAprobado(doctorId, aprobado) {
        swalWithBootstrapButtons
            .fire({
                title: "¿Estas seguro?",
                text: "Vas a permitir al usuario a acceder como Medico autorizado",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Si! Aprobar!",
                cancelButtonText: "No, cancelar!",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    refreshDoctors(doctorId, aprobado);
                    swalWithBootstrapButtons.fire(
                        "Aprobado!",
                        "Has aprobado este doctor como Medico autorizado.",
                        "success"
                    );
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Acción cancelada",
                        "No aprobaste esta cuenta como Medico autorizado",
                        "error"
                    );
                }
            });
    }
    //Funcion para borrar un doctor de la lista de doctores
    async function deleteDoctorSelected(doc) {
        swalWithBootstrapButtons
            .fire({
                title: "¿Estas seguro?",
                text: "Vas a borrar a este medico de la base de datos",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Si! Borrar!",
                cancelButtonText: "No, conservar!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    let doctorId = doc.id_user;
                    await dispatch(deleteDoctor(doctorId));
                    dispatch(getDoctors());
                    swalWithBootstrapButtons.fire(
                        "Borrado!",
                        "Has borrado a este doctor de la base de datos.",
                        "success"
                    );
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Acción cancelada",
                        "Este doctor sigue en la base de datos",
                        "info"
                    );
                    console.log("ESTOY EN DELETE DEL BTN");
                }
            });
    }
    let foundedUser, foundUser
    if (dni && users != []) {
        foundedUser = users?.find(user => user.dni === dni);
    }
    if(foundedUser) {
        foundUser = foundedUser.id_user?.toString()
    }
    useEffect(() => {
        dispatch(getTurnos())
    },[])

    //Funcion para borrar un usuario de la base de datos 
    async function deleteUserSelected(user) {
        
        swalWithBootstrapButtons
            .fire({
                title: "¿Estas seguro?",
                text: "Vas a borrar a este usuario de la base de datos",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Si! Borrar!",
                cancelButtonText: "No, conservar!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    let userId = user.id_user;
                    await dispatch(deleteUser(userId));
                    dispatch(getUsers());
                    swalWithBootstrapButtons.fire(
                        "Borrado!",
                        "Has borrado a este usuario de la base de datos.",
                        "success"
                    );
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Acción cancelada",
                        "Este usuario se ha conservado",
                        "info"
                    );
                }
            });
    }
    //input donde se hace la busqueda por DNI de medicos para aprobar
    function guardarDNI(e) {
        SetDniSearch(e);
        setListDoctorsForAprobe(false);
    }
    function guardarDNIuser(e) {
        setDniSearchUser(e)
        setListUsersShow(false)
        console.log(e)
    }
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
        if(admin){
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

    //Funcion para mostrar todos los usuarios
    function showAllUsers() {
        dispatch(getUsers());
        setListUsersShow(!listUsersShow);
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
    
    //Actualiza el doc como aprobado
    async function refreshDoctors(doctorId, aprobado) {
        await dispatch(putDoctor(doctorId, aprobado));
        dispatch(getDoctors());
        console.log("refresco");
    }

    return (
        <div className="panelUser">
        {!user &&<h2>Debe ingresar con su cuenta</h2>}
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
                            {turnos &&<>
                            <h4>Turnos</h4>
                            {turnos?.map((turno, i) => turno.paciente_id === foundUser
                            ? <div className="turnos-panel-show" key={i}><p>Fecha(aaaa/mm/dd): {turno.fecha.split("T")[0]}, Hs: {turno.horario}:00 Espec.: {turno.especialidad} -  Dr. {turno.doctorNombre} </p> <button className="btn-delete-admin" onClick={() => borrarTurno(turno)}>Cancelar</button></div>
                            : null
                            
                            )}</>}
                        </div>

                        {admin && (
                            <div className="columnDoctorsToAprobe">
                                <h4>Doctores para aprobar</h4>
                                <div className="div-btn-showAll-and-input">
                                <button onClick={showDoctorForAprobe}>
                                    {" "}
                                    {listDoctorsForAprobe
                                        ? "Ocultar lista"
                                        : "Mostrar todos"}{" "}
                                </button>
                                <span>
                                    <input
                                        onChange={(e) =>
                                            guardarDNI(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Buscar por DNI"
                                        className="searchDNI"
                                    />
                                </span>
                                </div>
                                {listDoctorsForAprobe && (
                                    <>
                                        {doctors?.map((doctor, i) =>
                                            doctor.aprobado === false ? (
                                                <div
                                                    key={i}
                                                    className="doctorToApprove"
                                                >
                                                    <span>
                                                        Matrícula:{" "}
                                                        {doctor.matricula} - Dr.{" "}
                                                        {doctor.nombre}{" "}
                                                        {doctor.apellido} -{" "}
                                                        {doctor.especialidad}
                                                    </span>
                                                    <span>
                                                        DNIº {doctor.dni}
                                                    </span>
                                                    <span className="btn-manage-doc">
                                                        <button
                                                            className="btn-approve-admin"
                                                            onClick={() =>
                                                                changeAprobado(
                                                                    doctor,
                                                                    true
                                                                )
                                                            }
                                                        >
                                                            Aprobar
                                                        </button>
                                                        <button
                                                            className="btn-delete-admin"
                                                            onClick={() =>
                                                                deleteDoctorSelected(
                                                                    doctor
                                                                )
                                                            }
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </span>
                                                </div>
                                            ) : null
                                        )}
                                    </>
                                )}                               
                                    {doctors?.map((doctor, i) => {
                                        if (
                                            doctor.dni == dniSearch &&
                                            doctor.aprobado === false
                                        ) {
                                            return (
                                                <div
                                                    key={i}
                                                    className="doctorToApprove"
                                                >
                                                    <span>
                                                        Matrícula:{" "}
                                                        {doctor.matricula} - Dr.{" "}
                                                        {doctor.nombre}{" "}
                                                        {doctor.apellido} -{" "}
                                                        {doctor.especialidad}
                                                    </span>
                                                    <span>
                                                        DNIº {doctor.dni}
                                                    </span>
                                                    <span className="btn-manage-doc">
                                                        <button
                                                            className="btn-approve-admin"
                                                            onClick={() =>
                                                                changeAprobado(
                                                                    doctor,
                                                                    true
                                                                )
                                                            }
                                                        >
                                                            Aprobar
                                                        </button>
                                                        <button
                                                            className="btn-delete-admin"
                                                            onClick={() =>
                                                                deleteDoctorSelected(
                                                                    doctor
                                                                )
                                                            }
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </span>
                                                </div>
                                            );
                                        } else {
                                            return null; // O podrías renderizar un mensaje "no hay coincidencia" si lo prefieres
                                        }
                                    })}                                   
                                <h4>Usuarios</h4>
                                <div className="div-btn-showAll-and-input">
                                <button onClick={showAllUsers}>
                                {listUsersShow
                                        ? "Ocultar lista"
                                        : "Mostrar todos"}{" "}
                                </button>
                                <span>
                                    <input
                                        onChange={(e) =>
                                            guardarDNIuser(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Buscar por DNI"
                                        className="searchDNI"
                                    />
                                </span>
                                </div>
                                {listUsersShow && (
                                    <>
                                        {users?.map((user, i) =>
                                                <div
                                                    key={i}
                                                    className="doctorToApprove"
                                                >
                                                    <span>
                                                        {user.nombre}{" "}
                                                        {user.apellido} - {" "}
                                                        {user.medico}
                                                    </span>
                                                    <span>
                                                        DNIº {user.dni}
                                                    </span>
                                                    <span className="btn-manage-doc">
                                                        <button
                                                            className="btn-delete-admin"
                                                            onClick={() =>
                                                                deleteUserSelected(
                                                                    user
                                                                )
                                                            }
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </span>
                                                </div>
                                        )}
                                    </>
                                )}
                                {users?.map((user, i) => {
                                        if (user.dni == dniSearchUser) {
                                            return (
                                                <div
                                                    key={i}
                                                    className="doctorToApprove"
                                                >
                                                    <span>
                                                        {user.nombre}{" "}
                                                        {user.apellido} - {" "}
                                                        {user.medico}
                                                    </span>
                                                    <span>
                                                        DNIº {user.dni}
                                                    </span>
                                                    <span className="btn-manage-doc">
                                                        <button
                                                            className="btn-delete-admin"
                                                            onClick={() =>
                                                                deleteUserSelected(
                                                                    user
                                                                )
                                                            }
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </span>
                                                </div>
                                            );
                                        } else {
                                            return null; // O podrías renderizar un mensaje "no hay coincidencia" si lo prefieres
                                        }
                                    })} 
                            </div>
                        )}
                    </div>
                </div>
            </div>}
        </div>
    );
};
