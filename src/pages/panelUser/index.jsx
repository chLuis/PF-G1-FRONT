import "./panelUser.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    getDoctorsAdmin,
    putDoctor,
    deleteDoctor,
    getUsers,
    deleteUser,
    deleteTurno,
    getTurnos,
    postEspecialidad,
    deleteEspecialidad,
    getEspecialidades,
} from "../../redux/actions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import adminPic from '../../assets/users/admin-avatar.png'
import pacientePic from '../../assets/users/paciente-avatar.png'
import doctorPic from '../../assets/users/doctor-avatar.png'

export const PanelUser = () => {
    const dispatch = useDispatch();
    const {
        nombre: user,
        apellido,
        dni,
        direccion,
        telefono,
        mail,
        fechaNacimiento,
        administrador,
        medico
    } = useSelector((state) => state.userReducer.user);

    const doctorsAdmin = useSelector((state) => state.userReducer.doctorsAdmin);
    const users = useSelector((state) => state.userReducer.users);
    const turnos = useSelector((state) => state.userReducer.turnos);
    const especialidades = useSelector((state) => state.userReducer.especialidades) || [];
    const [listDoctorsForAprobe, setListDoctorsForAprobe] = useState(false);
    const [listUsersShow, setListUsersShow] = useState(false);
    const [dniSearch, SetDniSearch] = useState(false);
    const [dniSearchUser, setDniSearchUser] = useState(false);
    const [userImage, setUserImage] = useState("")
    const [tipoUsuario, setTipoUsuario] = useState("")
    const [nuevaEspecialidad, setNuevaEspecialidad] = useState("")
    const [imagenNuevaEspecialidad, setImagenNuevaEspecialidad] = useState("")
    //const [paciente, setPaciente] = useState()
    
    //Muestra la lista de doctores que necesitan aprobacion para figurar en tarjetas de entrada
    function showDoctorForAprobe() {
        dispatch(getDoctorsAdmin())
        setListDoctorsForAprobe(!listDoctorsForAprobe);
    }

    //Actualiza el doc como aprobado
    async function refreshDoctors(doctorId, aprobado) {
        await dispatch(putDoctor(doctorId, aprobado));
        dispatch(getDoctorsAdmin());
        //console.log("refresco");
    }
    //https://img.freepik.com/vector-premium/medico-cirujano-concepto_108855-4197.jpg
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
                    dispatch(getDoctorsAdmin());
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
        if(administrador){
            dispatch(getDoctorsAdmin());
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
    
        //////////////// Nueva especialidad /////////////////
        function primeraMayusRestoMinus(str) {
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        }

        function manejarNuevaEspecialidad(e) {
            let especialidad = primeraMayusRestoMinus(e.target.value)
            setNuevaEspecialidad(especialidad)
        }
        function manejarNuevaImagen(e) {
            setImagenNuevaEspecialidad(e.target.value)
        }

        async function agregarEspecialidad() {
            swalWithBootstrapButtons
                .fire({
                    title: "¿Estas seguro?",
                    text: "Vas a agregar a esta especialidad",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonText: "Si! Agregar!",
                    cancelButtonText: "No, cancelar!",
                    reverseButtons: true,
                })
                .then(async (result) => {

                    if (result.isConfirmed) {
                        await dispatch(postEspecialidad(nuevaEspecialidad, imagenNuevaEspecialidad))
                        dispatch(getEspecialidades())
                        swalWithBootstrapButtons.fire(
                            "Agregada!",
                            "Has agregado esta especialidad.",
                            "success"
                        );
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire(
                            "Acción cancelada",
                            "Este especialidad no se ha agregado",
                            "info"
                        );
                    }
                });

        }

        // Quitar especialidad
        async function deleteEspecialidadFunction(id_especialidad) {
            swalWithBootstrapButtons
                .fire({
                    title: "¿Estas seguro?",
                    text: "Vas a borrar a esta especialidad",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonText: "Si! Borrar!",
                    cancelButtonText: "No, conservar!",
                    reverseButtons: true,
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        await dispatch(deleteEspecialidad(id_especialidad))
                        dispatch(getEspecialidades())
                        swalWithBootstrapButtons.fire(
                            "Borrado!",
                            "Has borrado esta especialidad.",
                            "success"
                        );
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire(
                            "Acción cancelada",
                            "Esta especialidad se ha conservado",
                            "info"
                        );
                    }
                });


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
                            ? <div className="turnos-panel-show" key={i}><p>Fecha(aaaa/mm/dd): {turno.fecha.split("T")[0]}, Hs: {turno.horario}:00 Espec.: {turno.especialidad} -  Dr. {turno.doctorNombre} </p> <button className="btn-delete-admin" onClick={() => borrarTurno(turno, turno.fecha)}>Cancelar</button></div>
                            : null
                            
                            )}</>}
                        </div>

                        {administrador && (
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
                                        {doctorsAdmin?.map((doctor, i) =>
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
                                    {doctorsAdmin?.map((doctor, i) => {
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
                                    <>
                                        <h4 className="h4-add-especialidades">Agregar especialidades</h4>
                                        <div className="div-add-especialidades">
                                            <div className="div-add-especialidades-input">
                                                <label>Especialidad:</label>
                                                <input placeholder="Neurología..." onChange={manejarNuevaEspecialidad}></input>
                                            </div>
                                            <div className="div-add-especialidades-input">
                                                <label>Imagen:</label>
                                                <input placeholder="https://..." onChange={manejarNuevaImagen}></input>
                                            </div>
                                            <button onClick={agregarEspecialidad} className="btn-approve-admin">Agregar</button>
                                        </div>
                                    </>
                                    <>
                                        <h4 className="h4-add-especialidades">Quitar especialidades</h4></>
                                        {especialidades?.map((especialidad, i) =>
                                            <div key={i} className="div-delete-especialidades">
                                                <label className="span-especialidades">{especialidad.especialidad}</label>
                                                <button onClick={() => deleteEspecialidadFunction(especialidad._id)} className="btn-delete-admin">Quitar</button>
                                            </div>)}
                            </div>
                        )}
                    </div>
                </div>
            </div>}
        </div>
    );
};
