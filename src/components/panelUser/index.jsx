import "./panelUser.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    getDoctors,
    getDoctor,
    putDoctor,
    deleteDoctor,
    getPacientes,
    getPaciente,
    getUsers,
    getUser,
    deleteUser,
    logoutUser,
} from "../../redux/actions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import adminPic from '../../images/users/admin-avatar.png'
import pacientePic from '../../images/users/paciente-avatar.png'
import doctorPic from '../../images/users/doctor-avatar.png'

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
    const [listDoctorsForAprobe, setListDoctorsForAprobe] = useState(false);
    const [listUsersShow, setListUsersShow] = useState(false);
    const [dniSearch, SetDniSearch] = useState(false);
    const [dniSearchUser, setDniSearchUser] = useState(false);
    const [userImage, setUserImage] = useState("")


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
                        "Cancelado",
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
                        "Cancelado",
                        "Este doctor sigue en la base de datos",
                        "info"
                    );
                    console.log("ESTOY EN DELETE DEL BTN");
                }
            });
    }

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
                        "Cancelado",
                        "Este usuario se ha conservado",
                        "info"
                    );
                    console.log("ESTOY EN DELETE DEL BTN de user");
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
        } else if(medico) {
            setUserImage(doctorPic)
        } else {
            setUserImage(pacientePic)
        }
    }, [user]);

    //Funcion para mostrar todos los usuarios
    function showAllUsers() {
        dispatch(getUsers());
        setListUsersShow(!listUsersShow);
    }

    //Actualiza el doc como aprobado
    async function refreshDoctors(doctorId, aprobado) {
        await dispatch(putDoctor(doctorId, aprobado));
        dispatch(getDoctors());
        console.log("refresco");
    }

    return (
        <div className="panelUser">
        {!user &&<div>Debe logearse</div>}
            {user &&<div>
                <div className="panelUser-column">
                    <img
                        src={userImage}
                        alt="imagen tipo usuario"
                    />
                    <div>
                        <div className="panelUserData">
                            <h2>Bienvenido {user}</h2>
                            <h4>Datos del usuario</h4>
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
                            <p>Administrador: {admin ? "Si" : "No"}   ------- Esto se saca</p>
                            <h4>Turnos</h4>
                            <p>Turno 1</p>
                            <p>Turno 2</p>
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
                                <h2>Usuarios</h2>
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
