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
    patchEspecialidad
} from "../../redux/actions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import adminPic from '../../assets/users/admin-avatar.png'
import pacientePic from '../../assets/users/paciente-avatar.png'
import doctorPic from '../../assets/users/doctor-avatar.png'

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

    const doctors = useSelector((state) => state.userReducer.doctors);
    const doctorsAdmin = useSelector((state) => state.userReducer.doctorsAdmin);
    const users = useSelector((state) => state.userReducer.users);
    const turnos = useSelector((state) => state.userReducer.turnos);
    const especialidades = useSelector((state) => state.userReducer.especialidades) || [];

    const [listDoctorsForAprobe, setListDoctorsForAprobe] = useState(false);        // mostrar lista para aprobar
    const [listDoctorsForDisapprove, setListDoctorsForDisapprove] = useState(false);// mostrar lista para aprobar
    const [listUsersShow, setListUsersShow] = useState(false);                      // mostrar ocultar lista
    const [dniSearch, SetDniSearch] = useState(false);                              // buscar por dni (oculta la lista)
    const [dniSearchUser, setDniSearchUser] = useState(false);                      // buscar por dni
    const [dniTurno, setDniTurno] = useState(false);                                // buscar por dni turnos
    const [userImage, setUserImage] = useState("")                                  // Modifica la imagen de log
    const [tipoUsuario, setTipoUsuario] = useState("")                              // Clasifica al user por Doc/Paciente/Administrador
    const [nuevaEspecialidad, setNuevaEspecialidad] = useState("")                  // Input de la especialidad a agregar
    const [imagenNuevaEspecialidad, setImagenNuevaEspecialidad] = useState("")      // input de la img de la nueva especialidad
    const [editImage, setEditImage] = useState(false)                               // Modal para editar la img de una especialidad
    const [especialidadUpdate, setEspecialidadUpdate] = useState("")                // Escribe el nombre de la especialidad a modificar en label
    const [especialidadImg, setEspecialidadImg] = useState("")                      // Input de la nueva img para la especialidad seleccionada
    const [idEspecialidad, setIdEspecialidad] = useState("")                        // Id de la especialidad seleccionada para patch img
    //const [paciente, setPaciente] = useState()
    
    //Muestra la lista de doctores que necesitan aprobacion para figurar en tarjetas de entrada
    function showDoctorForApprove() {
        dispatch(getDoctorsAdmin(token))
        setListDoctorsForAprobe(!listDoctorsForAprobe);
    }
    function showDoctorForDisapprove() {
        dispatch(getDoctorsAdmin(token))
        setListDoctorsForDisapprove(!listDoctorsForDisapprove);
    }

    //Actualiza el doc como aprobado
    async function refreshDoctors(doctorId, aprobado) {
        await dispatch(putDoctor(doctorId, aprobado));
        dispatch(getDoctorsAdmin(token));
        //console.log("refresco");
    }
    //https://img.freepik.com/vector-premium/medico-cirujano-concepto_108855-4197.jpg
    //Funcion para cambiar estado de "No aprobado" a "aprobado"
    function changeAprobado(doctorId, aprobado) {
        if(aprobado === true)
        {swalWithBootstrapButtons
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
            });}
        else if(aprobado === false)
        {swalWithBootstrapButtons
            .fire({
                title: "¿Estas seguro?",
                text: "Vas a quitarle los permisos como Medico autorizado",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Si! Quitar!",
                cancelButtonText: "No, cancelar!",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    refreshDoctors(doctorId, aprobado);
                    swalWithBootstrapButtons.fire(
                        "Aprobado!",
                        "Has quitado a este Medico de la lista de autorizados.",
                        "success"
                    );
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Acción cancelada",
                        "Has conservado a este Medico en la lista de autorizado",
                        "error"
                    );
                }
            });}
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
                    dispatch(getDoctorsAdmin(token));
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
    // let foundUser
    // if (dni) {
    //     foundUser = dni
    // }

    // console.log(foundUser)
    useEffect(() => {
        dispatch(getTurnos())
    },[])

    //Funcion para borrar un usuario de la base de datos 
    async function deleteUserSelected(user) {
        console.log(user)
        let conTurnoAsignado = false
        turnos?.map((turno) => {
            if(turno.doctor_id === user.id_user || turno.paciente_id === user.id_user){
                console.log(turno.doctor_id)
                console.log(turno.paciente_id)
                console.log("EStoy aquyi?=")
                conTurnoAsignado = true
            }    
        })
        if(conTurnoAsignado){
            return swalWithBootstrapButtons.fire(
                "Acción cancelada",
                "No puedes borrar usuarios que tengan turnos asignados",
                "error"
            );
        }
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
        setListDoctorsForDisapprove(false);
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
            dispatch(getDoctorsAdmin(token));
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
    //Mostrar turno por DNI 
    
    function guardarDNITurnos(e){
        setDniTurno(e)
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
        async function deleteEspecialidadFunction(id_especialidad, especialidad) {
            let doctoresEspecialidad = false
            doctors?.map((doctor) => {
                if(doctor.especialidad == especialidad){
                    doctoresEspecialidad = true
                }}
            )
            if(doctoresEspecialidad){
                return swalWithBootstrapButtons.fire(
                    "Acción cancelada",
                    "No puedes borrar especialidades que tiene doctores asignados, primero elimina todos los doctores de esa especialidad",
                    "error"
                );
            }
            swalWithBootstrapButtons
                .fire({
                    title: "¿Estas seguro?",
                    text: "Vas a ELIMINAR esta especialidad",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonText: "Si! Eliminar!",
                    cancelButtonText: "No, conservar!",
                    reverseButtons: true,
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        await dispatch(deleteEspecialidad(id_especialidad))
                        dispatch(getEspecialidades())
                        swalWithBootstrapButtons.fire(
                            "Eliminada!",
                            "Has eliminado esta especialidad.",
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

        //////// Cambiar imagen de la especialidad //////////
        function editImageEsp(id, espec, img) {
            setEditImage(!editImage)
            setEspecialidadUpdate(espec)
            setEspecialidadImg(img)
            setIdEspecialidad(id)
        }
        function manejarNuevaImagenUpdate(e) {
            setEspecialidadImg(e.target.value)
        }

        function updateImageEsp() {
            swalWithBootstrapButtons
            .fire({
                title: "¿Estas seguro?",
                text: "Vas a cambiar la imagen de esta especialidad",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Si! Actualizar!",
                cancelButtonText: "No, conservar!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    await dispatch(patchEspecialidad(idEspecialidad, especialidadImg))
                    dispatch(getEspecialidades())
                    swalWithBootstrapButtons.fire(
                        "Actualizada!",
                        "Has actualizado la imagen de esta especialidad.",
                        "success"
                    );
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Acción cancelada",
                        "No se modificó la imagen de la especialidad",
                        "info"
                    );
                }
            });
            setEditImage(!editImage)
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
                            <h4>Mis turnos</h4>
                            {turnos?.map((turno, i) => turno.paciente_id === _id
                            ? <div className="turnos-panel-show" key={i}><span className="tooltipPanel">Motivo de la consulta: {turno.motivo}</span><p>{turno.fecha.split("T")[0]} (mm/dd), Hs: {turno.horario}:00 Espec.: {turno.especialidad} -  Dr. {turno.doctorNombre} </p> <button className="btn-delete-admin" onClick={() => borrarTurno(turno, turno.fecha)}>Cancelar</button></div>
                            : null
                            
                            )}</>}
                        </div>

                        {administrador && (
                            <div className="columnDoctorsToAprobe">
                            <h4>Buscar turnos</h4>
                            {true && 
                                <>
                                    <input className="searchDNI" onChange={(e) => guardarDNITurnos(e.target.value)} type="text" placeholder="Buscar por DNI"></input>
                                    {dniTurno && <h6 className="turnosPorDni">Turnos del DNI: {dniTurno}</h6>}
                                    {turnos?.map((turno, i) => (turno.dniDoctor == dniTurno || turno.dniPaciente == dniTurno)?
                                                <div className="turnos-panel-show" key={i}><span className="tooltipPanel">Motivo de la consulta: {turno.motivo}</span>Fecha: {turno.fecha.split("T")[0]}, Hs: {turno.horario}:00 Espec.: {turno.especialidad} -  Dr. {turno.doctorNombre} - Paciente: {turno.pacienteNombre}<button className="btn-delete-admin" onClick={() => borrarTurno(turno, turno.fecha)}>Cancelar</button> </div> : null)}
                                </>}
                            <h4>Doctores para aprobar</h4>
                                <div className="div-btn-showAll-and-input">
                                <button onClick={showDoctorForApprove}>
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
                                    })}<h4>Doctores para quitar aprobación</h4>
                                <div className="div-btn-showAll-and-input">
                                <button onClick={showDoctorForDisapprove}>
                                    {" "}
                                    {listDoctorsForDisapprove
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
                                {listDoctorsForDisapprove && (
                                    <>
                                        {doctorsAdmin?.map((doctor, i) =>
                                            doctor.aprobado === true ? (
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
                                                            className="btn-disapprove-admin"
                                                            onClick={() =>
                                                                changeAprobado(
                                                                    doctor,
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            Quitar
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
                                            doctor.aprobado === true
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
                                                            className="btn-disapprove-admin"
                                                            onClick={() =>
                                                                changeAprobado(
                                                                    doctor,
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            Quitar
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
                                        <h4 className="h4-add-especialidades">⚠️ <span className="span-danger">Danger zone!</span> Editar Especialidades</h4></>
                                        {especialidades?.map((especialidad, i) =>
                                            <div key={i} className="div-delete-especialidades">
                                                <label className="span-especialidades">{especialidad.especialidad}</label>
                                                <button onClick={() => editImageEsp(especialidad._id, especialidad.especialidad, especialidad.image)} className="btn-update-img"><i className="fa-regular fa-pen-to-square"></i> imagen</button>
                                                <button onClick={() => deleteEspecialidadFunction(especialidad._id, especialidad.especialidad)} className="btn-delete-admin">Eliminar</button>
                                            </div>)}
                                            {editImage &&
                                            <div className="div-update-img-especialidades">
                                                <h5>Cambiar imagen de especialidad</h5>
                                                <label>{especialidadUpdate}</label>
                                                <input placeholder={especialidadImg} onChange={manejarNuevaImagenUpdate}></input>
                                                <div className="btn-div-update-img">
                                                    <button className="aceptar-img" onClick={updateImageEsp}>Aceptar</button>
                                                    <button className="cancelar-img" onClick={() => setEditImage(!editImage)}>Cancelar</button>
                                                </div>
                                            </div>}
                            </div>
                        )}
                    </div>
                </div>
            </div>}
        </div>
    );
};
//https://rlv.zcache.es/pegatina_cuadrada_cirujano_del_dibujo_animado-r907b61e79c354af8b5ae23858f6050d6_0ugmc_8byvr_307.jpg